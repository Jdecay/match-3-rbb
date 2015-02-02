// Hier schreiben wir unser Spiel



// Das Spieler Objekt

function spieler(name, punkte) {
    this.name = name;
    this.punkte = punkte;
};

// Das Spielstein Objekt

function spielstein(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.selected = false;
    this.flaggedForDeletion = false;

    this.select = function ()
    {
        if(spielerEingabe && !gameOver){
        console.warn(x + '/' + y);


        if (selektierterSpielstein)
        {
            // Fall bereits ein Stein selektiert
            console.info('Selektierter Stein ist : ' + selektierterSpielstein.x + ' / ' + selektierterSpielstein.y);
            console.info('Stein zum tauschen ist : ' + x + ' / ' + y);

            if (selektierterSpielstein === spielfeld[x][y])
            {
                console.log('Gleichen  Stein ausgewählt.');
            }
            if(moveIsvalid(selektierterSpielstein,spielfeld[x][y]))
            {
                spielerEingabe = false;
                tausche(selektierterSpielstein, spielfeld[x][y],true);
                spielfeldAktualisieren();
            }
            else
            {
                    console.log('Ungültiger Zug. Steine müssen nebeneinander liegen.');
                    
                    
                    // Steine wackeln lassen.
                    spielfeld[x][y].setMarked();
                    $('.selektiert').effect( "shake" );
                    unMarkAll();
                    selektierterSpielstein = null;
            }
            

        }
        else
        {
            // Bisher kein Stein selektiert, selektiere Stein.
            console.info('Selektierter Stein ist : ' + x + '/' + y);
            selektierterSpielstein = spielfeld[x][y];

            // tOdo div Element an position x/y selektieren
            selektierterSpielstein.setMarked();
        }
        // spielfeldAusgeben();
    }else
    {
        console.warn("Spieler muss wartern.");
    }

    }

    this.setMarked = function ()
    {
        // console.log('markiere Stein '+x+' / '+y);
        // console.log('#'+ x + '-d-' + y);
         $('#'+ x + '-d-' + y).toggleClass('selektiert');
         if(gameReady){
         pop();
            }
    }

    this.toString = function ()
    {
        return '[' + x + ',' + y + '('+this.flaggedForDeletion+')]';
    }


    //Beispiel Methode
    //this.name = function() {return this.firstName + " " + this.lastName;};
}


// Platz für Variablen

// Der Spielfeld Array
spielfeld = [];

// Der Bilder Array der Werte auf Spielsteine abbildet
var spielsteine = [];

var anzahlSteine = 4;

// Anzahl Reihen 
var rows = 5;

// Anzahl Spalten
var cols = 8;

var game;

var initialisiert = false;

var gameReady = false;

var boardFull = false;

var gameOver = false;

var selektierterSpielstein;

var leeresBild = 'img/spielfeld/background.png';

var punkteStand = 0;

var timer;

var countInSeconds = 90;

var spielerEingabe = false;

//Der Spieler
var sp;

var musicPlayer;

var soundeffects = ['soundeffects/pop.ogg'];

var music = ['music/doodle.mp3'];

// Platz für Methoden

function spielfeldInitialisieren()
{

    console.info("Erstelle Spielfeld");
    neuesSpielfeld();
    spielfeldZeichnen();
    console.log("Spielfeld erfolgreich erstellt.");
    initialisiert = true;
    boardFull = true;
}

// Tauscht zwei übergebene Spielsteine auf dem Spielfeld
function tausche(spielstein1, spielstein2,spielertausch)
{
    // console.info("Tausche Stein " + spielfeld[spielstein1.x][spielstein1.y].toString() + " mit Stein " + spielfeld[spielstein2.x][spielstein2.y].toString());

    // console.info(spielfeld[spielstein1.x][spielstein1.y].toString());
    // console.info(spielfeld[spielstein2.x][spielstein2.y].toString());
    // console.warn('getauscht');

    // Erstelle Kopie von Spielstein 1 
    var copy = new spielstein(spielstein1.x, spielstein1.y, spielstein1.value);

    // Tausche Spielstein 1 mit Spielstein 2
    spielfeld[spielstein1.x][spielstein1.y] = new spielstein(spielstein1.x, spielstein1.y, spielstein2.value);
    spielfeld[spielstein1.x][spielstein1.y].flaggedForDeletion = spielstein2.flaggedForDeletion;

    // Ersetze Spielstein
    spielfeld[spielstein2.x][spielstein2.y] = new spielstein(spielstein2.x, spielstein2.y, spielstein1.value);
    spielfeld[spielstein2.x][spielstein2.y].flaggedForDeletion = spielstein1.flaggedForDeletion;


     // console.info(spielfeld[spielstein1.x][spielstein1.y].toString());
     // console.info(spielfeld[spielstein2.x][spielstein2.y].toString());


    selektierterSpielstein = null;

    if(spielertausch)
    {
        startLoop();
    }

}

