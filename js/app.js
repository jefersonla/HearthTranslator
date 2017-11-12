/**
 *
 * HearthTranslator
 * By Jeferson Lima
 *
 */

function makeRequest (method, url, done) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	
	xhr.onload = function () {
		done(null, xhr.response);
	};

	xhr.onerror = function () {
		done(xhr.response);
	};

	xhr.send();
}

var entrada = document.getElementById("name");
var saida = document.getElementById("saida");

function procuraNome(){
	saida.textContent = "";

	if(entrada.value === ""){
		return;
	}

	console.log("procurando carta " + entrada.value);

	var j = 0;

	for(var i = 0; i < cardsPtBR.length; i++){
		var carta = cardsPtBR[i];
		if(j <= 100 &&
			carta.name !== undefined &&
			carta.name.toLocaleLowerCase().latinize().indexOf(entrada.value.toLocaleLowerCase().latinize()) !== -1)
		{
			saida.textContent += idCartas[carta.id].name + "\n";
			j++;
		}
	}
}

var idCartas = [];

makeRequest('GET', 'https://api.hearthstonejson.com/v1/18336/enUS/cards.json', function (err, datums) {
	if (err) {
		throw err;
	}

	console.log(datums);
	window.cardsEnUS = JSON.parse(datums);

	for(var i = 0; i < cardsEnUS.length; i++){
		var card = cardsEnUS[i];
		idCartas[card.id] = card;
	}

});


makeRequest('GET', 'https://api.hearthstonejson.com/v1/18336/ptBR/cards.json', function (err, datums) {
	if (err) {
		throw err;
	}

	console.log(datums);
	window.cardsPtBR = JSON.parse(datums);
});