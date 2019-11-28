import React from 'react'
import axios from 'axios'
import Nav from './Nav.jsx'
import Sidebar from './Sidebar.jsx'

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
				<Nav />
				<div className="grid medium">
					<div className="grid sidebar-left">
						<Sidebar />
						<div className="content">
							<h2>My Profile</h2>
							<form>
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
									<input type="text" value={this.state.user.residenceCountry} />
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
								<button>Save Changes</button>
							</form>
							<hr />
							<button className="secondary" onClick={this.logout}>
								Logout
							</button>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default Profile