function spielfeldZeichnen()
{

    $("#spielcontainer").empty();
    // Erstelle Spielfeld mithilfe jQuery
    // Durchlaufe jedes Element im Spielfeld Array 

    // Oberen Rand erstellen
     var row = $('<div/>', {
            id: "toprow",
            class: "row toprow"
        }).appendTo("#spielcontainer");

    // Eck-element OL 
        var div = document.createElement('div');
        div.setAttribute('class','spielstein ecke_ol');
        $(div).appendTo(row);

        // Oberen Rand
       for (var k = 0, l = spielfeld[0].length; k < l; k++)
    {
        var div = document.createElement('div');
        div.setAttribute('class','spielstein rand_oben');
        $(div).appendTo(row);


    } 

        //Eck-element  OR

        var div = document.createElement('div');
        div.setAttribute('class','spielstein ecke_or');
        $(div).appendTo(row);





    for (var k = 0, l = spielfeld.length; k < l; k++)
    {

        // Erstelle Reihe

        var row = $('<div/>', {
            id: "row." + k,
            class: "row"
        }).appendTo("#spielcontainer");

        

        for (var m = 0, n = spielfeld[k].length+2; m < n; m++)
        {
            //Erstes Element ist Randelement
            if(m === 0 || m === spielfeld[k].length+1 )
            {

                var div = document.createElement('div');
                // Rand is links
                if(m === 0)
                {
                    div.setAttribute('class', 'spielstein rand_links');
                }
                else
                {
                    div.setAttribute('class', 'spielstein rand_rechts');

                }
                $(div).appendTo(row);
            }
            else
            {
            //Normale Spielsteine
            var div = document.createElement('div');
            div.setAttribute('class', 'spielstein');
            div.setAttribute('id', k + '-d-' +(m-1));

            $(div).appendTo(row);

            // console.info(spielfeld[k][m].mydiv);

            $(div).on("click", spielfeld[k][m-1].select);

            // Farbe des Steins ermittlen und Bild anfügen
            var farbe = spielsteine[spielfeld[k][m-1].value];
            if (spielfeld[k][m-1].flaggedForDeletion)
            {
                console.info('Stein gelöscht');
                farbe = leeresBild;
            }

            var image = document.createElement('img');

            image.setAttribute('src', farbe);


            image.setAttribute('id', k + '-i-' + (m-1));
            image.setAttribute('title', '[X : ' + spielfeld[k][m-1].x + ', Y : ' + spielfeld[k][m-1].y + ' ] Value :' + spielfeld[k][m-1].value);

            $(image).appendTo(div);
                
            }

        }
    }

    // Unteren Rand erstellen
     var row = $('<div/>', {
            id: "botrow",
            class: "row botrow"
        }).appendTo("#spielcontainer");

    // Eck-element OL 
        var div = document.createElement('div');
        div.setAttribute('class','spielstein ecke_ul');
        $(div).appendTo(row);

        // Oberen Rand
       for (var k = 0, l = spielfeld[0].length; k < l; k++)
    {
        var div = document.createElement('div');
        div.setAttribute('class','spielstein rand_unten');
        $(div).appendTo(row);


    } 

        //Eck-element  OR

        var div = document.createElement('div');
        div.setAttribute('class','spielstein ecke_ur');
        $(div).appendTo(row);
}

function pruefeUmfeld(spielstein)
{
    // Pruefe für jeden Spielstein in der Umgebung ob er der gleichen Farbe wie der übergebende Spielstein hat
    // Gib dann einen array aller umliegenden Spielsteine zurück
}

