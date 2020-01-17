import React from 'react'
import Map from './Map.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import '../styles/spot.css'
import '../styles/buttons.css'
import '../styles/cards.css'
import '../styles/forms.css'
import '../styles/gallery.css'
import '../styles/grid.css'
import '../styles/icons.css'
import '../styles/sidebar.css'
import '../styles/users.css'
import '../styles/universal.css'
import '../styles/grid.css'

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
				lat: 9.471077,
				lng: 100.04758
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
				color: '#27965c'
			}
		}
		return (
			<>
				<div className="spotsbackgroundimage">
					<div className="grid sidebar-left">
						<Sidebar />
						<div className="grid full">
							<div className="spotheading">
								<div className="grid two">
									<div>
										<div>
											{this.state.spot.types ? (
												<div className="typefont">
													{this.state.spot.types.name}
												</div>
											) : null}
										</div>
										<div className="titlefont">{this.state.spot.title}</div>
										<small className="paddingleftten">
											<i className="fas fa-map-marker-alt"></i>
											<span className="locationfont">
												{this.state.spot.city}, {this.state.spot.country}
											</span>
										</small>
									</div>
									<div>
										<div className="user minitwogrid">
											<div
												className="avatar"
												style={{
													backgroundImage: `url(${this.state.spotter.avatar})`
												}}
											></div>
											<div>
												<div className="spottedbyfont">Spotted by:</div>
												<div className="spottedbyfont">
													{` ${this.state.spotter.firstName} ${this.state.spotter.lastName}`}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="grid two">
								<div className="gallery">
									<div className="gallerymain">
										<div
											className="image-main"
											style={{
												backgroundImage: `url('${this.state.spot.selectedImage}')`
											}}
										>
											<button
												className="icon"
												onClick={() => this.toggleLike()}
											>
												<i className={this.getClass}></i>
											</button>
										</div>
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
							<div className="details whitebackground">
								<div className="grid two">
									<div>
										{this.state.spot.toggleEatins ? (
											<div>
												<div className="eatinfont">Eat In</div>
												{this.state.spot.eatins.map(eatin => {
													return (
														<div className="amenityfontbold" key={eatin._id}>
															<li>
																<i className={eatin.icon}> </i>
																{eatin.explanation}
															</li>
														</div>
													)
												})}
												{this.state.remainingEatins.map(eatin => {
													return (
														<div
															className="amenityfont"
															style={styles.selected}
															key={eatin._id}
														>
															<li>
																<i className={eatin.icon}> </i>
																{` Bring Your Own   ${eatin.explanation}`}
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
												<div className="eatinfont">Take Away</div>
												{this.state.spot.takeaways.map(takeaway => {
													return (
														<div className="amenityfontbold" key={takeaway._id}>
															<li>
																<i className={takeaway.icon}> </i>
																{takeaway.explanation}
															</li>
														</div>
													)
												})}
												{this.state.remainingTakeaways.map(takeaway => {
													return (
														<div
															className="amenityfont"
															style={styles.selected}
															key={takeaway._id}
														>
															<li>
																<i className={takeaway.icon}> </i>
																{` Bring Your Own   ${takeaway.explanation}`}
															</li>
														</div>
													)
												})}
											</div>
										) : null}
									</div>
								</div>
								<div>
									<div className="aboutspotfont">About this Spot</div>
									<div className="descriptionfont">
										{this.state.spot.description}
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
