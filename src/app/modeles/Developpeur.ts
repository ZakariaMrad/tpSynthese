export class Developpeur {
    Id: number;
    Nom: string;
    Prenom: string;
    Matricule: string;
    MotDePasse: string;
    Etat: string;
    IdProjet: number;
    NomProjet: string;

    constructor(id: number = 0, nom: string = "", prenom: string = "", matricule: string = "",
        motDePasse: string = "", etat: string = "", IdProjet: number = 0, nomProjet: string = "") {
        this.Id = id;
        this.Nom = nom;
        this.Prenom = prenom;
        this.Matricule = matricule;
        this.MotDePasse = motDePasse;
        this.Etat = etat;
        this.IdProjet = IdProjet;
        this.NomProjet = nomProjet;
    }

}