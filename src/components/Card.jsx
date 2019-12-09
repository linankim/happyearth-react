import React from 'react'
import { Link } from 'react-router-dom'

class Card extends React.Component {
	state = {
		spot: this.props.spot,
		types: this.props.spot.types
	}

	selectBackground = background => {
		return { backgroundImage: `url('${background}')` }
	}

	UNSAFE_componentWillReceiveProps() {
		this.setState({ spot: this.props.spot })
	}

	render() {
		return (
			<Link className="card link" to={`/spots/${this.state.spot._id}`}>
				<div
					className="image"
					style={this.selectBackground(this.state.spot.images[0])}
				></div>
				<div className="content">
					{this.state.types ? (
						<small className="meta">{this.state.types.name}</small>
					) : null}
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
