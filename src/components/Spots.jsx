import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Card from './Card.jsx'
import Nav from './Nav.jsx'
import Filters from './Filters.jsx'
import Map from './Map.jsx'
import Pin from './Pin.jsx'
import '../styles/grid.css'
import '../styles/spots.css'
import '../styles/grid.css'
import Sidebar from './Sidebar.jsx'

class Spots extends React.Component {
	state = {
		array: true,
		spots: [
			{
				images: [],
				types: {},
				center: {}
			}
		],
		spotsClone: [],
		center: {}
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
		let spot = this.state.spot
		let cityName = this.props.location.search.split('=')[1]
		axios
			.get(`${process.env.REACT_APP_API}/spots?city=${cityName}`)
			.then(res => {
				// spot.center.lat = res.data[0].center.lat
				// spot.center.lng = res.data[0].center.lng
				// console.log('res.data[0].center.lat', res.data[0].center.lat)
				// console.log('res.data[0].center.lng', res.data[0].center.lng)
				// console.log(res.data)
				this.setState({
					spots: res.data,
					spotsClone: res.data,
					center: res.data[0].center
				})
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
					<div>
						<Filters
							updateSearchField={this.updateSearchField}
							filterByType={this.filterByType}
						/>

						<div className="grid two">
							<div className="fixed">
								<div className="grid twocards">
									{this.state.spots.map(spot => (
										<Card spot={spot} key={spot._id} />
									))}
								</div>
							</div>
							<div className="map">
								<Map spots={this.state.spots} center={this.state.center} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Spots)
