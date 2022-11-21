import { Component, OnInit } from '@angular/core';
import { JvService } from '../jv.service';
import { Developpeur } from '../modeles/Developpeur';
import { SommaireDev } from '../modeles/SommaireDev';
import { SommaireSessTrav } from '../modeles/SommaireSessTrav';
import { SommaireSessTravDev } from '../modeles/SommaireSessTravDev';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  visible = false;
  sommairesVisible = 0;
  sommairesDev: SommaireDev[] = [];
  sommairesSess: SommaireSessTrav[] = [];

  devCurr: Developpeur = new Developpeur();
  devCurrSommaire: SommaireSessTravDev[] = [];

  constructor(private jvSrv: JvService,) { }

  ngOnInit(): void {
    this.jvSrv.getSommairesDev().subscribe(som => {
      this.sommairesDev = som;
    })
    this.jvSrv.getSommairesSess().subscribe(som => {
      this.sommairesSess = som;
    })
  }

  Afficher() {
    this.visible = true;
  }

  AfficherDetail(mat: string) {
    let matricule = parseInt(mat.split(' ')[0])
    this.sommairesVisible = 2;

    this.jvSrv.getDev(matricule).subscribe(dev => {

      this.devCurr = dev;
      console.log(dev, this.devCurr);

      this.jvSrv.getSommairesSessTravDev(this.devCurr.Id).subscribe(devSom => {
        this.devCurrSommaire = devSom
        console.log(devSom);

      })
    })
  }


  toggle(n: number) {
    this.sommairesVisible = n;
  }
}
