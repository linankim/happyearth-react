import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Card from './Card.jsx'
import Nav from './Nav.jsx'

class Spots extends React.Component {
	state = {
		spots: [
			{
				title: '',
				city: '',
				country: ''
			}
		],
		spotsClone: [],
		searchField: ''
	}

	componentDidMount(req, res) {
		axios
			.get(`${process.env.REACT_APP_API}/spots`)
			.then(res => {
				this.setState({ spots: res.data })
				console.log('res data >>>>>>>>>', { spots: res.data })
			})
			.catch(error => {
				res.send(error)
			})
	}

	render() {
		return (
			<div>
				<Nav />
				<div className="grid five large">
					{this.state.spots.map(spot => (
						<Card place={spot} key={spot._id} />
					))}
				</div>
			</div>
		)
	}
}

export default withRouter(Spots)
