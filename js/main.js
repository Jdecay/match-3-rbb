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
    this.mydiv;

    this.select = function ()
    {


        console.warn(x + '/' + y);

        console.log(this.spielstein.flaggedForDeletion);

        if (selektierterSpielstein)
        {
            // Fall bereits ein Stein selektiert
            console.info('Selektierter Stein ist : ' + selektierterSpielstein.x + ' / ' + selektierterSpielstein.y);
            console.info('Stein zum tauschen ist : ' + x + ' / ' + y);

            if (selektierterSpielstein === spielfeld[x][y])
            {
                console.log('Gleichen  Stein ausgewählt.');
            }
            tausche(selektierterSpielstein, spielfeld[x][y]);
            spielfeldAktualisieren();

        }
        else
        {
            // Bisher kein Stein selektiert, selektiere Stein.
            console.info('Selektierter Stein ist : ' + x + '/' + y);
            selektierterSpielstein = spielfeld[x][y];
            selektierterSpielstein.mydiv.setAttribute('class', 'spielstein selektiert');
        }
        spielfeldAusgeben();


    }

    this.setMarked = function ()
    {
        // console.log(this.mydiv);
        this.mydiv.setAttribute('class', 'spielstein markiert');
        // console.log(this.mydiv);
    }

    this.toString = function ()
    {
        return '[' + x + ',' + y + ']';
    }


    //Beispiel Methode
    //this.name = function() {return this.firstName + " " + this.lastName;};
}


// Platz für Variablen

// Der Spielfeld Array
spielfeld = [];

// Der Bilder Array der Werte auf Spielsteine abbildet
var spielsteine = [];

var anzahlSteine = 5;

// Anzahl Reihen 
var rows = 8;

// Anzahl Spalten
var cols = 15;

var initialisiert = false;

var gameReady = false;

var selektierterSpielstein;

var leeresBild = 'img/spielfeld/background.png';

var punkteStand = 0;

var timer;

var countInSeconds = 90;

//Der Spieler
var sp;

// Platz für Methoden

function spielfeldInitialisieren()
{

    console.info("Erstelle Spielfeld");
    neuesSpielfeld();
    spielfeldZeichnen();
    console.log("Spielfeld erfolgreich erstellt.");
    initialisiert = true;
}

// Tauscht zwei übergebene Spielsteine auf dem Spielfeld
function tausche(spielstein1, spielstein2)
{
    console.info("Tausche Stein " + spielfeld[spielstein1.x][spielstein1.y].toString() + " mit Stein " + spielfeld[spielstein2.x][spielstein2.y].toString());
    // console.info(spielfeld[spielstein1.x][spielstein1.y]);
    // console.info(spielfeld[spielstein2.x][spielstein2.y]);

    console.info(spielfeld[spielstein1.x][spielstein1.y].toString());
    console.info(spielfeld[spielstein2.x][spielstein2.y].toString());
    console.warn('getauscht');
    // Erstlle Kopie von Spielstein 1 
    var copy = new spielstein(spielstein1.x, spielstein1.y, spielstein1.value);

    // Tausche Spielstein 1 mit Spielstein 2
    spielfeld[spielstein1.x][spielstein1.y] = new spielstein(spielstein1.x, spielstein1.y, spielstein2.value);
    spielfeld[spielstein1.x][spielstein1.y].flaggedForDeletion = spielstein1.flaggedForDeletion;
    // Ersetze Spielstein
    spielfeld[spielstein2.x][spielstein2.y] = new spielstein(spielstein2.x, spielstein2.y, spielstein1.value);
    spielfeld[spielstein2.x][spielstein2.y].flaggedForDeletion = spielstein2.flaggedForDeletion;


    // console.info(spielfeld[spielstein1.x][spielstein1.y].toString());
    // console.info(spielfeld[spielstein2.x][spielstein2.y].toString());


    selektierterSpielstein = null;

}

