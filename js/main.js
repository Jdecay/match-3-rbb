// Hier schreiben wir unser Spiel


// Platz für Variablen

// Der Spielfeld Array
spielfeld = [];

// Der Bilder Array der Werte auf Spielsteine abbildet
var spielsteine = [];

var scale = 32;

	// Anzahl Reihen 
	var rows = 8;

	// Anzahl Spalten
	var cols = 12;

	var initialisiert = false;


// Das Spielstein Objekt

function spielstein(x,y,value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.flaggedForDeletion = false;
    this.mydiv;

    this.sayHello = function()
{
	
	console.warn(x+'/'+y);
	//console.info(mydiv);
	pruefeReihe(spielfeld[x]);
	pruefeReihe(getReihe(y));
	
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
				
				$(div).on("click",spielfeld[k][m].sayHello);

				

				var image = $('<img/>',{
					src: spielsteine[spielfeld[k][m].value] ,
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
	// spielfeldAusgeben()
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
	// spielfeldAusgeben()
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
		pruefeReihe(getReihe(i));

	}
	spielfeldAusgeben();
}

function arrayAusgeben(array)
{
	if(array != undefined){
		var werte = [];
		for(var i = 0;i<array.length;i++)
		{
			werte.push( array[i].value+" / "+  array[i].flaggedForDeletion);
		}
		console.info(werte);
	}
	else
	{
		console.info('Array is undefined');
	}
}

function getReihe(y)
{
	var reihenArray = [];
	for(var i = 0;i<spielfeld.length;i++)
	{
		reihenArray.push(spielfeld[i][y]);
	}
	return reihenArray;

}

function spielfeldAusgeben()
{
	//Für Anzahl Spalten
	for(var i=0;i<cols;i++)
	{
		var reihe = '|';
		// Für Anzahl Reihen
		for(var j=0;j<rows;j++)
		{
			// Gib ein *X* als gelöscht aus
			if(spielfeld[i][j].flaggedForDeletion === true)
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

	console.info('####################');

}

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

function starteSpiel()
{
	if(!initialisiert)
	{
	ladeBilder();	
	spielfeldInitialisieren();
	

	}
	else
	{
		neuesSpielfeld();
		spielfeldAktualisieren();
	}

}


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


function spielfeldAktualisieren()
{
	//Spielfeld löschen
	$('#spielcontainer').empty();

	spielfeldZeichnen();

	
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




$(document).ready(function()
	{
		starteSpiel();
	});