function loadPeople() {
  let client = new XMLHttpRequest();
  let method = 'GET';
  let url = "https://swapi.co/api/people";

  client.onload = function() {
    if(this.status == 200 && this.responseText != null) {
      let jsonResponse = JSON.parse(this.responseText);
      let characters = jsonResponse.results;
      characters.forEach(function(character) {
        let card = createCard(character);              
        document.getElementById("people").appendChild(card);     
      });     
    }
  }
  client.open(method, url);
  client.send();    
}

function createCard(character) {
  let id = character.url.match(/\d+/g)[0];
  let card = $('<div class="col-sm"><div class="card" style="width: 20rem;"><div class="card-body"><h4 class="card-title">'+character.name+'</h4><h6 class="card-subtitle mb-2 text-muted">'+character.birth_year+'</h6><p class="card-text">...</p><a data-toggle="collapse" id="collapseHomeworldLink'+id+'" href="#collapseHomeworld'+id+'" aria-expanded="false" aria-controls="collapseHomeworld'+id+'" class="card-link">Homeworld</a><div class="collapse" id="collapseHomeworld'+id+'"></div></div></div>')

  let colSmDiv = document.createElement("div");
  colSmDiv.className = "col-sm";

  let cardDiv = document.createElement("div");
  cardDiv.className = "card";

  let cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body";

  let title = document.createElement("h4");
  title.className = "card-title";  
  title.appendChild(document.createTextNode(character.name));      

  let subTitle = document.createElement("h4");
  subTitle.className = "card-subtitle mb-2 text-muted";  
  subTitle.appendChild(document.createTextNode(character.birth_year));      

  let showHomeworldButton = document.createElement("button");
  showHomeworldButton.className = "btn btn-dark";  
  showHomeworldButton.appendChild(document.createTextNode("Heimat anzeigen"));        
  showHomeworldButton.addEventListener("click", function(event) {
    showHomeworldButton.style.display = "none";
    loadHomeWorld(character.homeworld, cardText);        
  });

  let cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.style.display = "none"       

  colSmDiv.appendChild(cardDiv);
  cardDiv.appendChild(cardBodyDiv);
  cardBodyDiv.appendChild(title);
  cardBodyDiv.appendChild(subTitle);         
  cardBodyDiv.appendChild(showHomeworldButton);
  cardBodyDiv.appendChild(cardText);  
  return colSmDiv;
}

function loadHomeWorld(url, element) {
  let client = new XMLHttpRequest();
  let method = 'GET';

  client.onload = function() {
    if(this.status == 200 && this.responseText != null) {
      let jsonResponse = JSON.parse(this.responseText);
      let homeworld = jsonResponse.name;
      element.style.display = "initial";
      element.appendChild(document.createTextNode("Heimat: "+homeworld));                
    }
  }
  client.open(method, url);
  client.send();   
}

loadPeople();