function spielfeldZeichnen()
{
    // Erstelle Spielfeld mithilfe jQuery
    // Durchlaufe jedes Element im Spielfeld Array 

    for (var k = 0, l = spielfeld.length; k < l; k++)
    {

        // Erstelle Reihe

        var row = $('<div/>', {
            id: "row." + k,
            class: "row"
        }).appendTo("#spielcontainer");


        for (var m = 0, n = spielfeld[k].length; m < n; m++)
        {


            var div = document.createElement('div');

            if (spielfeld[k][m].flaggedForDeletion === true)
            {
                div.setAttribute('class', 'spielstein markiert');
            }
            else
            {
                div.setAttribute('class', 'spielstein');

            }
            div.setAttribute('id', k + '.d.' + m);
            div.spielstein = spielfeld[k][m];

            spielfeld[k][m].mydiv = div;
            $(div).appendTo(row);

            // console.info(spielfeld[k][m].mydiv);

            $(div).on("click", spielfeld[k][m].select);

            // Farbe des Steins ermittlen und Bild anfügen
            var farbe = spielsteine[spielfeld[k][m].value];
            if (spielfeld[k][m].flaggedForDeletion)
            {
                console.info('Stein gelöscht');
                farbe = leeresBild;
            }

            var image = document.createElement('img');

            image.setAttribute('src', farbe);


            image.setAttribute('id', k + '.i.' + m);
            image.setAttribute('title', '[X : ' + spielfeld[k][m].x + ', Y : ' + spielfeld[k][m].y + ' ] Value :' + spielfeld[k][m].value);

            $(image).appendTo(div);
            // var image = $('<img/>',{
            // 	src:  farbe,
            // 	id: k+'.i.'+m,
            // 	width : "32px",
            // 	height : "32px"
            // }).appendTo(div);




            // console.log('#'+k+'.'+m);

            // Eher unnötig


            // $(".spielstein").draggable(
            // 	{
            // 		containment: "#spielcontainer"
            // 	});
            // $(".spielstein").droppable();
        }
    }
}

function pruefeUmfeld(spielstein)
{
    // Pruefe für jeden Spielstein in der Umgebung ob er der gleichen Farbe wie der übergebende Spielstein hat
    // Gib dann einen array aller umliegenden Spielsteine zurück
}


