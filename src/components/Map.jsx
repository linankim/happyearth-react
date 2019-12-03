import React from 'react'
import GoogleMap from 'google-map-react'
import '../styles/googlemap.css'
import Pin from './Pin.jsx'

class Map extends React.Component {
	state = {
		zoom: 11
	}
	render() {
		console.log('wwwww', process.env.REACT_APP_GOOGLE_MAP)
		return (
			<GoogleMap
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP }}
				center={this.props.spot.center}
				zoom={this.state.zoom}
			>
				<Pin spot={this.props.spot} />
			</GoogleMap>
		)
	}
}

export default Map
