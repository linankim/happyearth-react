import React from 'react'
import Nav from './Nav.jsx'
import GoogleMap from 'google-map-react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Pin from './Pin.jsx'

class Spot extends React.Component {
	state = {
		spot: {
			selectedImage: '',
			pictures: [],
			title: '',
			spotters: {
				name: '',
				avatar: ''
			},
			description: '',
			typeOfPlace: [],
			amenities: [],
			city: '',
			country: '',
			key: {
				key: 'AIzaSyCVJkF4x11QI221vToWHyVvM4voNYuYbwU'
			},
			center: {
				lat: 10.987,
				lng: 9.789
			},
			zoom: 11
		}
	}
	UNSAFE_componentWillMount() {
		let spotId = this.props.match.params.id
		console.log('works')
		console.log('spotId', spotId)
		axios
			.get(`${process.env.REACT_APP_API}/spots/${spotId}`)
			.then(res => {
				res.data.selectedImage = res.data.pictures[0]
				console.log('res.data.selectedImage', res.data.selectedImage)
				console.log('res', res)
				this.setState({ spot: res.data })
				console.log({ spot: res.data })
			})
			.catch(err => console.log(err))
	}
	toggleLike = () => {}
	getClass = () => {}
	render() {
		return (
			<>
				<Nav />

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
							<div
								className="thumbnail selected"
								style={{
									backgroundImage: `url('${this.state.spot.selectedImage}')`
								}}
							></div>
							{this.state.spot.pictures.map((picture, index) => {
								return (
									<div
										className="thumbnail"
										style={{
											backgroundImage: `url(${picture})`
										}}
										key={index}
										onClick={() => this.clickedImage(picture)}
									></div>
								)
							})}
						</div>
					</div>
					<div className="map">
						<GoogleMap
							bootstrapURLKeys={this.state.spot.key}
							center={this.state.spot.center}
							zoom={this.state.spot.zoom}
						></GoogleMap>
					</div>
				</div>

				<div className="grid medium">
					<div className="grid sidebar-right">
						<div className="content">
							<h1>{this.state.spot.title}</h1>
							<small>
								<i className="fas fa-map-marker-alt"></i>
								<span>
									{this.state.spot.city}, {this.state.spot.country}
								</span>
							</small>
							<div className="user">
								<div className="name">
									<small>Spotted by</small>
									<span>{this.state.spot.spotters.name}</span>
								</div>
							</div>
							<div className="card specs">
								<div className="content">
									<ul className="grid two">
										<i className="fas fa-fw fa-home"></i>
										{this.state.spot.typeOfPlace.name}
									</ul>
								</div>
							</div>
							<p>{this.state.spot.description}</p>
							<h3>Amenities</h3>
							<div className="card specs">
								<ul className="grid two">
									{this.state.spot.amenities.map((amenity, index) => {
										return (
											<div className="content" key={index}>
												<li>
													<i className={amenity.icon}> </i>
													{amenity.name}
												</li>
											</div>
										)
									})}
								</ul>
							</div>
							<div className="reviews">
								<h2>Rating</h2>
								<form>
									<div className="group">
										<div className="rating">
											<i className="far fa-star"></i>
											<i className="far fa-star"></i>
											<i className="far fa-star"></i>
											<i className="far fa-star"></i>
											<i className="far fa-star"></i>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default withRouter(Spot)
