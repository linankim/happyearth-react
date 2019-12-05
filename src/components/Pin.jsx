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
	UNSAFE_componentWillReceiveProps(props) {
		console.log({ props })
		this.setState({
			title: this.props.spot.title,
			center: {
				lat: this.props.spot.center.lat,
				lng: this.props.spot.center.lng
			}
		})
	}
	render() {
		return (
			<div
				className="pin"
				lat={this.state.center.lat}
				lng={this.state.center.lng}
			>
				<label>{this.state.title}</label>
			</div>
		)
	}
}

export default Pin