// Funktion die überprüft ob die beiden übergebenen Spielsteine nebeneinander liegen
function moveIsvalid(spielstein1,spielstein2)
    {
    // x - Richtung darf um 1 abweichen
    if(spielstein1.x + 1 === spielstein2.x && spielstein1.y === spielstein2.y)
    {
        return true;
    } 
    if(spielstein1.x - 1 === spielstein2.x && spielstein1.y === spielstein2.y)
    {
        return true;
    }
    // y - Richtung darf um 1 abweichen
    if(spielstein1.y + 1 === spielstein2.y && spielstein1.x === spielstein2.x)
    {
        return true;
    }
    if(spielstein1.y -1 === spielstein2.y && spielstein1.x === spielstein2.x)
    {
        return true;
    }

    return false;
    // Es darf aber nur ein Wert abweichen !! (Durch && erreicht)
}


// Methode pruefeReihe nimmt einen Array von Werten entgegen und sucht nach folgen > 3 mit gleichen Wert
function pruefeReihe(array, isReihe)
{
    // Variable die den Wert des zuletzt besuchten Feldes speichert
    var saved = undefined;

    // Zählvariable
    var count = 1;

    // gefundene Paar
    var pairs = 0;

    //arrayAusgeben(array);
    // Prüfe für alle Felder im Array
    for (var i = 0, len = array.length; i < len; i++) {
        // if(isReihe)
        // {
        //     console.info("Pruefe Reihe");
        // }
        // else
        // {
        //     console.info("Pruefe Spalte");

        // }
        // Falls kein Feld besucht wurde, setze Feld auf aktuelles Feld und gehe eins weiter
        if (saved === undefined)
        {
            // console.info('pruefeReihe saved === undefined');
            saved = array[i];
        }
        //Falls bereits ein Feld besucht wurde, vergleiche aktuelles mit gespeichertem Feld
        else
        {
            //Prüfe Werte der beiden Felder auf Gleichheit
            if (saved.value === array[i].value)
            {
                // Feld ist gleich, erhöhe Zählvariable
                count++;
                // console.info('Feld' + saved.toString() + ' und ' + array[i].toString() + ' sind gleich');

                // Pruefe ob letztes Element des arrays
                if (i + 1 === len)
                {
                    // Falls mehr als drei Elemente, markiere Elemente
                    if (count >= 3) {
                        
                    if(saved.flaggedForDeletion === false && gameReady){
                        punkteBerechnung(count);
                    }
                        pairs++;
                        // console.log(count + ' gefunden.Letztes Element.');
                        var position = array.indexOf(saved);
                        markiereSteine(saved.x, saved.y, isReihe, count);

                    }

                }

            }
            //Felder sind nicht gleich
            else
            {
                // Überprüfe ob mehr als 3 Felder hintereinander gefunden wurden
                if (count >= 3)
                {
                    //für Punkte Rechnung
                    if(saved.flaggedForDeletion == false && gameReady){
                        punkteBerechnung(count);
                    }
                    pairs++;
                    
                    // Mehr als drei Felder gleicher Farbe hintereinander wurden gefunden
                    // Durchlaufe alle Felder und setze diese auf destroyable
                    // i ist position im array / i-count ist erster Block der Reihe


                    // Anhand der Zählvariable Größe der Folge finden und Punkte vergeben

                    // Position des ersten zu markierenden Steins im array
                    var position = array.indexOf(saved);

                    markiereSteine(saved.x, saved.y, isReihe, count);
                    count = 1;
                }
                // Weniger als 3 Felder gleicher Farbe wurden gefunden
                else
                {
                    count = 1;
                }
                // Speichere aktuelles Feld
                saved = array[i];

            }
        }


    }
    arrayAusgeben(array);
    return pairs;

}

function markiereSteine(posX, posY, isReihe, count)
{
    // console.log(count + ' gefunden.');
    // console.log('Starte von stein ' + spielfeld[posX][posY].toString() + ' Reihe :' + isReihe);

    for (var k = 0; k < count; k++)
    {
        // Markiere Felder die gelöscht werden können
        if (isReihe)
        {
            // array repräsentiert eine Reihe, markiere steine auf der x achse indem du y erhöst
            spielfeld[posX][posY + k].flaggedForDeletion = true;
            spielfeld[posX][posY + k].setMarked();
        }
        else
        {
            // array repräsentiert eine Spalte, markiere steine auf der y achse indem du x erhöst
            spielfeld[posX + k][posY].flaggedForDeletion = true;
            spielfeld[posX + k][posY].setMarked();
        }
    }
}

