import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tr, serveur } from './outils';
import {Developpeur } from './modeles/Developpeur';
import {Tache } from './modeles/Tache';
import { SessionTravail } from './modeles/SessionTravail';
import { Commentaire } from './modeles/Commentaire';


@Injectable({
  providedIn: 'root'
})
export class JvService {

  constructor(private http:HttpClient) { }

  getCommentaires(idDev:number)
  {
    let url= serveur + 'getCommentaires.php?idDev=' + idDev;
    return this.http.get<Commentaire[]>(url);
  }

  getConnexion(mat:string, mdp:string)
  {
    let url= serveur + 'connexion.php?mat=' + mat + "&mdp=" + mdp;
    return this.http.get<Developpeur>(url);
  }

  getSessionTravail(idSessTrav:number)
  {
    let url= serveur + 'getSessionTravail.php?idSessTrav=' + idSessTrav;
    return this.http.get<SessionTravail>(url);
   
  }

  getSessionsTravail(id: number) {
    let url= serveur + 'getSessionsTravail.php?idDev=' + id;
    return this.http.get<SessionTravail[]>(url);
  }

  getTaches(idProj:number)
  {
    let url= serveur + 'getTaches.php?idProj=' + idProj;
    return this.http.get<Tache[]>(url);
  }

  postCommentaire(com:Commentaire)
  {
    //tr("id sess:" + com.IdSession);

    let url= serveur + 'postCommentaire.php?idSession=' + com.IdSession + '&idDev='  + com.IdDev  + "&contenu=" + com.Contenu;
    const params = new HttpParams( {
      fromObject : {
        idSession: com.IdSession,
        idDev : com.IdDev,
        contenu : com.Contenu
      }})

    return this.http.post<Number>(url, params);
  }

  postSessionTravail(tac:Tache, dev:Developpeur)
  {
    let url= serveur + 'postSessionTravail.php';

    const params = new HttpParams( {
         fromObject : {
             idTac: tac.Id,
             tacNum : tac.Numero,
             idDev : dev.Id
         }
    })

    return this.http.post<number>(url, params);
  }

  putSessionTravail(id:number)
  {
    let url = serveur + 'putSessionTravail.php?id='  + id;
    return this.http.get<SessionTravail>(url);
  }



}
