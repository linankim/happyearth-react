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
			types: {},
			eatins: [],
			takeaways: [],
			city: '',
			country: '',
			center: {
				lat: 59.95,
				lng: 30.33
			},
			toggleEatins: false,
			toggleTakeaways: false
		},
		spotter: {},
		eatins: [],
		takeaways: [],
		remainingEatins: [],
		remainingTakeaways: []
	}

	UNSAFE_componentWillMount() {
		let spotId = this.props.match.params.id
		let spot = this.state.spot
		let eatins = this.state.eatins
		let takeaways = this.state.takeaways
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
		axios
			.get(`${process.env.REACT_APP_API}/spots/${spotId}`)
			.then(res => {
				res.data.selectedImage = res.data.images[0]
				this.setState({ spot: res.data })
				console.log({ spot: res.data })
				this.getRemainingEatins()
				this.getRemainingTakeaways()
				let spotterId = this.state.spot.spotters
				axios
					.get(`${process.env.REACT_APP_API}/users/${spotterId}`)
					.then(user => {
						console.log({ user: user })
						this.setState({ spotter: user.data })
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
	// getClass = () => {
	// 	return this.state.spot.liked
	// 		? 'fas fa-globe-africa'
	// 		: 'fas fa-globe-americas'
	// }

	toggleLike = () => {
		let spot = this.state.spot
		spot.liked = !spot.liked
		this.setState({ spot })
	}

	getRemainingEatins = () => {
		let remainingEatins = this.state.eatins
		this.state.spot.eatins.forEach(spotEatin => {
			remainingEatins = remainingEatins.filter(stateEatin => {
				return spotEatin._id != stateEatin._id
			})
		})
		console.log({ remainingEatins })
		this.setState({ remainingEatins })
	}

	getRemainingTakeaways = () => {
		let remainingTakeaways = this.state.takeaways
		this.state.spot.takeaways.forEach(spotTakeaway => {
			remainingTakeaways = remainingTakeaways.filter(stateTakeaway => {
				return spotTakeaway._id != stateTakeaway._id
			})
		})
		console.log({ remainingTakeaways })
		this.setState({ remainingTakeaways })
	}

	render() {
		let styles = {
			selected: {
				color: 'red'
			}
		}
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
											<i className={this.getClass}></i>
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
										{this.state.spot.types ? (
											<div>{this.state.spot.types.name}</div>
										) : null}
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
													<div>
														{`${this.state.spotter.firstName} ${this.state.spotter.lastName}`}
													</div>
												</span>
											</div>
										</div>
									</div>

									<div>
										{this.state.spot.toggleEatins ? (
											<div>
												<h3>Eat In</h3>
												{this.state.spot.eatins.map(eatin => {
													return (
														<div
															className="content"
															style={styles.selected}
															key={eatin._id}
														>
															<li>
																<i className={eatin.icon}> </i>
																{eatin.explanation}
															</li>
														</div>
													)
												})}
												{this.state.remainingEatins.map(eatin => {
													return (
														<div className="empty" key={eatin._id}>
															<li>
																<i className={eatin.icon}> </i>
																{eatin.explanation}
															</li>
														</div>
													)
												})}
											</div>
										) : null}
									</div>
									<div>
										{this.state.spot.toggleTakeaways ? (
											<div>
												<h3>Take Away</h3>
												{this.state.spot.takeaways.map(takeaway => {
													return (
														<div
															className="content"
															style={styles.selected}
															key={takeaway._id}
														>
															<li>
																<i className={takeaway.icon}> </i>
																{takeaway.explanation}
															</li>
														</div>
													)
												})}
												{this.state.remainingTakeaways.map(takeaway => {
													return (
														<div className="empty" key={takeaway._id}>
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
								<div>
									<span>About this Spot</span>
									<p className="loginfont">{this.state.spot.description}</p>
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
