// Hier schreiben wir unser Spiel


// Platz für Variablen

// Der Spielfeld Array
var spielfeld = [];

// Der Bilder Array der Werte auf Spielsteine abbildet
var spielsteine = [];

var scale = 32;



// Platz für Methoden

function spielfeldInitialisieren()
{

	console.info("Erstelle Spielfeld");

	// Anzahl Reihen 
	var rows = 8;

	// Anzahl Spalten
	var cols = 12;

	//Für Anzahl Spalten
	for(var i=0;i<cols;i++)
	{
		row = [];
		// Für Anzahl Reihen
		for(var j=0;j<rows;j++)
		{
			// Fülle Reihen-Array mit zufälligen Werten
			row.push(getRandomInt(0,8));
		}

		// Füge Reihen-Array zum Spalten-Array hinzu
		spielfeld[i] = row;
	}


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
				container = "#reihe"+k;
				console.log(container);

				var div = $('<div/>', {
					id: k+"."+m,
					class:"spielstein",
					onclick: 'sayHello('+k+','+m+')',
					width : scale,
					height : scale,
					x : k * scale,
					y : m * scale
				}).appendTo(row);

				var image = $('<img/>',{
					src: spielsteine[spielfeld[k][m]] ,
					width : "32px",
					height : "32px"
				}).appendTo(div);



				console.log('#'+k+'.'+m);
				//$(container).append( $("<div class='spielstein'><img id='stein."+k+"."+m+"' width='32px' height='32px' src='"+spielsteine[spielfeld[k][m]]+"' /></div>"));
				
				// Eher unnötig


				// $(".spielstein").draggable(
				// 	{
				// 		containment: "#spielcontainer"
				// 	});
				// $(".spielstein").droppable();
			} 
	}



	console.log("Spielfeld erfolgreich erstellt.");

}

function sayHello(x,y)
{
	console.warn(x+'/'+y);
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
	ladeBilder();
	spielfeldInitialisieren();

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




$(document).ready(function()
	{
		starteSpiel();
	});