function unMarkAll()
{
    $('.selektiert').removeClass('selektiert');

}

function spielfeldPruefen()
{
    // spielfeldAusgeben();
    var foundMatches = 0;
    // Reihen überprüfen
    for (var i = 0; i < cols; i++)
    {
        // console.log('Pruefe Reihe '+i);
        // console.log(spielfeld[i],true);
        foundMatches += pruefeReihe(spielfeld[i], true);
    }

    // Spalten überprüfen
    for (var i = 0; i < rows; i++)
    {
        // console.log('Pruefe Spalte '+i);
        // console.log(getSpalte(i),false);
        foundMatches += pruefeReihe(getSpalte(i), false);

    }

    if(foundMatches === 0)
        {
            console.log("Keine Paare gefunden.Spielfeld ist bereit");
            boardFull = true;
        }

        else
        {
           console.log("spielfeldPruefen hat "+foundMatches+" Paare gefunden");
           boardFull = false;

        }
    // spielfeldAusgeben();
}

function spielfeldAuffuellen()
{
    var emptyFields = 0;
    // Pruefe ob die oberste Reihe 'leere' Felder hat
    // Falls ja, fülle diese
    for (var i = 0; i < rows; i++) {

        if (spielfeld[0][i].flaggedForDeletion)
        {
            console.info('Leeres Feld gefunden. Fülle auf.')
            spielfeld[0][i] = new spielstein(0, i, getRandomInt(0, 8));
            emptyFields++;
        }

    }

    if(emptyFields === 0)
    {
        console.info("Spielfeld ist voll");
        boardFull = true;

    }
    else
    {

        console.info("Reihe mit "+emptyFields+" gefüllt.");
    }

}



    //-- countdown part begins --
        var updateTime = countInSeconds;
        function startTimer()
        {
            if(timer)
            {
                // Timer existiert. Alten Timer stoppen
                stopTimer();
                updateTime = countInSeconds;
                
            }
            timer = window.setInterval(function() {
                    updateTime = updateTime - 1;
                    $("b[id=show-time]").html(updateTime);

                    if(updateTime === 0){
                        //wenn Timer abläuft
                        $('#gameOver').modal('show');
                        $('#punkteStandBeiGameOver').text(sp.punkte);
                        gameOver = true;
                        updateTime = 50;
                        stopTimer();
                    }
                }, 1000);
        
            
        };

    //-- countdown part ends --

function stopTimer()
{
    clearInterval(timer); 
}

function arrayAusgeben(array)
{
    if (array != undefined) {
        var werte = [];
        for (var i = 0; i < array.length; i++)
        {
            werte.push(array[i].value);
        }
        // console.info(werte);
    }
    else
    {
        console.info('Array is undefined');
    }
}

// Funktion die 
function getSpalte(y)
{
    var spalte = [];
    for (var i = 0; i < spielfeld.length; i++)
    {
        spalte.push(spielfeld[i][y]);
    }
    // console.info('GetSpalte() liefert');
    // console.info(spalte);
    return spalte;

}

// Funktion die den spielfeld array , Menschen leserlich auf der Console ausgibt.
function spielfeldAusgeben()
{
    console.info('#######FELD-START#######');

    //Für Anzahl Spalten
    for (var i = 0; i < cols; i++)
    {
        var reihe = '|';
        // Für Anzahl Reihen
        for (var j = 0; j < rows; j++)
        {
            // Gib ein *X* als gelöscht aus
            if (spielfeld[i][j].flaggedForDeletion)
            {
                reihe += '[X]';
            }
            else {
                // Gib den Feldwert auf der Konsole aus
                reihe += '[' + spielfeld[i][j].value + '(' + spielfeld[i][j].x + ',' + spielfeld[i][j].y + ')(' + spielfeld[i][j].flaggedForDeletion + ')]';
            }
        }
        reihe += '|';

        console.info(reihe);

    }

    console.info('#######FELD-ENDE#######');

}

// Funktion die die Bilder für die Spielsteine in einen Array lädt.
function ladeBilder()
{
    console.log("Versuche Bilder zu laden.");

    for (var i = 0; i < 9; i++)
    {
        spielsteine.push("img/steine/" + i + ".png");
    }
    console.log(spielsteine);
    console.log("Bilder erfolgreich geladen.");
}

