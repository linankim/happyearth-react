import React from "react";
import GoogleMap from "google-map-react";
import "../styles/googlemap.css";
import Pin from "./Pin.jsx";

class Map extends React.Component {
  state = {
    zoom: 11,
  };
  makeSpots = () => {
    if (this.props.spots) {
      return this.props.spots.map((spot) => {
        return (
          <Pin
            key={spot._id}
            spot={spot}
            lat={spot.center.lat}
            lng={spot.center.lng}
          />
        );
      });
    } else {
      return (
        <Pin
          spot={this.props.spot}
          lat={this.props.spot.center.lat}
          lng={this.props.spot.center.lng}
        />
      );
    }
  };
  render() {
    return (
      <GoogleMap
        bootstrapURLKeys="https://maps.googleapis.com/maps/api/js?key: process.env.REACT_APP_GOOGLE_MAP&callback=initMap"
        // bootstrapURLKeys={{ key: "AIzaSyB6SP2RExi96rEr9J-iDWp6Bp1hi0owNlE" }}
        center={
          this.props.spot && this.props.spot.center
            ? this.props.spot.center
            : this.props.center
        }
        zoom={this.state.zoom}
      >
        {this.makeSpots()}
      </GoogleMap>
    );
  }
}

export default Map;
