export class Tache {
    Id: number;
    IdProjet: number;
    Numero: string;
    Titre: string;
    Description: string;
    Statut: string;
    DateDebut: string;
    DerniereModif: string;

    constructor(id: number = 0,
        IdProjet: number = 0,
        numero: string = "",
        titre: string = "",
        description: string = "",
        statut: string = "",
        dateDebut: string = "",
        derniereModif: string = "",
    ) {
        this.Id = id;
        this.IdProjet = IdProjet;
        this.Numero = numero;
        this.Titre = titre;
        this.Description = description;
        this.Statut = statut;
        this.DateDebut = dateDebut;
        this.DerniereModif = derniereModif;
    }
}