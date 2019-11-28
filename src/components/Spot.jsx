import React from 'react'
import Nav from './Nav.jsx'
import GoogleMap from 'google-map-react'
import axios from 'axios'

class Spot extends React.Component {
	state = {
		spot: {
			selectedImage: '',
			pictures: [],
			title: '',
			spotters: [],
			description: '',
			typeOfPlace: [],
			amenities: [],
			city: '',
			country: '',
			key: {
				key: 'AIzaSyCVJkF4x11QI221vToWHyVvM4voNYuYbwU'
			},
			center: {
				lat: 0.0,
				lng: 0.0
			},
			zoom: 0
		}
	}
	componentWillMount() {
		let spot = this.state.spot
		console.log('works')
		axios
			.get(`${process.env.REACT_APP_API}/spot`)
			.then(res => {
				this.setState({ res: res.spot })
				console.log({ res: res.spot })
				console.log('res', res)
			})
			.catch(err => console.log(err))
	}
	toggleLike = () => {}
	getClass = () => {}
	render() {
		return (
			<>
				<Nav />
				<div>
					<ul className="grid two">
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
								{this.state.spot.pictures.map((image, index) => {
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
						<GoogleMap
							bootstrapURLKeys={this.state.spot.key}
							center={this.state.spot.center}
							zoom={this.state.spot.zoom}
						></GoogleMap>
					</ul>
				</div>
				<div className="grid large">
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
									<small>Spoted by</small>
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

export default Spot
