import React from 'react'
import Sidebar from './Sidebar.jsx'
import axios from 'axios'
import '../styles/create.css'
import '../styles/universal.css'

class Create extends React.Component {
	state = {
		user: {},
		spot: {
			files: [],
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
			})
			.catch(err => {
				console.log({ err })
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
			sessionStorage.setItem('path', '/create')
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
					this.state.spot.types = this.stae.types[0]._id
					this.setState({ spot })
				})
				.catch(err => console.log(err))
		}
	}

	//setState with input
	changeField = (e, field) => {
		let spot = this.state.spot
		spot[field] = e.target.value
		this.setState({ spot })
	}

	//toggle Eatins
	toggleEatin = e => {
		let spot = this.state.spot
		spot.toggleEatins = !spot.toggleEatins
		this.setState({ spot })
	}

	//toggle takeaways
	toggleTakeaway = e => {
		let spot = this.state.spot
		spot.toggleTakeaways = !spot.toggleTakeaways
		this.setState({ spot })
	}

	//select takeaways
	checkBox = e => {
		let spot = this.state.spot
		let _id = e.target.value
		let takeaways = spot.takeaways

		if (spot.takeaways.find(takeaway => takeaway == _id)) {
			spot.takeaways = spot.takeaways.filter(takeaway => takeaway != _id)
		} else {
			spot.takeaways.push(_id)
			if (spot.takeaways) this.setState({ spot: spot.takeaways })
		}
		this.setState({ spot })
	}

	//select eatins
	checkbox2 = e => {
		let spot = this.state.spot
		let _id = e.target.value
		let eatins = spot.eatins

		if (spot.eatins.find(eatin => eatin == _id)) {
			spot.eatins = spot.eatis.filter(eatin => eatin != _id)
		} else {
			spot.eatins.push(_id)
			this.setState({ spot: spot.eatins })
		}
		this.setState({ spot })
	}

	//upload files
	getFile = e => {
		let spot = this.state.spot
		spot.files = e.target.files
		this.setState({ spot }, () => {
			console.log('state', this.state)
		})
	}

	//button create place and upload files via cloudinary
	createPlace = e => {
		e.preventDefault()
		let data = new FormData()
		for (let key in this.state.spot) {
			if (
				(typeof this.state.spot[key] == 'object' && key == 'eatins') ||
				key == 'takeaways'
			) {
				this.state.spot[key].forEach(val => {
					data.append(`${key}[]`, val)
				})
			} else if (typeof this.state.spot[key] == 'object' && key == 'files') {
				for (let i = 0; i < this.state.spot[key].length; i++) {
					data.append(key, this.state.spot[key][i])
				}
			} else {
				data.append(key, this.state.spot[key])
			}
		}
		console.log({ data })
		axios
			.post(`${process.env.REACT_APP_API}/spots`, data)
			.then(res => {
				let spotId = res.data.spot._id
				this.props.history.push(`/spots/${spotId}`)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<div>
				<Sidebar />
				<div className="background centerforms grid">
					<div className="createform">
						<div className="formheaderfont">Create A New Spot</div>
						<form>
							<div>
								<label className="labelfont">Title</label>
								<input
									type="text"
									value={this.state.spot.title}
									onChange={e => this.changeField(e, 'title')}
								/>
								<label className="labelfont">Description</label>
								<textarea
									value={this.state.spot.description}
									onChange={e => this.changeField(e, 'description')}
								></textarea>
								<label className="labelfont">City or Town</label>
								<input
									type="text"
									value={this.state.spot.city}
									onChange={e => this.changeField(e, 'city')}
								/>
								<label className="labelfont">Country</label>
								<input
									type="text"
									value={this.state.spot.country}
									onChange={e => this.changeField(e, 'country')}
								/>
								<label className="labelfont">Type of Spot</label>
								<select onChange={e => this.changeField(e, 'types')}>
									{this.state.types.map(type => {
										return <option value={type._id}>{type.name}</option>
									})}
								</select>
								<label className="labelfont">Upload Photos</label>
								<input type="file" onChange={this.getFile} multiple />
								<div className="group">
									<div>
										<label className="labelfont">
											Click on Take away and/or Eat in and select what they
											provide for you.
										</label>
									</div>

									<div>
										<label className="checkbox labelfont">
											<input
												type="checkbox"
												onChange={e => this.toggleTakeaway(e)}
											/>
											Take Away
										</label>
										{this.state.spot.toggleTakeaways
											? this.state.takeaways.map(takeaway => {
													return (
														<label className="checkbox labelfont">
															<input
																type="checkbox"
																value={takeaway._id}
																onChange={e => this.checkBox(e)}
															/>
															<i className={takeaway.icon}></i>
															<span>{takeaway.explanation}</span>
														</label>
													)
											  })
											: null}
									</div>

									<div>
										<label className="checkbox labelfont">
											<input
												type="checkbox"
												onChange={e => this.toggleEatin(e)}
											/>
											Eat In
										</label>
										{this.state.spot.toggleEatins
											? this.state.eatins.map(eatin => {
													return (
														<label className="checkbox labelfont">
															<input
																type="checkbox"
																value={eatin._id}
																onChane={e => this.checkbox2(e)}
															/>
															<i className={eatin.icon}></i>
															<span>{eatin.explanation}</span>
														</label>
													)
											  })
											: null}
									</div>
								</div>
								<label className="labelfont">Latitude</label>
								<input
									type="number"
									value={this.state.spot.lat}
									onChange={e => this.changeField(e, 'lat')}
								/>
								<label className="labelfont">Longitude</label>
								<input
									type="number"
									value={this.state.spot.lng}
									onChange={e => this.changeField(e, 'lng')}
								/>
							</div>
							<div className="centerbutton">
								<button onClick={e => this.createPlace(e, this.state.spot)}>
									Publish this spot
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Create
