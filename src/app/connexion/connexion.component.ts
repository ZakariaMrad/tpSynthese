import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tr } from './../outils';
import {Developpeur } from './../modeles/Developpeur';
import { JvService } from '../jv.service';




@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  @Output() connexionReussie: EventEmitter<Developpeur> = new EventEmitter<Developpeur>();
  @Output() connexionAdmin: EventEmitter<boolean> = new EventEmitter<boolean>();
  developpeurConnecte:Developpeur = new Developpeur();
  Matricule:string = "";
  MotDePasse:string="";


  constructor(private jvSrv: JvService) { }

  ngOnInit(): void {
  }

  verifierConnexion()
  {
    if (this.Matricule=="admin" && this.MotDePasse == "11"){
      this.connexionAdmin.emit(true);
      return;
    }



    if (this.Matricule.length == 0)
    {
      // Forcer une connexion triche
      this.Matricule = '1111111';
      this.MotDePasse = '11';
    }
   
    this.jvSrv.getConnexion(this.Matricule, this.MotDePasse).subscribe( dev =>
     {
      console.log(dev);
         let to = typeof(dev);
         //tr('typeof dev =' +  to);
         if (to === 'string')
         {
           tr("Erreur de connexion");
         }
         else
         {
            tr("Bienvenue " + dev.Prenom, 0 );
            this.connexionReussie.emit(dev);
         }
      })
  }

  connexion()
  {
   
  }
  

 
/*
  if (this.Matricule.length == 0)
  {
    tr("Triche", 0);
    this.connexionReussie.emit(listeDeveloppeurs[0]);
    return;
  }
  */   

 /*
  let compteur = 0;

  for(let i=0; i< listeDeveloppeurs.length; i++)
  {
      compteur++; 
      tr(listeDeveloppeurs[i].Nom, 0);
      if (this.Matricule == listeDeveloppeurs[i].Matricule)
      {
         if (this.MotDePasse == listeDeveloppeurs[i].MotDePasse)
         {
           this.developpeurConnecte = listeDeveloppeurs[i];
           break;
         }
         else  
         {
           tr("mauvais mot de passe",0);
           compteur =0;
         }
        }
    }
    
    if (this.developpeurConnecte.Id === 0)
       tr("connexion impossible");
    else
    {
       tr("Event emit", 0);
       this.connexionReussie.emit(this.developpeurConnecte);
    }*/


}
