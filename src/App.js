import React, {
  Component
} from "react";
import MapSites from './MapSites'
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    venues: [],
    filtered: null
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
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "QANEM2RQ0MROGYQKMXITFC2AP5C21MY1I4JUWGXVJHIL4ZTK",
      client_secret: "WNDZEXOEG3QTHCJSS1SJPZP2BVYAQRHKW10DTYJBQEFHOW4H",
      near: "Lexington",
      v: "20181025"
    }



    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        },  this.loadMap())
      })

      .catch(error => {
        console.log("ERROR!! " + error.response);
      })
  }

  initMap = () => {

    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat:38.0656,
        lng:84.5226
              },
      zoom: 13
        })





        //create an infow window
        var infowindow = new window.google.maps.InfoWindow()
        // Display Dynamic markers

     this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`
  // creeate a marker
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
     <main className="App" role ="main">

      <section ref="map" className="map" id="map" role="application"></section>

       <section className="right-column" >
         <header className="header" aria-label="Application Header">

         </header>
         {!this.state.searchHidden ?
           <MapSites
             venues={this.state.venues}
             markers={this.state.markers}
             clickListItem={this.clickListItem}
             selectedIndex={this.state.selectedIndex}
             searchHidden={this.state.searchHidden}
           /> : null}

       </section>
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
