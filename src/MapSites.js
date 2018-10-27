import React from 'react'

class MapSites extends React.Component {
  constructor(props){
  super(props);
  this.state = {
     venues: [],
    }

}
handleValueChange = (event) => {
this.setState({query: event.target.value})
}
render(){

return (

  <div id ='side-bar'>
  <input id = 'input-box' type = 'text' placeholder= 'Enter the site'
  arial-label ='text filter'
  value = {this.state.value}
  onChange = {event => this.handleValueChange} />


  </div>
);

}
}
export default MapSites