// Funktion die den Spielstart realisiert
function starteSpiel()
{
    gameReady = false;
    gameOver = false;
    resetPlayerPoints();

    if (!initialisiert)
    {

        // Bilder laden
        ladeBilder();

        // Spielfeld initialisieren
        spielfeldInitialisieren();


        // Neuer Spieler "Default"
        spielerErstellen();

        playMusic();
        startLoop();
        startTimer();
    }
    else
    {
        selektierterSpielstein = null;
        unMarkAll();
        neuesSpielfeld();
        spielfeldAktualisieren();
        startLoop();
        startTimer();
    }
}

function starteBenutzerdefiniertesSpiel()
{
    rows = $('#bdef_reihen').val();
    cols = $('#bdef_spalten').val();
    spielfeldInitialisieren();
    spielfeldZeichnen();
    starteSpiel();
    startLoop();
    startTimer();
}

function startLoop()
{
  game =  setInterval(function(){GameLoop();},100);
}


function stopLoop()
{
    clearInterval(game);
}

// Die Spiel Schleife des Spiels die 3-er Felder markiert und beendet wird sobald das Spielfeld bereit ist (Spielstart und Nach Benutzereingabe)
function GameLoop()
{

    // Spielfeld zeichnen
    spielfeldAktualisieren();

    // Falls Spielfeld bereit ist
    if(boardFull)
    {
    // Spielfeld auf '3' prüfen
    console.log("Spielfeld voll, prüfe auf 3");
    spielfeldPruefen();
    }
    else
    {
        // Steine bewegen
    moveBlocks();

    while(!boardFull)
    {
    // Spielfeld auffuellen
        fuellen();
    }

    }
    spielfeldPruefen();
    if(boardFull)
    {
        // Spielfeld ist bereit
        // Gucken ob es mögliche Züge gibt
         if(!CheckMovePossible())
            {
                shakeBoard();
                console.warn("Kein Zug mehr möglich");
                neuesSpielfeld();
            }
        else
            {
                console.warn("Warte auf Benutzereingabe");
                stopLoop();
                gameReady = true;
                spielerEingabe = true;
            }
    }
    



    // Nichts tun und GameLoop weiter laufen lassen

    // Spielzug möglich ?
       



}

function fuellen()
{
    moveBlocks();
    spielfeldAktualisieren();
    spielfeldAuffuellen();
}

function shakeBoard()
{
    $('#spielcontainer').effect( "shake" );
}

// Funktion die ein neues Spielfeld per RNG generiert.
function neuesSpielfeld()
{

    spielfeld = [];

    // spielfeldAusgeben();
    //Für Anzahl Spalten
    for (var i = 0; i < cols; i++)
    {
        row = [];
        // Für Anzahl Reihen
        for (var j = 0; j < rows; j++)
        {
            // Fülle Reihen-Array mit Spielsteinen zufälligen Werten
            row.push(new spielstein(i, j, getRandomInt(0, anzahlSteine)));
        }

        // Füge Reihen-Array zum Spalten-Array hinzu
        spielfeld[i] = row;
    }
    console.info('Neues Spielfeld generiert.');
    // spielfeldAusgeben();

    //punkteStandZuruecksetzen();
}


// Funktion die das komplette Spielfeld löscht und neu zeichnet.
function spielfeldAktualisieren()
{
    console.info('Aktualisiere Spielfeld.');
    unMarkAll();
    // Jedes Feld durchlaufen und image aktualisieren
     //Für Anzahl Spalten
    for (var i = 0; i < cols; i++)
    {
        // Für Anzahl Reihen
        for (var j = 0; j < rows; j++)
        {
            // Erfasse Spielstein Wert
            // var farbe = spielfeld[j][i].value;
             // console.log("Value an "+i+" "+j+" = "+spielfeld[i][j].value);

            var divId = "#"+i+"-d-"+j;
            // Selektiere entsprechendes Div
            var div = $(divId).empty();

             // Farbe des Steins ermittlen und Bild anfügen
            var farbe = spielsteine[spielfeld[i][j].value];

            
            if (spielfeld[i][j].flaggedForDeletion)
            {
                farbe = leeresBild;
            }

            var image = document.createElement('img');

            image.setAttribute('src', farbe);
            image.setAttribute('id', i + '-i-' + j);
            image.setAttribute('title', '[X : ' + spielfeld[i][j].x + ', Y : ' + spielfeld[i][j].y + ' ] Value :' + spielfeld[i][j].value);

            $(image).appendTo(div);
            // console.log()

            // ändere image des divs
            
        }

    }
    // spielfeldAusgeben();

}

