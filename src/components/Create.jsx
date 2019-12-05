import React from 'react'
import Nav from './Nav.jsx'
import Sidebar from './Sidebar.jsx'
import axios from 'axios'

class Create extends React.Component {
	state = {
		user: {},
		spot: {
			file: '',
			images: [],
			types: '',
			amenities: [],
			lat: '',
			lng: ''
		},
		amenities: [],
		types: []
	}
	UNSAFE_componentWillMount() {
		let types = this.state.types
		let amenities = this.state.amenities
		axios
			.get(`${process.env.REACT_APP_API}/types`)
			.then(res => {
				types = res.data
				this.setState({ types })
				console.log('types', types)
			})
			.catch(err => {
				console.log(err)
			})
		axios
			.get(`${process.env.REACT_APP_API}/amenities`)
			.then(res => {
				amenities = res.data
				this.setState({ amenities })
				console.log({ amenities })
			})
			.catch(err => {
				console.log(err)
			})
	}

	componentDidMount() {
		let spot = this.state.spot
		if (!localStorage.getItem('token')) {
			this.props.history.push('/login')
		} else {
			axios
				.get(`${process.env.REACT_APP_API}/auth`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				})
				.then(user => {
					this.setState({ user: user.data })
					this.state.spot.spotters = this.state.user._id
					console.log('spotter', this.state.spot.spotters)
					this.setState({ spot })
					console.log({ spot })
				})
				.catch(error => console.log(error))
		}
	}

	//setState with input
	changeField = (e, field) => {
		let spot = this.state.spot
		spot[field] = e.target.value
		this.setState({ spot })
		console.log({ spot })
	}

	//select Amenities
	checkBox = e => {
		let spot = this.state.spot
		let _id = e.target.value
		let amenities = spot.amenities

		if (spot.amenities.find(amenity => amenity == _id)) {
			console.log('no')
			spot.amenities = spot.amenities.filter(amenity => amenity != _id)
		} else {
			console.log('yes')
			spot.amenities.push(_id)
			this.setState({ spot: spot.amenities })
			console.log(spot.amenities)

			console.log({ spot })
		}
		this.setState({ spot })
	}

	//upload files
	getFile = e => {
		let spot = this.state.spot
		// spot.files = Array.from(e.target.files)
		// this.setState({ spot }, () => {
		// 	console.log('state', this.state)
		// })
		spot.file = e.target.files[0]
		this.setState({ spot }, () => {
			console.log('state', this.state)
		})
	}

	//button create place
	createPlace = e => {
		e.preventDefault()
		console.log('state', this.state)
		let data = new FormData()
		for (let key in this.state.spot) {
			console.log('KEY', this.state.spot[key])
			console.log('TYPE', typeof this.state.spot[key])
			if (typeof this.state.spot[key] == 'object' && key == 'amenities') {
				console.log('key', key)
				this.state.spot[key].forEach(val => {
					data.append(`${key}[]`, val)
				})
			} else {
				data.append(key, this.state.spot[key])
				console.log('not working', data)
			}
		}
		console.log({ data })
		axios
			.post(`${process.env.REACT_APP_API}/spots`, data)
			.then(res => {
				console.log('i am here', res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<>
				<div className="grid image">
					<div className="grid sidebar-left">
						<Sidebar />
						<div>
							<Nav />
							<div className="grid center">
								<div className="grid createform">
									<div className="content">
										<h2>Create a new Spot</h2>
										<form>
											<div>
												<label>Title</label>
												<input
													type="text"
													value={this.state.spot.title}
													onChange={e => this.changeField(e, 'title')}
												/>
											</div>
											<div className="group">
												<label>Description</label>
												<textarea
													value={this.state.spot.description}
													onChange={e => this.changeField(e, 'description')}
												></textarea>
											</div>
											<div className="group">
												<label>City or Town</label>
												<input
													type="text"
													value={this.state.spot.city}
													onChange={e => this.changeField(e, 'city')}
												/>
											</div>
											<div className="group">
												<label>Country</label>
												<input
													type="text"
													value={this.state.spot.country}
													onChange={e => this.changeField(e, 'country')}
												/>
											</div>
											<div className="group">
												<label>Type of Place</label>
												<select onChange={e => this.changeField(e, 'types')}>
													{this.state.types.map(type => {
														return <option value={type._id}>{type.name}</option>
													})}
												</select>
											</div>
											<div className="group">
												<label>Upload Photos</label>
												<input type="file" onChange={this.getFile} multiple />
											</div>
											<div className="group">
												<label>Amenities</label>
												{this.state.amenities.map(amenity => {
													return (
														<label className="checkbox">
															<input
																type="checkbox"
																value={amenity._id}
																onChange={e => this.checkBox(e)}
															/>
															<i className={amenity.icon}></i>
															<span> {amenity.explanation}</span>
														</label>
													)
												})}
											</div>
											<div className="group">
												<label>Latitude</label>
												<input
													type="number"
													value={this.state.spot.lat}
													onChange={e => this.changeField(e, 'lat')}
												/>

												<label>Longitude</label>
												<input
													type="number"
													value={this.state.spot.lng}
													onChange={e => this.changeField(e, 'lng')}
												/>
											</div>
											<div className="group"></div>
											<button
												className="primary"
												onClick={e => this.createPlace(e, this.state.spot)}
											>
												Publish this Spot
											</button>
											<button className="cancel">
												<i className="fas fa-times"></i>
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default Create