// Methode pruefeReihe nimmt einen Array von Werten entgegen und sucht nach folgen > 3 mit gleichen Wert
function pruefeReihe(array, isReihe)
{
    // Variable die den Wert des zuletzt besuchten Feldes speichert
    var saved = undefined;

    // Zählvariable
    var count = 1;

    //arrayAusgeben(array);
    // Prüfe für alle Felder im Array
    for (var i = 0, len = array.length; i < len; i++) {

        // Falls kein Feld besucht wurde, setze Feld auf aktuelles Feld und gehe eins weiter
        if (saved === undefined)
        {
            console.info('pruefeReihe saved === undefined');
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
                console.info('Feld' + saved.toString() + ' und ' + array[i].toString() + ' sind gleich');

                // Pruefe ob letztes Element des arrays
                if (i + 1 === len)
                {
                    // Falls mehr als drei Elemente, markiere Elemente
                    if (count >= 3) {
                        
                    if(saved.flaggedForDeletion == false){
                        punkteBerechnung(count);
                    }

                        console.log(count + ' gefunden.Letztes Element.');
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
                    if(saved.flaggedForDeletion == false){
                        punkteBerechnung(count);
                    }
                    
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
    //arrayAusgeben(array);

}

function markiereSteine(posX, posY, isReihe, count)
{
    console.log(count + ' gefunden.');
    console.log('Starte von stein ' + spielfeld[posX][posY].toString() + ' Reihe :' + isReihe);

    for (var k = 0; k < count; k++)
    {
        // Markiere Felder die gelöscht werden können
        // Vergebe Punkte an Spieler
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

        //TODO STEINE MARKIEREnn
        // console.log("Markiere Stein : ["+array[startposition+k].x+' / '+array[startposition+k].y+']');
        // console.log(array[i-count]);
        // array[position+k].flaggedForDeletion = true;
        // array[position+k].setMarked();
        // console.log(array[i-count]);

    }




}

function spielfeldPruefen()
{
    // spielfeldAusgeben();

    // Reihen überprüfen
    for (var i = 0; i < cols; i++)
    {
        // console.log('Pruefe Reihe '+i);
        // console.log(spielfeld[i],true);
        pruefeReihe(spielfeld[i], true);
    }

    // Spalten überprüfen
    for (var i = 0; i < rows; i++)
    {
        // console.log('Pruefe Spalte '+i);
        // console.log(getSpalte(i),false);
        pruefeReihe(getSpalte(i), false);

    }
    // spielfeldAusgeben();
    spielfeldAktualisieren();
}

function spielfeldAuffuellen()
{
    // Pruefe ob die oberste Reihe 'leere' Felder hat
    // Falls ja, fülle diese
    for (var i = spielfeld.length - 1; i >= 0; i--) {

        if (spielfeld[0][i].flaggedForDeletion)
        {
            console.info('Leeres Feld gefunden. Fülle auf.')
            spielfeld[0][i] = new spielstein(0, i, getRandomInt(0, 8))
        }

    }
    ;



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

                    if(updateTime == 0){
                        //wenn Timer abläuft
                        $('#gameOver').modal('show');
                        $('#punkteStandBeiGameOver').text(sp.punkte);
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
        console.info(werte);
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
    if (!initialisiert)
    {

        // Bilder laden
        ladeBilder();

        // Spielfeld initialisieren
        spielfeldInitialisieren();

        // Auf 3 Prüfen
        // spielfeldPruefen();

        // Felder löschen
        // spielsteineEntfernen()

        // Neue Steine anfügen
        

        // Neuer Spieler "Default"
        spielerErstellen();
        // Starte Timer
        startTimer();


    }
    else
    {
        selektierterSpielstein = null;
        neuesSpielfeld();
        spielfeldAktualisieren();
        startTimer();
    }

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

    //Spielfeld löschen
    $('#spielcontainer').empty();



    // Spielfeld neu zeichnen
    spielfeldZeichnen();
}

// RNG (Random Number Generator) des Spiels
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funktion die aufgerufen wird sobald die Seite geladen wurde.
$(document).ready(function ()
{
    //starteSpiel();
});

//######################### Martins Block Start ############################//


function moveBlocks()
{
    // //Ausgegangen wird davon das Spielzug abgeschlossen ist und Steine zur Löschung markiert sind
    // console.info('Moving Blocks');
    // //Durchgang Reihe
    // for (var yi=rows-1;yi>=0;yi--)
    // {
    //     for(var xi=0;xi<cols;xi++)
    //     {
    //         if(spielfeld[xi][yi].flaggedForDeletion)
    //         {
    //             for(ny=yi+1;ny===0;ny--) //ny steht für neues Y also der Block der runterrutschen soll
    //             {
    //                  spielfeld[xi][ny-1].value = spielfeld[xi][ny].value;
    //             }
    //             spielfeld[0][yi].value = getRandomInt(0,anzahlSteine) //obere leere Felder kriegen neuen zuf. Wert zugeordnet
    //         }
    //     }
    // }

    //Temporäre testvars

    var zaehler = 0;
    var position;

    // Prüfe für jede Sppalte
    for(var x = getSpalte(0).length; x >= 0; x--)
    {
    	position = null;
        var current_spalte = getSpalte(x);
        for(var i = current_spalte.length; i>=0; i--){ 
        	if(i<current_spalte.length && current_spalte[i].flaggedForDeletion && current_spalte[i+1].flaggedForDeletion===false)
            {  //tritt ein wenn aktuelles feld leer ist und das Feld davor ein Block und es nicht die unterste Reihe ist
                position = current_spalte[i];
            }
            else if( i === current_spalte.length && current_spalte[i].flaggedForDeletion===true)
            {
            	position = current_spalte[i];
            }
             else if(current_spalte[i].flaggedForDeletion===false && position!=null)
            {
            	tausche(position,current_spalte[i]);
            }
		}
		for(var x = position; x>=0; x--)
		{
			current_spalte[x].value = getRandomInt(0,anzahlSteine);
		}
	}

}

function CheckMovePossible()
{
	//Ausgegangen wird davon das kein Spielstein für die Löschung markiert ist
	
	var count = 0; //Variable zählt mögliche Spielzüge
	//Durchgang Reihe
	for (var yi=0;i<cols;yi++)
	{
		for(var xi=0;i<rows;xi++)
		{
			for(pi=0;pi==4;pi++)
			{
				if(boolMovePossibilties(xi, yi, spielfeld[xi][yi].value, pi))
					{
						count++;
					}
			}
		}
	}
	if(count == 0)
	{
		console.log("Kein Spielzug möglich!");
	}
	else
	{
		console.log(count.toString()+" Spielzüge möglich");
	}
}

function boolMovePossibilties(x, y, value, intPosib)
{
	// TODO!!!! Überprüfung OutOfBoundException bei Randelementen!
	var boolPoss = false
	switch(intPosib){
		case 1 : // 2 nebeneinander horizontal
			if(spielfeld[x+1][y].value===value)
			{
				switch(true){
				case spielfeld[x+3][y].value===value: 
					boolPoss = true; 
					break;
				case spielfeld[x+2][y+1].value===value: 
					boolPoss = true; 
					break;
				case y-1>=0: 
					if(spielfeld[x+2][y-1].value===value)
						{
							boolPoss = true; 
						} 
						break; 
				case x-1>=0: 
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
						break;					}
			}
			break;
		case 2 : //2 m Lücke vertikel
			if(spielfeld[x+2][y].value===value)
			{
				switch(true){
				case spielfeld[x+1][y+1].value===value: 
					boolPoss = true; 
					break;
				case y-1>=0: 
					if(spielfeld[x+1][y-1].value===value)
						{
							boolPoss = true; 
						} 
						break;
			}
		}
		break;
		case 3 : //2 nebeneinander vertikal
			if(spielfeld[x][y+1].value===value)
			{
				switch(true){
				case spielfeld[x][y+2].value===value: 
					boolPoss = true; 
					break;
				case spielfeld[x+2][y+1].value===value: 
					boolPoss = true; 
					break;
				case y-1>=0: 
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
		case 4 : //2 m Lücke horizontal
			if(spielfeld[x][y+2].value===value)
			{
				switch(true){
				case spielfeld[x+1][y+1].value===value: 
				boolPoss = true; 
				break;
				case x-1>=0: 
				if(spielfeld[x-1][y+1].value===value)
				 {
				 	boolPoss = true; 
				 } 
				 break;
			}
			}
			break;
	}
	return boolPoss;
}

//######################### Martins Block Ende ############################//


//######################### Olivers Block Start ############################//

// Neuer Spieler
function neuerSpieler() {
    $(document).ready(function() {
        $('#neuerSpieler').modal('show');
    });
};

function spielerErstellen() {           
    sp = new spieler("Gast", 0);
    if($('#nameSpielerInput').val() != undefined)
    {
        sp.name = $('#nameSpielerInput').val();
    }
    console.log(sp);
    $('#spielerName').text(sp.name);
    $('#spielerPunkte').text(sp.punkte);
    console.log(sp.punkte);
    $('#neuerSpieler').modal('hide');
}

//######################### Olivers Block Ende ############################//


//######################### Volkans Block Start ############################//

function punkteBerechnung(count) {
    var wert = (count * 100) / (2 / count)
    sp.punkte += wert;
    var test = sp.punkte;
    //html highscore updaten 
    $(document).ready(function ()
    {
        $("#spielerPunkte").text(test);
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

// Die Spiel Schleife des Spiels
function GameLoop()
{
    // Spielfeld erstellen

    // Spielfeld zeichnen

    // Spielfeld auf '3' prüfen

    // Felder löschen

    // Spielzug möglich ?


}