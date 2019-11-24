var form = document.getElementById("inlineFormInputGroup");
form.addEventListener("change", buttonFreischalten);

var button = document.getElementById("loginbutton");

function buttonFreischalten() {
	if (form.value.length >= 3) {
		button.disabled = false;
	} else {
		button.disabled = true;
	}
};

function weiterleitenPartner() {
	window.location.href = "list.html";
}

function weiterleitenChat() {
	window.location.href = "chat.html";
}

function mitteilungSenden() {
	var mitteilung = document.getElementById('mitteilungsFeld').value;
	var emoticons = ['face', 'code', 'home'];

	for (var i = 0; i < emoticons.length; i++) {
		mitteilung = mitteilung.replace(emoticons[i], '<span class="icon">' + emoticons[i] + '</span>');
	}

	var neueZeile = document.createElement("tr");
	var neuesFeld = document.createElement("td");

	neuesFeld.innerHTML = mitteilung;
	neueZeile.appendChild(neuesFeld);

	document.getElementById('chatVerlauf').appendChild(neueZeile);


	document.getElementById('mitteilungsFeld').value = "";
}

function textHinzufuegen() {
	var mitteilung = "Icons überall home face code";
	var emoticons = ['face', 'code', 'home'];

	for (var i = 0; i < emoticons.length; i++) {
		mitteilung = mitteilung.replace(emoticons[i], '<span class="icon">' + emoticons[i] + '</span>');
	}

	var neueZeile = document.createElement("tr");
	var neuesFeld = document.createElement("td");

	neuesFeld.innerHTML = mitteilung;
	neueZeile.appendChild(neuesFeld);

	document.getElementById('chatVerlauf').appendChild(neueZeile);
	
}

