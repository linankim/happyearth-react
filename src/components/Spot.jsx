import React from 'react'
import Map from './Map.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import '../styles/buttons.css'
import '../styles/cards.css'
import '../styles/forms.css'
import '../styles/gallery.css'
import '../styles/grid.css'
import '../styles/icons.css'
import '../styles/sidebar.css'
import '../styles/users.css'

class Spot extends React.Component {
	state = {
		spot: {
			liked: false,
			selectedImage: '',
			images: [],
			title: '',
			spotters: {
				name: '',
				avatar: ''
			},
			description: '',
			types: [],
			eatins: [],
			takeaways: [],
			amenities: [],
			city: '',
			country: '',
			center: {
				lat: 59.95,
				lng: 30.33
			},
			toggleEatins: false,
			toggleTakeaways: false
		},
		spotter: {}
	}

	UNSAFE_componentWillMount() {
		let spotId = this.props.match.params.id
		axios
			.get(`${process.env.REACT_APP_API}/spots/${spotId}`)
			.then(res => {
				res.data.selectedImage = res.data.images[0]
				console.log('res.data.selectedImage', res.data.selectedImage)
				console.log('res', res)
				this.setState({ spot: res.data })
				console.log({ spot: res.data })
				let spotterId = this.state.spot.spotters
				console.log('spotterId', spotterId)
				axios
					.get(`${process.env.REACT_APP_API}/users/${spotterId}`)
					.then(user => {
						console.log({ user: user })
						this.setState({ spotter: user.data })
						console.log('spotter', { spotter: user.data })
					})
					.catch(err => {
						console.log(err)
					})
			})
			.catch(err => console.log(err))
	}

	//Main Image
	clickedImage = image => {
		let spot = this.state.spot
		spot.selectedImage = image
		this.setState({ spot })
	}
	//Like button
	getClass = () => {
		return this.state.spot.liked
			? 'fas fa-globe-africa'
			: 'fas fa-globe-americas'
	}

	toggleLike = () => {
		let spot = this.state.spot
		spot.liked = !spot.liked
		this.setState({ spot })
	}

	render() {
		return (
			<>
				<div className="grid image">
					<div className="grid sidebar-left">
						<Sidebar />

						<div className="grid full">
							<div className="grid two">
								<div className="gallery">
									<div
										className="image-main"
										style={{
											backgroundImage: `url('${this.state.spot.selectedImage}')`
										}}
									>
										<button className="icon" onClick={() => this.toggleLike()}>
											<i className={this.getClass()}></i>
										</button>
									</div>
									<div className="thumbnails">
										{this.state.spot.images.map((image, index) => {
											return (
												<div
													className="thumbnail"
													style={{
														backgroundImage: `url(${image})`
													}}
													key={index}
													onClick={() => this.clickedImage(image)}
												></div>
											)
										})}
									</div>
								</div>
								<div className="map">
									<Map spot={this.state.spot} />
								</div>
							</div>
							<div className="details transparent">
								<div className="grid two">
									<div>
										<h1>{this.state.spot.title}</h1>
										<small className="padding">
											<i className="fas fa-map-marker-alt"></i>
											<span>
												{this.state.spot.city}, {this.state.spot.country}
											</span>
										</small>
									</div>
									<div>
										<div className="user">
											<div className="name">
												<small>Spotted by</small>
												<span>
													<div
														className="avatar"
														style={{
															backgroundImage: `url(${this.state.spotter.avatar})`
														}}
													></div>
												</span>
												<span>
													{`${this.state.spotter.firstName} ${this.state.spotter.lastName}`}
												</span>
											</div>
										</div>
									</div>
									<div>
										<p>{this.state.spot.description}</p>
									</div>
									<div>
										{this.state.spot.toggleEatins ? (
											<div>
												<h3>Eat In</h3>
												{this.state.spot.eatins.map(eatin => {
													return (
														<div className="content" key={eatin._id}>
															<li>
																<i className={eatin.icon}> </i>
																{eatin.explanation}
															</li>
														</div>
													)
												})}
											</div>
										) : null}
										{this.state.spot.toggleTakeaways ? (
											<div>
												<h3>Take Away</h3>
												{this.state.spot.takeaways.map(takeaway => {
													return (
														<div className="content" key={takeaway._id}>
															<li>
																<i className={takeaway.icon}> </i>
																{takeaway.explanation}
															</li>
														</div>
													)
												})}
											</div>
										) : null}
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

export default withRouter(Spot)
