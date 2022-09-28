var map;
var service;
var markers = [];

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const stubaFEI = { lat: 48.151965, lng: 17.072995 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: stubaFEI,
        zoom: 16,
    });
    directionsRenderer.setMap(map);

    const findBus = function(){
      var request = {
        location: stubaFEI,
        radius: '500',
        type: ['transit_station']
      };
    
      service = new google.maps.places.PlacesService(map);
      service.search(request, callback);
    }

    document.getElementById("stops").addEventListener("click", findBus);

    var image = {
      url: "pictures/icon1.png",
      anchor: new google.maps.Point(25, 25),
      scaledSize: new google.maps.Size(50, 50),
      labelOrigin: new google.maps.Point(35, 56)
    }

    const marker = new google.maps.Marker({
        position: stubaFEI,
        map,
        title: "STU FEI",
        icon: image,
        label: {
          text: "STUBA FEI",
          fontWeight: "bold",
        }
    });
    
    const contentString =
        "<p><b>Zemepisná šírka:</b> 48.151965</p>" +
        "<p><b>Zemepisná dĺžka:</b> 17.072995</p>";
      const infowindow = new google.maps.InfoWindow({
          content: contentString,
      });
      marker.addListener("click", () => {
          infowindow.open(map, marker);
      });

    directionsRenderer.addListener("directions_changed", () => {
      computeTotalDistance(directionsRenderer.getDirections());
    });
  
    const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street"),
        {
          position: stubaFEI,
          pov: {
            heading: 10,
            pitch: 2,
          },
        }
      );

    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
        return;
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
        marker.setMap(null);
    });
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
        if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
        }

        if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
        } else {
        bounds.extend(place.geometry.location);
        }
    });
    });

    const onChangeHandler = function () {
        marker.setVisible(false);
        calculateAndDisplayRoute(directionsService, directionsRenderer);
      };
    document.getElementById("calculate").addEventListener("click", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    let start = document.getElementById("pac-input").value;
    let end = new google.maps.LatLng(48.151965, 17.072995);
    let car = document.getElementById("car").checked;
    let mode;

    if(car) {
      mode = "DRIVING";
    }
    else mode = "WALKING";

    var request = {
        origin:start,
        destination:end,
        travelMode: mode
      };
      directionsService.route(request, function(response, status) {
        if (status == 'OK') {
          directionsRenderer.setDirections(response);
        }
      });
  }
  
  function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];
  
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById("distance").innerHTML = "<span style='font-size:25px'>" + "Celková vzdialenosť: " + total + " km" + "</span>";
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: "pictures/icon.png"
    });
  }