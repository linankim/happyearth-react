import React from 'react'
import Nav from './Nav.jsx'
import Sidebar from './Sidebar.jsx'
import axios from 'axios'
import '../styles/create.css'

class Create extends React.Component {
	state = {
		user: {},
		spot: {
			file: '',
			images: [],
			types: '',
			eatins: [],
			takeaways: [],
			lat: '',
			lng: '',
			toggleEatins: false,
			toggleTakeaways: false
		},
		eatins: [],
		takeaways: [],
		types: []
	}
	UNSAFE_componentWillMount() {
		let types = this.state.types
		let eatins = this.state.eatins
		let takeaways = this.state.takeaways
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
			.get(`${process.env.REACT_APP_API}/eatins`)
			.then(res => {
				eatins = res.data
				this.setState({ eatins })
				console.log({ eatins })
			})
			.catch(err => {
				console.log(err)
			})
		axios
			.get(`${process.env.REACT_APP_API}/takeaways`)
			.then(res => {
				takeaways = res.data
				this.setState({ takeaways })
				console.log({ takeaways })
			})
			.catch(err => {
				console.log(err)
			})
	}

	componentDidMount() {
		let spot = this.state.spot
		if (!localStorage.getItem('token')) {
			this.props.history.push('/Signup')
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
					this.state.spot.types = this.state.types[0]._id
					console.log('spotter', this.state.spot.spotters)
					console.log('type', this.state.spot.types)
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
	}

	//toggle eatins
	toggleEatin = e => {
		let spot = this.state.spot
		spot.toggleEatins = !spot.toggleEatins
		this.setState({ spot })
		console.log({ spot })
	}

	//toggle takeaways
	toggleTakeaway = e => {
		let spot = this.state.spot
		spot.toggleTakeaways = !spot.toggleTakeaways
		this.setState({ spot })
		console.log({ spot })
	}

	//select Takeaways
	checkBox = e => {
		let spot = this.state.spot
		let _id = e.target.value
		let takeaways = spot.takeaways

		if (spot.takeaways.find(takeaway => takeaway == _id)) {
			console.log('no')
			spot.takeaways = spot.takeaways.filter(takeaway => takeaway != _id)
		} else {
			console.log('yes')
			spot.takeaways.push(_id)
			if (spot.takeaways) this.setState({ spot: spot.takeaways })
			console.log(spot.takeaways)
			console.log({ spot })
		}
		this.setState({ spot })
	}

	//select Eatins
	checkBox2 = e => {
		let spot = this.state.spot
		let _id = e.target.value
		let eatins = spot.eatins

		if (spot.eatins.find(eatin => eatin == _id)) {
			console.log('no')
			spot.eatins = spot.eatins.filter(eatin => eatin != _id)
		} else {
			console.log('yes')
			spot.eatins.push(_id)
			this.setState({ spot: spot.eatins })
			console.log(spot.eatins)

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
			if (
				(typeof this.state.spot[key] == 'object' && key == 'eatins') ||
				key == 'takeaways'
			) {
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
				let spotId = res.data.spot._id
				this.props.history.push(`/spots/${spotId}`)
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
							<div className="grid center image">
								<div className="grid createform">
									<div className="content">
										<div className="createheader">Create a new Spot</div>
										<form>
											<div>
												<label className="createformfont">Title</label>
												<input
													type="text"
													value={this.state.spot.title}
													onChange={e => this.changeField(e, 'title')}
												/>
											</div>
											<div className="group">
												<label className="createformfont">Description</label>
												<textarea
													value={this.state.spot.description}
													onChange={e => this.changeField(e, 'description')}
												></textarea>
											</div>
											<div className="group">
												<label className="createformfont">City or Town</label>
												<input
													type="text"
													value={this.state.spot.city}
													onChange={e => this.changeField(e, 'city')}
												/>
											</div>
											<div className="group">
												<label className="createformfont">Country</label>
												<input
													type="text"
													value={this.state.spot.country}
													onChange={e => this.changeField(e, 'country')}
												/>
											</div>
											<div className="group">
												<label className="createformfont">Type of Place</label>
												<select onChange={e => this.changeField(e, 'types')}>
													{this.state.types.map(type => {
														return <option value={type._id}>{type.name}</option>
													})}
												</select>
											</div>
											<div className="group">
												<label className="createformfont">Upload Photos</label>
												<input type="file" onChange={this.getFile} multiple />
											</div>
											<div className="createformfont">
												Click on take away and / or eat in and select what they
												will provide for you{' '}
											</div>
											<div className="group">
												<label className="checkbox createformfont">
													<input
														type="checkbox"
														onChange={e => this.toggleTakeaway(e)}
													/>
													Take away
												</label>
												{this.state.spot.toggleTakeaways
													? this.state.takeaways.map(takeaway => {
															return (
																<label className="checkbox createformfont">
																	<input
																		type="checkbox"
																		value={takeaway._id}
																		onChange={e => this.checkBox(e)}
																	/>
																	<i className={takeaway.icon}></i>
																	<span> {takeaway.explanation}</span>
																</label>
															)
													  })
													: null}
											</div>
											<div className="group">
												<label className="checkbox createformfont">
													<input
														type="checkbox"
														onChange={e => this.toggleEatin(e)}
													/>
													Eat In
												</label>
												{this.state.spot.toggleEatins
													? this.state.eatins.map(eatin => {
															return (
																<label className="checkbox createformfont">
																	<input
																		type="checkbox"
																		value={eatin._id}
																		onChange={e => this.checkBox2(e)}
																	/>
																	<i className={eatin.icon}></i>
																	<span> {eatin.explanation}</span>
																</label>
															)
													  })
													: null}
											</div>
											<div className="group">
												<label className="createformfont">Latitude</label>
												<input
													type="number"
													value={this.state.spot.lat}
													onChange={e => this.changeField(e, 'lat')}
												/>

												<label className="createformfont">Longitude</label>
												<input
													type="number"
													value={this.state.spot.lng}
													onChange={e => this.changeField(e, 'lng')}
												/>
											</div>
											<button
												className="primary"
												onClick={e => this.createPlace(e, this.state.spot)}
											>
												Publish this Spot
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
