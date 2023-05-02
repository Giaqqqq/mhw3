//non sicuro
const clientId = '62dff88510094fa4b4eede9a97457a47';
const clientSecret='740f88ff1e7b4f5fad4e3b6344c8b17f';
const playlistId = '13g8N0hgcBhyO0ceKW7OES';


const griglia=document.querySelector('#contenuti');
const intestazione=document.querySelector('#intestazione');
let isLoading=false;
let token;
excuse();

const boxes = document.querySelectorAll('span');
for (const box of boxes)
{
  box.addEventListener('click', selSpan)
}

function selSpan(event){
  	if (isLoading) {
    		return; // Se una richiesta è già in corso, ignora il click
  	}

	const box=event.currentTarget;
	griglia.innerHTML=" "; 
	intestazione.childNodes[1].innerHTML=" ";
	intestazione.childNodes[3].innerHTML=" ";
	switch(box.dataset.requestId){

		case 'Canzoni':
			show();
			break;
		case 'Home':
			excuse();
			break;

		default: 
			console.log("Non implementata,Per verificare mhw3 selezionare canzoni o home"); 
			break;

	}
}


function show(){
 	isLoading = true; 
	fetch("https://accounts.spotify.com/api/token",
	{
   		method: "post",
   		body: 'grant_type=client_credentials',
   		headers:
   		{
    			'Content-Type': 'application/x-www-form-urlencoded',
    			'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
   		}
  	}
).then(onTokenResponse).then(onTokenJson);


function onTokenResponse(response){
  return response.json();
}


function onTokenJson(json){
  // Imposta il token global
  token = json.access_token;
  playlist();
}

function playlist(){
	fetch('https://api.spotify.com/v1/playlists/13g8N0hgcBhyO0ceKW7OES/tracks', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }).then(onResponse).then(onJson);
}





function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}




function onJson(json) {
  console.log('JSON ricevuto');
  console.log('Potrebbe essere lento,molto lento, ma parte parte');
  let frame;
  intestazione.childNodes[1].textContent="Le nostre canzoni";
  intestazione.childNodes[3].textContent="tutte reinterpretate dai nostri Artisti";
  for (const element of json.items){
  frame = document.createElement('iframe');
  frame.setAttribute('src',"https://open.spotify.com/embed/track/"+ element.track.id);
  frame.setAttribute('frameborder',"0");
  frame.setAttribute('allow',"encrypted-media"); //se no mi genera una serie di warning
  intestazione.appendChild(intestazione.childNodes[1]);
  intestazione.appendChild( intestazione.childNodes[3]);
  griglia.appendChild(frame);}
  isLoading = false; 

}
}

function excuse(){
	fetch('https://excuser-three.vercel.app/v1/excuse').then(onExcuseResponse).then(onExcuseJson);
}

function onExcuseResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function onExcuseJson(json){
 	intestazione.childNodes[1].textContent=json[0].excuse;
 	intestazione.childNodes[3].textContent="è una scusa che sicuramente potresti utilizzare per altre occasioni, ma 	non per 7even: The musical, ti aspettiamo =)";
}
        








