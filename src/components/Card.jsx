import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Card extends React.Component {
	state = {
		spot: {}
	}
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/spots`)
			.then(spot => {
				this.setState({ spot: spot.data })
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		return (
			<Link className="card link">
				<div className="image"></div>
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
