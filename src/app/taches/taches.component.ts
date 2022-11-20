import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tache } from './../modeles/Tache';
import { Developpeur } from './../modeles/Developpeur';
import { tr } from '../outils';
import { JvService } from '../jv.service';


@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  @Output()
  demarrerSessionTravail: EventEmitter<Tache> = new EventEmitter<Tache>();

  @Output()
  connexionDevActif: EventEmitter<Developpeur> = new EventEmitter<Developpeur>();
  visible=false;
  ListeTaches:Tache[] = [];
  dev:Developpeur = new Developpeur();
  constructor(private jsSrv: JvService){}

  ngOnInit(): void {
  }

  onConnexionReussie(dev:Developpeur)
  {
    
     this.dev = dev;
     if (dev.Etat == "actif")
     {
      this.visible = false;
      this.connexionDevActif.emit(dev);
     }
     else
     {
      this.jsSrv.getTaches(dev.IdProjet).subscribe( tabTaches =>
        {
           this.ListeTaches = tabTaches;
        })
      this.visible = true;
     }     
  }

  ouvrirStatistiques()
  {
    tr('stats');
  }

  ouvrirJournal()
  {
    tr("journal");
  }

  demarrerSessTrav(tac:Tache)
  {
    this.visible=false;
    this.demarrerSessionTravail.emit(tac);
    tr('sess trav sur tac:' + tac.Titre, 0);
  }

  onChangementTache(dev:Developpeur)
  {
    this.dev = dev;
    this.jsSrv.getTaches(dev.IdProjet).subscribe( tabTaches =>
      {
         this.ListeTaches = tabTaches;
      })
    this.visible=true;
  }
}
