window.onload = succesGeo;
// onload de la page on affiche juste la location de la fac.


var x = document.getElementById("demo");
function getLocation() { //si on clique sur le bouton "direction" on affiche la direction de notre emplacement à la fac. 

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(direction,erreurGeo);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}

	// Fonction de callback en cas de succès
	function succesGeo(position) {
		// On instancie un nouvel objet LatLng pour Google Maps
		var latlng = new google.maps.LatLng(34.007807, -6.838259);
		
		// Ansi que des options pour la carte, centrée sur latlng
		var optionsGmaps = {
			mapTypeControl: false,
			center: latlng,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 17
		};
		
		// Initialisation de la carte avec les options
		mapholder = document.getElementById('mapholder');
   		mapholder.style.height = '400px';
    	mapholder.style.width = '550px';
		var map = new google.maps.Map(document.getElementById('mapholder'), optionsGmaps);

		// facultative : Ajout d'un marqueur à la position trouvée
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title:"La Faculté des Sciences Rabat"
		}); 
			
}




		///////////////////////////////////////////////////////////////////////////////////////////
		function direction(position){

		var directionsDisplay = new google.maps.DirectionsRenderer(); //DirectionsRenderer un objet pour dessinger le chemin sur la map
		var directionsService = new google.maps.DirectionsService(); //DirectionsService un objet pour fair une requete à google pour savoir le chemin
		
		var laFac = new google.maps.LatLng(34.007807, -6.838259); //La fac coordinates
		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		var request = { //Les details des chemin qu'on vaut DirectionsService trouve pour nous
			origin: latlng, //la source
			destination: laFac, //la destination
			travelMode: google.maps.TravelMode.DRIVING //WALKING   <= type de chemin à pieds, ou qute
		};

		directionsService.route(request, function(response, status) {
			//faire la requete "request" avec DirectionsService, et la douxieme parametre qui est une fonction est appelé Callback
			// càd, aprés qu'on à reçu la reponse de la part de DirectionsService, on va faire notre traitement

			// d'abord verifier le status de la recherche de notre chemin, il existe ou nn, ou s'il y a un problem dans les parametre de requete
			if (status == google.maps.DirectionsStatus.OK) { //s'il y a aucun prbleme
				directionsDisplay.setDirections(response); //on a le chemin sous form d'un objet "response", on le pass à directionsDisplay
				directionsDisplay.setMap(map); //set la map ou il va dessiner encore une fois
				
				var markerFac = new google.maps.Marker({ //facultatif, pour ajouter un marker pour la fac, il y en a déjà un
					position: laFac,
					map: map,
					title: "La Faculté des Sciences Rabat"
				});

			} else { // s'il y aun probleme
				alert("Directions Request from " + latlng.toUrlValue(6) + " to " + laFac.toUrlValue(6) + " failed: " + status); //afficher les details du probleme
			}
		});



		// Initialisation de la nouvelle carte avec les options
		var optionsGmaps = {
			mapTypeControl: false,
			center: latlng,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 17
		};
		mapholder = document.getElementById('mapholder');
		var map = new google.maps.Map(document.getElementById('mapholder'), optionsGmaps);
		
	}






	// Fonction de callback en cas d’erreur
	function erreurGeo(error) {
		var info = "Erreur lors de la géolocalisation : ";
		switch(error.code) {
		case error.TIMEOUT:
			info += "Timeout !";
		break;
		case error.PERMISSION_DENIED:
			info += "Vous n’avez pas donné la permission";
		break;
		case error.POSITION_UNAVAILABLE:
			info += "La position n’a pu être déterminée";
		break;
		case error.UNKNOWN_ERROR:
			info += "Erreur inconnue";
		break;
		}
		document.getElementById("demo").innerHTML = info;
	}

	






/*



var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon);
    mapholder = document.getElementById('mapholder');
    mapholder.style.height = '250px';
    mapholder.style.width = '500px';

    var myOptions = {
    center:latlon,zoom:10,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    
    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


*/