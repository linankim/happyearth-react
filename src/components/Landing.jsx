import React from 'react'
import GoogleMap from 'google-map-react'
import '../styles/googlemap.css'
import '../styles/grid.css'
import '../styles/cards.css'

class Landing extends React.Component {
	getLocation(e) {
		e.preventDefault()
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.showPosition)
		} else {
			return 'Geolocation is not supported by this browser'
		}
	}

	showPosition(position) {
		console.log(position)
		let lat = position.coords.latitude
		let lng = position.coords.lng
	}

	render() {
		return (
			<>
				<div className="grid long middle tall image  ">
					<div className="card long content">
						<div className="content">
							<div className="logo" style={{ backgroundImage: `` }}>
								<h1>Happy Earth</h1>
							</div>
							<input
								type="text"
								value={position => this.showPosition(position)}
								placeholder="where are you going?"
							/>
							<button onClick={e => this.getLocation(e)}></button>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default Landing
