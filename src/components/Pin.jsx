import React from 'react'
import '../styles/googlemap.css'

class Pin extends React.Component {
	state = {
		title: this.props.spot.title,
		center: {
			lat: this.props.spot.center.lat,
			lng: this.props.spot.center.lng
		}
	}
	render() {
		return (
			<div className="pin" lat={this.state.lat} lng={this.state.lng}>
				<label>${this.state.title}</label>
			</div>
		)
	}
}

export default Pin
