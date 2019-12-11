
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
	//Creating Cards
	let col = document.createElement("div");
	col.className = "col-sm";

	let card = document.createElement("div");
	card.className = "card";

	let body = document.createElement("div");	
	body.className = "card-body";

	//Name
	let cardTitle = document.createElement("H4");
	cardTitle.className = "card-title";
	let title = document.createTextNode(people.name);
	cardTitle.appendChild(title);
	
	//Year of birth
	let cardSubtitle = document.createElement("H4");
	cardSubtitle.className = "card-subtitle mb-2 text-muted";
	let subtitle = document.createTextNode(people.birth_year);
	cardSubtitle.appendChild(subtitle);

	//Homeworld Button
	let showHomeworldButton = document.createElement("button");
	showHomeworldButton.className = "btn btn-dark";
	showHomeworldButton.appendChild(document.createTextNode("Heimat anzeigen"));
	showHomeworldButton.addEventListener("click", function(event) {
		showHomeworldButton.style.display = "none";
		loadHomeWorld(people.homeworld, cardTextHomeWorld);
	});

	let cardTextHomeWorld = document.createElement("p");
	cardTextHomeWorld.className = "card-text";
	cardTextHomeWorld.style.display = "none";

	//Attribute Button
	let showAttrButton = document.createElement("button");
	showAttrButton.className = "btn btn-dark";
	showAttrButton.appendChild(document.createTextNode("Weitere Attribute anzeigen"));
	showAttrButton.addEventListener("click", function(event) {
		showAttrButton.style.display = "none";
		loadAttributes(people, cardTextAttr);
	});

	let cardTextAttr = document.createElement("p");
	cardTextAttr.className = "card-text";
	cardTextAttr.style.display = "none";

	//Movie Button
	let showFilmsButton = document.createElement("button");
	showFilmsButton.className = "btn btn-dark";
	showFilmsButton.appendChild(document.createTextNode("Film Liste"));
	showFilmsButton.addEventListener("click", function(event) {
		showFilmsButton.style.display = "none";
		loadFilms(people.films, cardTextFilms);
	});

	let cardTextFilms = document.createElement("p");
	cardTextFilms.className = "card-text";
	cardTextFilms.style.display = "none";


	//Starships Button
	let showStarShipsButton = document.createElement("button");
	showStarShipsButton.className = "btn btn-dark";
	showStarShipsButton.appendChild(document.createTextNode("Raumschiffe"));
	showStarShipsButton.addEventListener("click", function(event) {
		showStarShipsButton.style.display = "none";
		loadStarships(people.starships, cardTextStarships);
	});

	let cardTextStarships = document.createElement("p");
	cardTextStarships.className = "card-text";
	cardTextStarships.style.display = "none";

	//Vehicles Button
	let showVehiclesButton = document.createElement("button");
	showVehiclesButton.className = "btn btn-dark";
	showVehiclesButton.appendChild(document.createTextNode("Fahrzeuge"));
	showVehiclesButton.addEventListener("click", function(event) {
		showVehiclesButton.style.display = "none";
		loadStarships(people.vehicles, cardTextVehicles);
	});

	let cardTextVehicles = document.createElement("p");
	cardTextVehicles.className = "card-text";
	cardTextVehicles.style.display = "none";



	//Append everything to Cards
	body.appendChild(cardTitle);
	body.appendChild(cardSubtitle);
	//Attributes
	body.appendChild(showAttrButton);
	body.appendChild(cardTextAttr);
	body.appendChild(document.createElement("br"));
	//Homeworld
	body.appendChild(showHomeworldButton);
	body.appendChild(cardTextHomeWorld);
	body.appendChild(document.createElement("br"));
	//Movies
	body.appendChild(showFilmsButton);
	body.appendChild(cardTextFilms);
	body.appendChild(document.createElement("br"));
	//Starships
	body.appendChild(showStarShipsButton);
	body.appendChild(cardTextStarships);
	body.appendChild(document.createElement("br"));
	//Vehicles
	body.appendChild(showVehiclesButton);
	body.appendChild(cardTextVehicles);

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
			element.appendChild(document.createElement("br"));
		})
	})
}

function loadAttributes(people, element){
	console.log(people)
	element.style.display = "initial";
	element.appendChild(document.createTextNode("Gr\u00F6sse: " + people.height));
	element.appendChild(document.createElement("br"));
	element.appendChild(document.createTextNode("Augenfarbe: " + people.eye_color));
	element.appendChild(document.createElement("br"));
}

function loadFilms(arrFilms, element){
	element.style.display = "initial";

	let titel = document.createElement("h1");
	titel.className ="smolTitles";
	titel.innerHTML = "Der Charakter hat in folgenden Filmen mitgespielt: ";
	element.appendChild(titel);
	let filmListe = document.createElement("ul");

	console.log(arrFilms);

	for (var i = 0; i < arrFilms.length; i++) {
		fetch(arrFilms[i], {method: "GET"})
		.then(function(response){
			response.json().then(function(films) {
				console.log(films);
				let listenElement = document.createElement("li");
				//ist ungeordnet
				listenElement.innerHTML = "&quot;" + films.title + "&quot;" + " Episode: " + films.episode_id;
				filmListe.appendChild(listenElement);
			})
		})
	}

	element.appendChild(filmListe);
	element.appendChild(document.createElement("br"));
}


function loadStarships(arrStarships, element){
	element.style.display = "initial";

	let titel = document.createElement("h1");
	titel.className ="smolTitles";

	if (arrStarships.length === 0) {
		titel.innerHTML = "Der Charakter hat keine Raumschiffe gesteuert.";
		element.appendChild(titel);
		return;
	}

	titel.innerHTML = "Der Charakter hat die folgenden Raumschiffe gesteuert: ";
	element.appendChild(titel);
	let raumschiffListe = document.createElement("ul");

	console.log(arrStarships);

	for (var i = 0; i < arrStarships.length; i++) {
		fetch(arrStarships[i], {method: "GET"})
		.then(function(response){
			response.json().then(function(starships) {
				console.log(starships);
				let listenElement = document.createElement("li");
				listenElement.innerHTML = starships.name;
				raumschiffListe.appendChild(listenElement);
			})
		})
	}

	element.appendChild(raumschiffListe);
	element.appendChild(document.createElement("br"));
}


function loadVehicles(arrVehicles, element){
	element.style.display = "initial";

	let titel = document.createElement("h1");
	titel.className ="smolTitles";

	if (arrVehicles.length === 0) {
		titel.innerHTML = "Der Charakter hat keine Fahrzeuge gesteuert.";
		element.appendChild(titel);
		return;
	}

	titel.innerHTML = "Der Charakter hat die folgenden Fahrzeuge gesteuert: ";
	element.appendChild(titel);
	let fahrzeugListe = document.createElement("ul");

	console.log(arrVehicles);

	for (var i = 0; i < arrVehicles.length; i++) {
		fetch(arrVehicles[i], {method: "GET"})
		.then(function(response){
			response.json().then(function(vehicles) {
				console.log(vehicles);
				let listenElement = document.createElement("li");
				listenElement.innerHTML = vehicles.name;
				fahrzeugListe.appendChild(listenElement);
			})
		})
	}

	element.appendChild(fahrzeugListe);
	element.appendChild(document.createElement("br"));
}




loadDataSWAPI();

