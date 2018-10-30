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
render() {
    console.log("venues: ", this.props.venues);

    return (
      <divy id='side-bar'>
        <input
          id='input-box'
          type='text'
          placeholder='Enter the site'
          arial-label='text filter'
          value={this.state.value}
          onChange=
          {event => this.handleValueChange}/>
        {this.props.venues && this.props.venues.map(venue =>{
          return (
            <button key={venue.venue.id}>{venue.venue.name}</button>
          )
        })}
      </div>
    );
  }
}
export default MapSites
