// Hier schreiben wir unser Spiel


// Platz für Variablen

// Der Spielfeld Array
spielfeld = [];

// Der Bilder Array der Werte auf Spielsteine abbildet
var spielsteine = [];


	// Anzahl Reihen 
	var rows = 8;

	// Anzahl Spalten
	var cols = 12;

	var initialisiert = false;

	var gameReady = false;

	var selektierterSpielstein;


// Das Spielstein Objekt

function spielstein(x,y,value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.selected = false;
    this.flaggedForDeletion = false;
    this.mydiv;

    this.select = function()
{
	
	console.warn(x+'/'+y);
	//console.info(mydiv);
	// console.info('Meine Spalte : '+getSpalte(y));
	// console.info('Meine Reihe : '+spielfeld[x]);
	// pruefeReihe(spielfeld[x]);
	// pruefeReihe(getSpalte(y));
	//Prüfen ob bereits ein Stein selektiert ist
	if(selektierterSpielstein)
	{
		// Fall bereits ein Stein selektiert
		console.info('Selektierter Stein ist : '+selektierterSpielstein.x+' / '+selektierterSpielstein.y);
		console.info('Stein zum tauschen ist : '+x+' / '+y);

		if(selektierterSpielstein === spielfeld[x][y])
		{
			console.log('Gleichen  Stein ausgewählt.');
		}
		tausche(selektierterSpielstein, spielfeld[x][y]);
		spielfeldAktualisieren();

	}
	else
	{
		// Bisher kein Stein selektiert, selektiere Stein.
		console.info('Selektierter Stein ist : '+x+'/'+y);
		selektierterSpielstein = spielfeld[x][y];
	}
	spielfeldAusgeben();

	
}

	this.setMarked = function()
	{
		console.log(this.mydiv);
		this.mydiv.setAttribute('class','spielstein markiert');
		console.log(this.mydiv);
	}
    
    //Beispiel Methode
    //this.name = function() {return this.firstName + " " + this.lastName;};
}



// Platz für Methoden

function spielfeldInitialisieren()
{

		console.info("Erstelle Spielfeld");
		neuesSpielfeld();
		spielfeldZeichnen();
		console.log("Spielfeld erfolgreich erstellt.");
		initialisiert = true;
}

function tausche(spielstein1, spielstein2)
{
	spielfeld[spielstein1.x][spielstein1.y] = spielstein2;
	spielfeld[spielstein2.x][spielstein2.y] = spielstein1;
	selektierterSpielstein = null;
	



}

