import React, {
  Component
} from "react";

import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    venues: []
  };
  componentDidMount() {
    this.getVenues();
  }
  loadMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDK4Rzpk7QIeoxO5xb1CxNMceih2sop_NY&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "QANEM2RQ0MROGYQKMXITFC2AP5C21MY1I4JUWGXVJHIL4ZTK",
      client_secret: "WNDZEXOEG3QTHCJSS1SJPZP2BVYAQRHKW10DTYJBQEFHOW4H",
      query: "food",
      near: "Manhattan",
      v: "20181014"
    };
    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        },  this.loadMap())
      })

      .catch(error => {
        console.log("ERROR!! " + error.response);
      });
  };

  initMap = () => {

    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat:40.7831,
        lng:73.9712
      },
      zoom: 15,
      styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
    })

     this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`
    //create an infow window
    var infowindow = new window.google.maps.InfoWindow({
    content: contentString
  });
      var marker= new window.google.maps.Marker({
      position: {
        lat: myVenue.venue.location.lat,
        lng: myVenue.venue.location.lng
      },
      map: map,
      title: myVenue.venue.name

    })
     // click on a Marker
    marker.addListener('click', function() {
       // change the content

       infowindow.setContent(contentString)

         //open an infowindow
    infowindow.open(map, marker)

  });

   })
}
  render()
           {
    return (
     <main>
      <div id ="map">
      </div>
      </main >
    )
  }
}
  function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}
export default App
