import React, { Component } from 'react';
import './App.css';

class App extends Component {


componentDidMount() {
  this.loadMap()

}
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDK4Rzpk7QIeoxO5xb1CxNMceih2sop_NY&callback=initMap")
    window.initMap = this.initMap
  }

initMap = () => {
  var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -25.344,
      lng: 131.036
    },
      zoom: 18  
  })
}

  render() {

    return (
      <main> 
       <div id="map"></div>
      </main> 
    )
  }
}

{/*<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDK4Rzpk7QIeoxO5xb1CxNMceih2sop_NY&callback=initMap">
    </script>  */} 

    function loadScript(url) {

      var index = window.document.getElementsByTagName("script")[0]
      var script = window.document.createElement("script")
      script.src = url
      script.async = true
      script.defer = true
      index.parentNode.insertBefore(script, index)

    }
export default App;
