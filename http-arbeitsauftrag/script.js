let url = 'https://swapi.co/api/people/';
fetch(url, then(response => {
	if (response.status !== 200) {
		console.log('Looks like there was a problem. Status Code: '+response.status);
		return;
	}
	response.json().then(function(data) {
		// do something
	});
});


function createCard(name, birth_year){
	var col = document.createElement("div");
	var card = document.createElement("div");
	var body = document.createElement("div");
	
	col.className = "col-sm-4";
	card.className = "card";
	body.className = "card-body";

	
	var cardTitle = document.createElement("H4");
	var cardSubtitle = document.createElement("H4");
	var cardButton = document.createElement("button");
	

	var title = document.createTextNode(name);
	var subtitle = document.createTextNode(birth_year);
	var button = document.createTextNode("Heimat anzeigen");
	button.addEventListener("click", showHomeWorld);

	cardTitle.className = "card-title";
	cardSubtitle.className = "card-subtitle mb-2 text-muted";
	cardButton.className = "btn btn-dark";


	cardTitle.appendChild(title);
	cardSubtitle.appendChild(subtitle);
	cardButton.appendChild(button);

	body.appendChild(cardTitle);
	body.appendChild(cardSubtitle);
	body.appendChild(cardButton);
	card.appendChild(body);
	col.appendChild(card);

	document.getElementById('people').appendChild(col);
}

function showHomeWorld(homeworld){
	var textFeld = document.createElement("div");
}