// RNG (Random Number Generator) des Spiels
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Abschnitt Musik und Soundeffeckte

function playMusic()
{
    musicPlayer = new Howl({
        urls : ['music/doodle.mp3'],
        loop: true,
        volume: 0.3
    }).fadeIn(0.5, 5000);

  //   var sound = new Howl({
  // urls: ['sound.mp3']
// }).play();
}

function toggleMusic()
{
    if(musicPlayer)
    {
        musicPlayer.stop();
        musicPlayer = "";
        console.log("Musik gestoppt.");
        $('#music_toggle').toggleClass('striketrough');
    }
    else
    {
        playMusic();
        console.log("Musik gestartet.");
    }
}



function pop()
{
    var pop = new Howl({
        urls : ['sounds/pop.ogg']
    }).play();

}

// Funktion die aufgerufen wird sobald die Seite geladen wurde.
$(document).ready(function ()
{
    starteSpiel();
});



//######################### Martins Block Start ############################//


function moveBlocks()
{
    // Für jede Reihe (von unten nach oben) (ausser der obersten reihe)
   for (var j = cols-1; j > 0; j--)
        {
            // console.log("Bewege Reihe "+j);
            for (var i = 0; i < rows; i++)
            {
             // Für Anzahl Reihen
        
            //Prüfe für jedes Element 
            // Bin ich zum löschen markiert ?
            var isEmpty = spielfeld[j][i].flaggedForDeletion;
            
            // Wenn ja, tausche mich mit Feld über mir
                if(isEmpty)
                {
                    tausche(spielfeld[j][i],spielfeld[j-1][i]);
                    boardFull = false;
                }
                // Wenn nein, tue nichts
                else
                {

                }


             }
        }
    spielfeldAktualisieren();

}







function CheckMovePossible()
{
//Ausgegangen wird davon das kein Spielstein für die Löschung markiert ist
//Variable zählt mögliche Spielzüge
var count = 0; 

//Durchgang Reihe
for (var xi=0;xi<=cols-1;xi++)
    {

    for(var yi=0;yi<=rows-1;yi++)
        {

            for(pi=1;pi<=4;pi++)
            {
                if(boolMovePossibilties(xi, yi, spielfeld[xi][yi].value, pi))
                    {
                        console.log("Spielzug möglich an Position : ["+xi+"]["+yi+"]");
                        count++;
                    }
                }
            }
        }
    if(count === 0)
    {
        console.log("Kein Spielzug möglich!");
        return false;
    }
    else
    {
        console.log(count.toString()+" Spielzüge möglich");
        return true;
    }
}

