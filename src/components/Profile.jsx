import React from 'react'
import axios from 'axios'
import Nav from './Nav.jsx'
import Sidebar from './Sidebar.jsx'
import '../styles/profile.css'

class Profile extends React.Component {
	state = {
		user: {}
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

	logout = e => {
		e.preventDefault()
		localStorage.removeItem('token')
		this.props.history.push('/login')
	}

	render() {
		return (
			<>
				<div className="grid image">
					<div className="grid sidebar-left">
						<Sidebar />
						<div className="grid">
							<wrapper className="grid center">
								<div className="grid form transparent">
									<form>
										<h2>My Profile</h2>
										<div className="group">
											<label>First Name</label>
											<input type="text" value={this.state.user.firstName} />
										</div>
										<div className="group">
											<label>Last Name</label>
											<input type="text" value={this.state.user.lastName} />
										</div>
										<div className="group">
											<label>Email</label>
											<input type="email" value={this.state.user.email} />
										</div>
										<div className="group">
											<label>Residence Country</label>
											<input
												type="text"
												value={this.state.user.residenceCountry}
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
													<input type="file" />
												</div>
											</div>
										</div>
										<div className="group">
											<button>Save Changes</button>
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
