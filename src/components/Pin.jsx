import React from 'react'

class Pin extends React.Component {
	state = {
		lat: this.props.state.lat,
		lng: this.props.state.lng,
		title: this.props.state.title
	}
	render() {
		return (
			<div className="pin" lat={this.state.lat} lng={this.state.lng}>
				<label>${this.state.place.title}</label>
			</div>
		)
	}
}

export default Pin
