//------------------------------------------
//  Fichier: journal.componenett.ts
//  Auteur:  Alain Martel
//  Date :   2022-09-22
//  Projet : Jourvie
//------------------------------------------

import { Component, Input, Output, EventEmitter,  OnInit } from '@angular/core';
import { Developpeur } from '../modeles/Developpeur';
import { SessionTravail } from '../modeles/SessionTravail';
import { tr, getDateTimeISOString  } from '../outils';
import { Tache} from './../modeles/Tache';
import { Fait } from './../modeles/Fait';
import { Commentaire } from '../modeles/Commentaire';
import { JvService } from '../jv.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  @Input()
  dev:Developpeur = new Developpeur();

  @Output()
  changementTache:EventEmitter<Developpeur> = new EventEmitter<Developpeur>();

  visible=false;
  commentaireVisible=false;
  btnCommentaireVisible=false;
  btnArreterSessionVisible=false;
  btnChangerTacheVisible=true;
  btnConsulterTachesVisible=false;
  btnStatsVisible=true;

  tacheCourante:Tache = new Tache();
  sessTravCourante:SessionTravail = new SessionTravail(); 
  tabSessionsTravail:SessionTravail[] = Array();

  tabFaits: Fait[] = new Array();

  commentaireCourant:Commentaire = new Commentaire();
  tabComment: Commentaire[] = new Array();
  constructor(private jvSrv:JvService) { }

  //---------------------------------
  //
  //---------------------------------
  ngOnInit(): void {
  }

  //---------------------------------
  //
  //---------------------------------
  onDemarrerSessTrav(tac:Tache)
  {
   // tr("dev= " + this.dev.Prenom + " actif sur  " + tac.Titre);
    this.tacheCourante = tac;
    this.dev.Etat='actif';
    //let dd = getDateTimeISOString();

 
     this.jvSrv.postSessionTravail(tac, this.dev).subscribe
     (
      idSessTrav => 
      {
        //tr("id sess trav: " + idSessTrav);

          this.jvSrv.getSessionsTravail(this.dev.Id).subscribe
          (
            tabSessTrav => 
            {
              this.tabSessionsTravail = tabSessTrav;
             
              let indice = this.tabSessionsTravail.length -1;
              this.sessTravCourante = this.tabSessionsTravail[indice];
              this.btnArreterSessionVisible = true;

              this.jvSrv.getCommentaires(this.dev.Id).subscribe
              (
                tabComms =>
                {
                  this.tabComment = tabComms;
                  this.rafraichirJournal();
                  this.btnCommentaireVisible = true;
                  this.btnStatsVisible = true;
                }
              ) 
            }
         )
       }
     );
  

    this.visible=true;
    this.btnCommentaireVisible = true;

  }

  //---------------------------------
  //
  //---------------------------------
  arreterSessTrav()
  {
     this.jvSrv.putSessionTravail(this.sessTravCourante.Id).subscribe(
      sessTrav =>
      {
        this.sessTravCourante = sessTrav;
        this.jvSrv.getSessionsTravail(this.dev.Id).subscribe(
          tabSesTrav =>
          {
            this.tabSessionsTravail = tabSesTrav;
            this.rafraichirJournal();
            this.btnCommentaireVisible = false;
            this.btnArreterSessionVisible = false;
            this.dev.Etat = "inactif";
          })
       
      }
    )
  }

  //---------------------------------
  //  
  //---------------------------------
  onConnexionDevActif(dev:Developpeur)
  {
    this.visible = true;
    this.dev = dev;
    this.jvSrv.getSessionsTravail(this.dev.Id).subscribe(
      tabSessTrav => {
         this.tabSessionsTravail = tabSessTrav;
         let indice = this.tabSessionsTravail.length - 1;
         this.sessTravCourante = tabSessTrav[indice];
         this.btnArreterSessionVisible = true;
         
         this.jvSrv.getCommentaires(this.dev.Id).subscribe(
          tabComms =>
          {
            this.tabComment = tabComms;
            this.rafraichirJournal();
            this.btnCommentaireVisible = true;
            this.btnStatsVisible = true;
          }
        )
      }
    )
  }



  //---------------------------------
  //
  //---------------------------------
  commenter()
  {
    // Activer le formulaire de saisie
    this.commentaireVisible = true;
    this.btnCommentaireVisible = false;
    this.btnChangerTacheVisible =false;
    this.btnStatsVisible =false;
    this.btnConsulterTachesVisible=false;
    this.btnArreterSessionVisible=false;
  }

  //---------------------------------
  //
  //---------------------------------
  changerTache()
  {
    //tr("chager tac");
    if (this.sessTravCourante.Fin === null)
    {
      this.arreterSessTrav();
    }
    this.visible = false;
    this.changementTache.emit(this.dev);

  }
  

  //---------------------------------
  //
  //---------------------------------
  tacheReadOnly()
  {
    tr("consul tac");
  }

  //---------------------------------
  //
  //---------------------------------
  statistiques()
  {
    tr("consulter stat");
  }


  //---------------------------------
  //
  //---------------------------------
  rafraichirJournal()
  {
    this.tabFaits = Array(); 
    this.rafraichirFaitsDeSessions();
    this.rafraichirFaitsCommentaires();

    this.tabFaits.sort(this.compareDate);
    this.enleverDatesRedondantes();
  }
  
  
  //---------------------------------
  //
  //---------------------------------
  rafraichirFaitsCommentaires()
  {
    this.tabComment.forEach( (com,i) => {
      tr(com.Contenu + " " + com.Horodateur, 0);
      this.tabFaits.push(new Fait(i, this.sessTravCourante, false, com))
    });
  }

  //---------------------------------
  //
  //---------------------------------
  rafraichirFaitsDeSessions()
  {
    let compteur=0;
    
    this.tabSessionsTravail.forEach(sessTrav => {
        this.tabFaits.push(new Fait(++compteur, sessTrav))
        if (sessTrav.Fin !== null)
        {
          this.tabFaits.push(new Fait(++compteur, sessTrav, false))
        }
    })


  }

  //---------------------------------
  //
  //---------------------------------
  enleverDatesRedondantes()
  {
     let dateUnique = this.tabFaits[0].Date;
     for(let i=1; i< this.tabFaits.length; i++)
     {
       if(this.tabFaits[i].Date === dateUnique)
       {
          this.tabFaits[i].Date = '';
       }
       else
       {
           dateUnique = this.tabFaits[i].Date;   
       }
     }
  }
  
  //---------------------------------
  //
  //---------------------------------
  compareDate(f1:Fait, f2:Fait)
  {
    if (f1.Date > f2.Date)
      return -1;
    if (f1.Date < f2.Date)  
      return  1
    if (f1.Date === f2.Date)      
    {
        if (f1.Heure > f2.Heure)
           return -1;
        if (f1.Heure < f2.Heure)   
           return 1;
    }   
    return 0;
  }
   
  //---------------------------------
  //
  //---------------------------------
  annulerCommentaire()
  {
    this.commentaireVisible=false;
    this.btnCommentaireVisible = true;
    this.btnChangerTacheVisible =true;
    this.btnStatsVisible =true;
    this.btnConsulterTachesVisible=true;
    this.btnArreterSessionVisible=true;
  }

  //---------------------------------
  //
  //---------------------------------
  enregistrerCommentaire()
  {
      if (this.commentaireCourant.Contenu.length > 0)
      {

      this.commentaireCourant.IdSession = this.sessTravCourante.Id;
      this.commentaireCourant.IdDev = this.dev.Id;

      this.jvSrv.postCommentaire(this.commentaireCourant).subscribe(
      idComm =>
      {
        
        this.jvSrv.getCommentaires(this.dev.Id).subscribe(
          tabComms =>
          {
            this.tabComment = tabComms;
            this.rafraichirJournal();
            this.commentaireCourant = new Commentaire();
          }
        )
      }
     )
    }
    else
      tr("Votre commentaire est vide");

    // Ce n'est pas un vrai annuler() j'utilise juste la fonctionnalité
    this.annulerCommentaire();
  }
}
