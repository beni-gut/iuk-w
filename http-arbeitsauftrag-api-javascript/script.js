
function loadDataSWAPI() {
	let url = 'https://swapi.co/api/people/';

	fetch(url, {method: "GET"})
	.then(function(response){
		if (response.status !== 200) {
			console.log("Looks like there was a problem. Status Code: " + response.status);
			return;
		}

		response.json().then(function(data) {
			console.log(data);
			var people = data.results;
			for (var i = 0; i < people.length; i++) {
				createCard(people[i]);
			}
		});
	});
}


function createCard(people){
	let col = document.createElement("div");
	col.className = "col-sm";

	let card = document.createElement("div");
	card.className = "card";

	let body = document.createElement("div");	
	body.className = "card-body";


	let cardTitle = document.createElement("H4");
	cardTitle.className = "card-title";
	let title = document.createTextNode(people.name);
	cardTitle.appendChild(title);
	
	let cardSubtitle = document.createElement("H4");
	cardSubtitle.className = "card-subtitle mb-2 text-muted";
	let subtitle = document.createTextNode(people.birth_year);
	cardSubtitle.appendChild(subtitle);


	let showHomeworldButton = document.createElement("button");
	showHomeworldButton.className = "btn btn-dark";
	showHomeworldButton.appendChild(document.createTextNode("Heimat anzeigen"));
	showHomeworldButton.addEventListener("click", function(event) {
		showHomeworldButton.style.display = "none";
		loadHomeWorld(people.homeworld, cardText);
	});


	let cardText = document.createElement("p");
	cardText.className = "card-text";
	cardText.style.display = "none";


	body.appendChild(cardTitle);
	body.appendChild(cardSubtitle);
	body.appendChild(showHomeworldButton);
	body.appendChild(cardText);

	card.appendChild(body);
	col.appendChild(card);

	document.getElementById('people').appendChild(col);
}


function loadHomeWorld(urlHomeWorld, element){
	fetch(urlHomeWorld, {method: "GET"})
	.then(function(response){
		response.json().then(function(homeworld) {
			console.log(homeworld)
			element.style.display = "initial";
			element.appendChild(document.createTextNode("Heimat: " + homeworld.name));
		})
	})
}


loadDataSWAPI();

