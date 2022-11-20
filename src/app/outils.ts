export const serveur='http://localhost/jourvie_serveur_102/';

export function tr(msg:string, dlg=1, cons=1)
{
    if (dlg == 1)
    {
      alert(msg);  
    }
    if (cons == 1)
    {
        console.log(msg);
    }
}

export function getDateTimeISOString()
{
    //return new Date().toISOString();

    let date = new Date();

    let an = date.getFullYear();
    let strAn:string = '' + an;

    let mois = date.getMonth() + 1;
    let strmois:string;
    if (mois < 10)
       strmois= "0" + mois;
    else
        strmois = '' + mois;

    let jour = date.getDate();
    let strJour:string;
    if ( jour < 10)
       strJour = "0" + jour ;
    else
    strJour = '' + jour ;


    let  heure= date.getHours();
    let strHeure:string;
    if ( heure< 10)
    strHeure= "0" + heure;
    else
    strHeure = '' + heure;

    let min = date.getMinutes();
    let strmin:string;
    if ( min< 10)
       strmin ="0" + min ;
    else
        strmin = '' + min;

    let sec = date.getSeconds();
    let strsec:string;
    if ( sec< 10)
       strsec= "0" + sec ;
    else
        strsec = '' + sec;

     let dateISOStr = strAn + "-" + strmois + "-"  + strJour + " " + strHeure + ':' + strmin + ':' + strsec;
     return dateISOStr;
}