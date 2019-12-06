import React from 'react'
import axios from 'axios'
import Nav from './Nav.jsx'
import Sidebar from './Sidebar.jsx'
import '../styles/profile.css'

class Profile extends React.Component {
	state = {
		user: {
			file: ''
		}
	}

	componentDidMount() {
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
					console.log('works')
					this.setState({ user: user.data })
					console.log({ user: user.data })
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	//logout button
	logout = e => {
		e.preventDefault()
		localStorage.removeItem('token')
		this.props.history.push('/login')
	}

	//change profile details
	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		console.log(user[field])
		this.setState({ user })
		console.log({ user })
	}

	//change profile picture
	changePicture = e => {
		let user = this.state.user
		user.file = e.target.files[0]
		console.log('e.target.files[0]', e.target.files[0])
		this.setState({ user })
		console.log({ user })
	}

	//save changed profile details
	savesChanges = e => {
		e.preventDefault(e)
		console.log('button pushed')
		let userId = this.state.user._id
		let data = new FormData()
		console.log('i am at this point')
		for (let key in this.state.user) {
			console.log('KEY', this.state.user[key])
			data.append(key, this.state.user[key])
			console.log('i am here', data)
		}
		console.log({ data })
		axios
			.patch(`${process.env.REACT_APP_API}/users/${userId}`, data)
			.then(res => {
				console.log('works until here')
				console.log({ res })
			})
			.catch(err => {
				console.log({ err })
				console.log('not working in react')
			})
	}

	render() {
		return (
			<>
				<div className="grid image">
					<div className="grid sidebar-left">
						<Sidebar />
						<div className="grid">
							<Nav />
							<wrapper className="grid center">
								<div className="grid form transparent">
									<form>
										<h2>My Profile</h2>
										<div className="group">
											<label>First Name</label>
											<input
												type="text"
												value={this.state.user.firstName}
												onChange={e => this.changeField(e, 'firstName')}
											/>
										</div>
										<div className="group">
											<label>Last Name</label>
											<input
												type="text"
												value={this.state.user.lastName}
												onChange={e => this.changeField(e, 'lastName')}
											/>
										</div>
										<div className="group">
											<label>Email</label>
											<input
												type="email"
												value={this.state.user.email}
												onChange={e => this.changeField(e, 'email')}
											/>
										</div>
										<div className="group">
											<label>Residence Country</label>
											<input
												type="text"
												value={this.state.user.residenceCountry}
												onChange={e => this.changeField(e, 'residenceCountry')}
											/>
										</div>
										<div className="group">
											<label>Profile Picture</label>
											<div className="user">
												<div
													className="avatar"
													style={{
														backgroundImage: `url(${this.state.user.avatar})`
													}}
												></div>
												<div className="name">
													<input type="file" onChange={this.changePicture} />
												</div>
											</div>
										</div>
										<div className="group">
											<button onClick={e => this.savesChanges(e)}>
												Save Changes
											</button>
										</div>
									</form>
								</div>
							</wrapper>
							<div>
								<div className="grid center">
									<button className="logout" onClick={this.logout}>
										Logout
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default Profile
