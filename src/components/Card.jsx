import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Card extends React.Component {
	state = {
		spot: this.props.spot
	}

	selectBackground = background => {
		return { backgroundImage: `url('${background}')` }
	}

	render() {
		return (
			<Link className="card link" to={`/spots/${this.state.spot._id}`}>
				<div
					className="image"
					style={this.selectBackground(this.state.spot.images[0])}
				></div>
				<div className="content">
					<small className="meta">{this.state.spot.title}</small>
					<h2>{this.state.spot.title}</h2>
					<small className="location">
						<span>
							{this.state.spot.city}, {this.state.spot.country}
						</span>
					</small>
				</div>
			</Link>
		)
	}
}

export default Card
