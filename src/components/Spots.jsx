import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Card from './Card.jsx'
import Nav from './Nav.jsx'
import Filters from './Filters.jsx'
import Map from './Map.jsx'
import '../styles/grid.css'
import '../styles/spots.css'
import Sidebar from './Sidebar.jsx'
import GoogleMap from 'google-map-react'
import Pin from './Pin.jsx'

class Spots extends React.Component {
	state = {
		spots: [],
		spotsClone: [],
		center: {
			lat: 59.95,
			lng: 30.33
		}
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
				return spot.title.toLowerCase().includes(e.target.value.toLowerCase())
				console.log('filteredSpots>>>>', filteredSpots)
			})
			this.setState({ spots: filteredSpots })
		}
	}

	filterByType = e => {
		console.log('this.state.spots', this.state.spots)
		let selected = e.target.value
		console.log(e.target.value)
		let spotsClone = this.state.spotsClone
		let spotsFound
		if (selected !== 'All') {
			spotsFound = spotsClone.filter(s => s.types.name === selected)
		} else {
			spotsFound = spotsClone
		}
		this.setState({ spots: spotsFound })
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
			<div className="grid image">
				<div className="grid sidebar-left">
					<Sidebar />
					<div className="grid">
						<Nav />
						<Filters
							updateSearchField={this.updateSearchField}
							filterByType={this.filterByType}
						/>

						<div className="grid two">
							<div className="grid twocards">
								{this.state.spots.map(spot => (
									<Card spot={spot} key={spot._id} />
								))}
							</div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Spots)
