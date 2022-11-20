import { tr } from "../outils";
import { Tache } from "./Tache";

export class SessionTravail
{
    Id:number=0;
    IdTache:number=0;
    TacheNumero:string='';
    Etat:string='';
    IdDev=0;
    Debut='';
    Fin:string='';
    Duree=0;
    
    constructor(id=0, tache:Tache=new Tache(), idDev=0, maintenant:string="1900-01-01 00:00:00")    
    {
        this.Id=id;
        this.IdTache = tache.Id;
        this.TacheNumero = tache.Numero;
        this.Etat='actif';
        this.IdDev= idDev;
        this.Debut=maintenant;
    }

    afficher()
    {
       let msg = "id:" + this.Id + "num tac:" + this.TacheNumero + " Début: " + this.Debut ;
       tr(msg,0);
    }

    calculeDuree()
    {
        if (this.Fin != '')
        {
            // La seesion est terminée
            let fin    = new Date(this.Fin).getTime();
            let debut  = new Date(this.Debut).getTime();

         //   tr("Epoch debut: " + debut + "\nnb sec: " + ((fin - debut)/1000));
        }
        else
        {
            // La session est en cours
            let fin    = new Date().getTime();
            let debut  = new Date(this.Debut).getTime();

           // tr("Epoch debut: " + debut + "\nnb sec: " + ((fin - debut)/1000));
            
        }
    }
}