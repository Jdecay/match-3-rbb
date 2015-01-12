// Hier schreiben wir unser Spiel





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

	console.log(this.spielstein.flaggedForDeletion);

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
		selektierterSpielstein.mydiv.setAttribute('class','spielstein selektiert');
	}
	spielfeldAusgeben();

	
}

	this.setMarked = function()
	{
		// console.log(this.mydiv);
		this.mydiv.setAttribute('class','spielstein markiert');
		// console.log(this.mydiv);
	}

	this.toString = function()
	{
		return '['+x+','+y+']';
	}

	    
    //Beispiel Methode
    //this.name = function() {return this.firstName + " " + this.lastName;};
}


// Platz für Variablen

// Der Spielfeld Array
spielfeld = [];

// Der Bilder Array der Werte auf Spielsteine abbildet
var spielsteine = [];

	var anzahlSteine = 8;
	
	// Anzahl Reihen 
	var rows = 16;

	// Anzahl Spalten
	var cols = 16;

	var initialisiert = false;

	var gameReady = false;

	var selektierterSpielstein;

	var leeresBild = 'img/spielfeld/background.png';



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
	console.info("Tausche Stein "+spielfeld[spielstein1.x][spielstein1.y].toString()+" mit Stein "+spielfeld[spielstein2.x][spielstein2.y].toString());
	// console.info(spielfeld[spielstein1.x][spielstein1.y]);
	// console.info(spielfeld[spielstein2.x][spielstein2.y]);

console.info(spielfeld[spielstein1.x][spielstein1.y].toString());
	console.info(spielfeld[spielstein2.x][spielstein2.y].toString());
	console.warn('getauscht');
	// Erstlle Kopie von Spielstein 1 
	var copy = new spielstein(spielstein1.x,spielstein1.y,spielstein1.value);

	// Tausche Spielstein 1 mit Spielstein 2
	spielfeld[spielstein1.x][spielstein1.y] = new spielstein(spielstein1.x,spielstein1.y,spielstein2.value);

	// Ersetze Spielstein
	spielfeld[spielstein2.x][spielstein2.y] = new spielstein(spielstein2.x,spielstein2.y,spielstein1.value);



	// console.info(spielfeld[spielstein1.x][spielstein1.y].toString());
	// console.info(spielfeld[spielstein2.x][spielstein2.y].toString());
	

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

				if(spielfeld[k][m].flaggedForDeletion === true)
				{
					div.setAttribute('class','spielstein markiert');
				}
				else
				{
					div.setAttribute('class','spielstein');

				}
				div.setAttribute('id',k+'.d.'+m);
				div.spielstein = spielfeld[k][m];

				spielfeld[k][m].mydiv = div; 
				$(div).appendTo(row);

				// console.info(spielfeld[k][m].mydiv);
				
				$(div).on("click",spielfeld[k][m].select);

				// Farbe des Steins ermittlen und Bild anfügen
				var farbe = spielsteine[spielfeld[k][m].value];
				if(spielfeld[k][m].flaggedForDeletion)
				{	
					console.info('Stein gelöscht');
					farbe = leeresBild;
				}

				var image = document.createElement('img');
			
				image.setAttribute('src',farbe);
			
				
				image.setAttribute('id',k+'.i.'+m);
				image.setAttribute('title','[X : '+spielfeld[k][m].x+', Y : '+spielfeld[k][m].y+' ] Value :'+spielfeld[k][m].value);

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
function pruefeReihe(array)
{
	// Variable die den Wert des zuletzt besuchten Feldes speichert
	var saved = undefined;

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
				console.info('Feld'+saved.toString()+ ' und '+array[i].toString()+' sind gleich');
				
				// Pruefe ob letztes Element des arrays
				if(i+1 === len)
				{
					if(count > 3)
					{
						console.log('3 oder mehr gefunden.');
					}

					var position = array.indexOf(saved);
					for(var k = 0; k < count;k++)
					{
						// Markiere Felder die gelöscht werden können
						// Vergebe Punkte an Spieler

						//TODO STEINE MARKIEREnn
						console.log('Das Objekt an Stelle : '+ (position+k));
						console.log(array[position+k]);
						console.log("Markiere Stein : ["+array[position+k].x+' / '+array[position+k].y+']');
						// console.log(array[i-count]);
						array[position+k].flaggedForDeletion = true;
						array[position+k].setMarked();
						// console.log(array[i-count]);
						
					}

				}
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

					if(count > 3)
					{
						console.log('3 oder mehr gefunden.');
					}

					var position = array.indexOf(saved);
					for(var k = 0; k < count;k++)
					{
						// Markiere Felder die gelöscht werden können
						// Vergebe Punkte an Spieler

						//TODO STEINE MARKIEREnn
						console.log("Markiere Stein : ["+array[position+k].x+' / '+array[position+k].y+']');
						// console.log(array[i-count]);
						array[position+k].flaggedForDeletion = true;
						array[position+k].setMarked();
						// console.log(array[i-count]);
						
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

	// Reihen überprüfen
	for(var i = 0; i < cols ; i++)
	{
		console.log('Pruefe Reihe '+i);
		console.log(spielfeld[i]);
		pruefeReihe(spielfeld[i]);
	}

	// Spalten überprüfen
	for(var i = 0; i< rows ;i++)
	{
		console.log('Pruefe Spalte '+i);
		console.log(getSpalte(i));
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
	var spalte = [];
	for(var i = 0;i<spielfeld.length;i++)
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
			reihe += '['+spielfeld[i][j].value+'('+spielfeld[i][j].x+','+spielfeld[i][j].y+')('+spielfeld[i][j].flaggedForDeletion+')]';
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
	// spielfeldPruefen();
	
	// Felder löschen
	// spielsteineEntfernen()

	// Neue Steine anfügen


	}
	else
	{
		selektierterSpielstein = null;
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
			row.push(new spielstein(i,j,getRandomInt(0,anzahlSteine)));
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