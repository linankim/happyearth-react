import React from 'react'
import Nav from './Nav.jsx'
import Sidebar from './Sidebar.jsx'
import axios from 'axios'

class Create extends React.Component {
	state = {
		spot: {
			images: [],
			types: [],
			amenities: []
		}
	}
	UNSAFE_componentWillMount() {
		let spot = this.state.spot
		axios
			.get(`${process.env.REACT_APP_API}/types`)
			.then(res => {
				spot.types = res.data
				this.setState({ spot })
				console.log('spot', spot)
			})
			.catch(err => {
				console.log(err)
			})
		axios
			.get(`${process.env.REACT_APP_API}/amenities`)
			.then(res => {
				spot.amenities = res.data
				this.setState({ spot })
				console.log({ spot })
			})
			.catch(err => {
				console.log(err)
			})
	}

	changeField = (e, field) => {
		let spot = this.state.spot
		spot[field] = e.target.value
		this.setState({ spot })
		console.log({ spot })
	}
	//upload images
	getFile = e => {
		let spot = this.state.spot
		spot.images = e.target.files[0]
		let data = new FormData()
		data.append('file', e.target.files[0])
		data.append('title', this.state.spot.title)
		data.append('description', this.state.spot.description)
		data.append('city', this.state.spot.city)
		data.append('country', this.state.spot.country)
		data.append('type', this.state.spot.type)
		data.append('amenity', this.state.spot.amenity)
		data.append('lat', this.state.spot.lat)
		data.append('lng', this.state.spot.lng)

		// 		axios
		// 		.post(`${process.env.CLOUDINARYURL}`, headers:{
		// 		'Content-Type': ''
		// 	},data: formData
		// )
		// .then(res => console.log(res))
		// .catch()
	}

	//create place button
	createPlace = e => {
		e.preventDefault()
		axios
			.post(`${process.env.REACT_APP_API}/spots`, this.state.spot)
			.then(res => {
				res.send(res.data)
				console.log(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<>
				<Nav />
				<div className="grid medium">
					<div className="grid sidebar-left">
						<Sidebar />
						<div className="content">
							<h2>Create a new Spot</h2>
							<form>
								<div className="group">
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
									<select onChange={e => this.changeField(e, 'type')}>
										{this.state.spot.types.map(type => {
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
									{this.state.spot.amenities.map(amenity => {
										return (
											<label className="checkbox">
												<input
													type="checkbox"
													value={amenity._id}
													onChange={e => this.checkBox(e, 'field')}
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
			</>
		)
	}
}

export default Create
