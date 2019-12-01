import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Card from './Card.jsx'
import Nav from './Nav.jsx'
import Filters from './Filters.jsx'

class Spots extends React.Component {
	state = {
		spots: [],
		spotsClone: []
	}

	updateSearchField = e => {
		console.log('searchfield', e.target.value)
		if (e.target.value === '') {
			let spots = this.state.spots
			spots = this.state.spotsClone
			this.setState({ spots })
			console.log('empty search field', spots)
		} else {
			let filteredSpots = this.state.spotsClone.filter(spot => {
				return spot.title.includes(e.target.value)
				console.log('filteredSpots>>>>', filteredSpots)
			})
			this.setState({ spots: filteredSpots })
		}
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/spots`)
			.then(res => {
				this.setState({ spots: res.data, spotsClone: res.data })
				console.log('res data >>>>>>>>>', res.data)
			})
			.catch(error => {
				console.log({ error })
			})
	}

	render() {
		return (
			<div>
				<Nav />
				<Filters updateSearchField={this.updateSearchField} />
				<div className="grid five large">
					{this.state.spots.map(spot => (
						<Card spot={spot} key={spot._id} />
					))}
				</div>
			</div>
		)
	}
}

export default withRouter(Spots)
