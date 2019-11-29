import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Card from './Card.jsx'
import Nav from './Nav.jsx'
import Filters from './Filters.jsx'

class Spots extends React.Component {
	state = {
		spots: [],
		spotsClone: [],
		searchField: ''
	}

	updateSearchField = (e, searchField) => {
		this.setState({ searchField: e.target.value })
		let filteredSpots = this.state.spotsClone.filter(spot => {
			return spot.title.includes(this.state.searchField)
		})
		this.setState({ spots: filteredSpots })
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/spots`)
			.then(res => {
				this.setState({ spots: res.data })
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
				<Filters />
				<div className="grid five large">
					{this.state.spots.map(spot => (
						<Card spot={spot} key={spot.id} />
					))}
				</div>
			</div>
		)
	}
}

export default withRouter(Spots)