function spielfeldZeichnen()
{
	// Erstelle Spielfeld mithilfe jQuery
	// Durchlaufe jedes Element im Spielfeld Array 
	
	for(var k=0,l=spielfeld.length;k<l;k++)
	{

		// Erstelle Reihe

		var row = $('<div/>', {
					id: "row."+k,
					class: "row"
				}).appendTo("#spielcontainer");


		for(var m=0,n=spielfeld[k].length;m<n;m++)
			{


				var div = document.createElement('div');
				div.setAttribute('class','spielstein');
				div.setAttribute('id',k+'.d.'+m);


				spielfeld[k][m].mydiv = div; 
				$(div).appendTo(row);

				// console.info(spielfeld[k][m].mydiv);
				
				$(div).on("click",spielfeld[k][m].select);

				// Farbe des Steins ermittlen und Bild anfügen
				var farbe = spielsteine[spielfeld[k][m].value];
				if(spielfeld[k][m].flaggedForDeletion)
				{	
					console.info('Stein gelöscht');
					farbe = null;
				}

				var image = $('<img/>',{
					src:  farbe,
					id: k+'.i.'+m,
					width : "32px",
					height : "32px"
				}).appendTo(div);



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




// Methode pruefeReihe nimmt einen Array von Werten entgegen und sucht nach folgen > 3 mit gleichen Wert
function pruefeReihe(array)
{
	// Variable die den Wert des zuletzt besuchten Feldes speichert
	var saved;
	// Zählvariable
	var count = 1;

	//arrayAusgeben(array);
	// Prüfe für alle Felder im Array
	for (var i = 0, len = array.length; i < len; i++) {
		
		// Falls kein Feld besucht wurde, setze Feld auf aktuelles Feld und gehe eins weiter
		if(saved === undefined)
		{
			saved = array[i];
		}
		//Falls bereits ein Feld besucht wurde, vergleiche aktuelles mit gespeichertem Feld
		else
		{
			//Prüfe Werte der beiden Felder auf Gleichheit
			if(saved.value === array[i].value)
			{
				// Feld ist gleich, erhöhe Zählvariable
				count++;
			}
			//Felder sind nicht gleich
			else
			{
				// Überprüfe ob mehr als 3 Felder hintereinander gefunden wurden
				if(count >= 3)
				{
					// Mehr als drei Felder gleicher Farbe hintereinander wurden gefunden
					// Durchlaufe alle Felder und setze diese auf destroyable
					// i ist position im array / i-count ist erster Block der Reihe


					// Anhand der Zählvariable Größe der Folge finden und Punkte vergeben

					while(count > 0)
					{
						// Markiere Felder die gelöscht werden können
						// Vergebe Punkte an Spieler

						//TODO STEINE MARKIEREnn
						console.log("Markiere Stein : ["+array[i-count].x+' / '+array[i-count].y+']');
						console.log(array[i-count]);
						array[i-count].flaggedForDeletion = true;
						array[i-count].setMarked();
						console.log(array[i-count]);
						count--;
					}
					


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

function spielfeldPruefen()
{
	spielfeldAusgeben();

	// Spalten überprüfen
	for(var i = 0; i < cols ; i++)
	{
		pruefeReihe(spielfeld[i]);
	}

	// Reihen überprüfen
	for(var i = 0; i< rows ;i++)
	{
		pruefeReihe(getSpalte(i));

	}
	spielfeldAusgeben();
	spielfeldAktualisieren();
}

function spielfeldAuffuellen()
{
	// Pruefe ob die oberste Reihe 'leere' Felder hat
	// Falls ja, fülle diese
	for (var i = spielfeld.length - 1; i >= 0; i--) {
		
		if(spielfeld[0][i].flaggedForDeletion)
		{
			console.info('Leeres Feld gefunden. Fülle auf.')
			spielfeld[0][i] = new spielstein(0,i,getRandomInt(0,8))
		}

	};



}

function arrayAusgeben(array)
{
	if(array != undefined){
		var werte = [];
		for(var i = 0;i<array.length;i++)
		{
			werte.push( array[i].value);
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
	var reihenArray = [];
	for(var i = 0;i<spielfeld.length;i++)
	{
		reihenArray.push(spielfeld[i][y]);
	}
	return reihenArray;

}

// Funktion die den spielfeld array , Menschen leserlich auf der Console ausgibt.
function spielfeldAusgeben()
{
	console.info('#######FELD-START#######');

	//Für Anzahl Spalten
	for(var i=0;i<cols;i++)
	{
		var reihe = '|';
		// Für Anzahl Reihen
		for(var j=0;j<rows;j++)
		{
			// Gib ein *X* als gelöscht aus
			if(spielfeld[i][j].flaggedForDeletion)
			{
				reihe += '[X]';
			}
			else{
			// Gib den Feldwert auf der Konsole aus
			reihe += '['+spielfeld[i][j].value+']';
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

	for(var i=0;i<9;i++)
	{
		spielsteine.push("img/steine/"+i+".png");
	}
	console.log(spielsteine);
	console.log("Bilder erfolgreich geladen.");
}

// Funktion die den Spielstart realisiert
function starteSpiel()
{
	if(!initialisiert)
	{

	// Bilder laden
	ladeBilder();	

	// Spielfeld initialisieren
	spielfeldInitialisieren();

	// Auf 3 Prüfen
	spielfeldPruefen();
	
	// Felder löschen
	// spielsteineEntfernen()

	// Neue Steine anfügen


	}
	else
	{
		neuesSpielfeld();
		spielfeldAktualisieren();
	}

}

// Funktion die ein neues Spielfeld per RNG generiert.
function neuesSpielfeld()
{
	// spielfeldAusgeben();
	//Für Anzahl Spalten
	for(var i=0;i<cols;i++)
	{
		row = [];
		// Für Anzahl Reihen
		for(var j=0;j<rows;j++)
		{
			// Fülle Reihen-Array mit Spielsteinen zufälligen Werten
			row.push(new spielstein(i,j,getRandomInt(0,8)));
		}

		// Füge Reihen-Array zum Spalten-Array hinzu
		spielfeld[i] = row;
	}
	console.info('Neues Spielfeld generiert.');
	// spielfeldAusgeben();
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
$(document).ready(function()
	{
		starteSpiel();
	});

// Die Spiel Schleife des Spiels
function GameLoop()
{
	// Spielfeld erstellen

	// Spielfeld zeichnen

	// Spielfeld auf '3' prüfen

	// Felder löschen

	// Spielzug möglich ?


}