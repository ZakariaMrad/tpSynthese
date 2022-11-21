import { Component } from '@angular/core';
import { Developpeur } from './modeles/Developpeur';
import { tr} from './outils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jourvie';
  logonOK:boolean= false;
  devConnecte:Developpeur=new Developpeur();


  onConnexionReussie(dev:Developpeur)
  {
    tr("Event recu " + dev.Prenom, 0);
    this.logonOK = true;
    this.devConnecte = dev;
  }
  onConnexionAdmin(b:boolean){
    this.logonOK = b;
  }
}
