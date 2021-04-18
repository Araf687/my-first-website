import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '96%',
  height: '96%',
  borderRadius:'5px',
};

export class MAP extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      />
    );
  }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCvrTOn2UbZES-i2G-DnRyOT1CxL9AQOQQ'
  })(MAP);