function boolMovePossibilties(x, y, value, intPosib)
{
    // TODO!!!! Überprüfung OutOfBoundException bei Randelementen!
    var boolPoss = false
    switch(true){
        case intPosib===1&& x+1<=cols-1: // 2 nebeneinander horizontal
            if(spielfeld[x+1][y].value===value)
            {
                switch(true){
                case x+3<cols:
                    if(spielfeld[x+3][y].value===value)
                        {
                            boolPoss = true;
                        }
                    break;
                case x+2<cols && y+1 <rows:
                    if(spielfeld[x+2][y+1].value===value) 
                        {
                            boolPoss = true;
                        } 
                    break;
                case y-1>=0 && x+2<cols: 
                    if(spielfeld[x+2][y-1].value===value)
                        {
                            boolPoss = true; 
                        } 
                        break; 
                case x-1>=0 && y+1<rows: 
                    if(spielfeld[x-1][y+1].value===value)
                        {
                            boolPoss = true; 
                        } 
                        break;
                case x-1>=0 && y-1<=0: 
                    if(spielfeld[x-1][y-1].value===value)
                        {
                            boolPoss = true; 
                        } 
                        break;
                case x-2>=0: 
                    if(spielfeld[x-2][y].value===value)
                        {
                            boolPoss =true; 
                        } 
                        break;                  }
            }
            break;
        case intPosib===2&& x+2<=cols-1: //2 m Lücke vertikel
            if(spielfeld[x+2][y].value===value)
            {
                switch(true){
                case x+1<cols && y+1<rows:
                    if(spielfeld[x+1][y+1].value===value)
                        { 
                            boolPoss = true; 
                        }
                        break;
                case y-1>=0 && x+1<cols: 
                    if(spielfeld[x+1][y-1].value===value)
                        {
                            boolPoss = true; 
                        } 
                        break;
            }
        }
        break;
        case intPosib===3&& y+1<=rows-1: //2 nebeneinander vertikal
            if(y+1<=rows-1 && spielfeld[x][y+1].value===value)
            {
                switch(true){
                case y+2<rows:
                    if(spielfeld[x][y+2].value===value)
                        {
                            boolPoss = true;
                        } 
                    break;
                case x+2<cols && y+1<rows:
                    if(spielfeld[x+2][y+1].value===value) 
                        {
                            boolPoss = true; 
                        }
                    break;
                case y-1>=0 && x+1<cols: 
                    if(spielfeld[x+1][y-1].value===value) 
                        {
                            boolPoss = true; 
                        } 
                    break;
                case x-1>=0: 
                    if(spielfeld[x-1][y].value===value) 
                        {
                            boolPoss = true; 
                        } 
                    break;
                case x-1>=0 && y-1<=0:
                    if(spielfeld[x-1][y-1].value===value) 
                        {
                            boolPoss = true; 
                        } 
                    break;
                case y-2>=0: 
                    if(spielfeld[x][y-2].value===value) 
                        {
                            boolPoss = true; 
                        } 
                    break;
            }
        }
        break;
        case intPosib===4 && y+2<=rows-1: //2 m Lücke horizontal
            if(spielfeld[x][y+2].value===value)
            {
                switch(true){
                case x+1<cols && y+1<rows:
                if(spielfeld[x+1][y+1].value===value)
                {
                    boolPoss = true;
                } 
                break;
                case x-1>=0 && y+1<rows: 
                if(spielfeld[x-1][y+1].value===value)
                 {
                    boolPoss = true; 
                 } 
                 break;
            }
            }
            break;
    }
    if(boolPoss){
        console.log("möglicher Spielzug entdeckt");
    }
    return boolPoss;
}

//######################### Martins Block Ende ############################//


//######################### Olivers Block Start ############################//

// Neuer Spieler
function neuerSpieler() {
    $(document).ready(function() {
        $('#neuerSpieler').modal('show');
        $('#neuerSpieler')

    });
};

$('#spielernameForm').on('submit', function(event){
    event.preventDefault();
});

function spielerErstellen() {           
    sp = new spieler("Gast", 0);
    if($('#nameInput').val().length <= 0)
    {
        console.log("Keinen Spielername eingegeben");
    }
    else
    {
        sp.name = $('#nameInput').val();

    }
    console.log(sp);
    $('#spielerName').text(sp.name);
    $('#spieler_punkte').text(sp.punkte);
    console.log(sp.punkte);
    $('#neuerSpieler').modal('hide');
}

function resetPlayerPoints()
{
    if (sp)
    {
        sp.punkte = 0;
        $('#spieler_punkte').text(sp.punkte);

    }
}

//######################### Olivers Block Ende ############################//


//######################### Volkans Block Start ############################//

function punkteBerechnung(count) {
    var wert = (count * 100) / (2 / count)
    console.log('Punkte = '+wert);
    sp.punkte += wert;
    var test = sp.punkte;
    //html highscore updaten 
    $(document).ready(function ()
    {
        $("#spieler_punkte").text("Punkte : "+test);
    });
}


$(".blocks").change(function () {

    anzahlSteine = ($(".blocks").val()) - 1;
    //console.log($( ".blocks" ).var());
    console.log(anzahlSteine);
});

$(".cols").change(function () {
    cols = $(".cols").val();
    //console.log($( ".blocks" ).var());
    console.log(cols);
});

$(".rows").change(function () {
    rows = $(".rows").val();
    //console.log($( ".blocks" ).var());
    console.log(rows);
});

//######################### Volkans Block Ende ############################//

