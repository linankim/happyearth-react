import React from 'react'
import axios from 'axios'

// localStorage.setItem('token', t)
// localStoage.getItem('token')
class Signup extends React.Component {
	state = {
		user: {
			name: '',
			email: '',
			password: '',
			location: '',
			avatar: ''
		}
	}

	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({ user })
	}

	// addFile = e => {
	// 	let user = this.state.user
	// 	user.file = e.target.files[0]
	// 	this.setState({ user })
	// }

	render() {
		return (
			<div className="grid center middle tall image">
				<div className="card small">
					<div className="content">
						<div
							className="logo"
							style={{ backgroundImage: `url('images/logo-airbnb.png')` }}
						></div>
						<form>
							<div className="group">
								<label>Name</label>
								<input
									type="text"
									value={this.state.user.name}
									onChange={e => this.changeField(e, 'name')}
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
								<label>Password</label>
								<input
									type="password"
									value={this.state.user.password}
									onChange={e => this.changeField(e, 'password')}
								/>
							</div>
							<div className="group">
								<label>Location</label>
								<input
									type="text"
									value={this.state.user.location}
									onChange={e => this.changeField(e, 'location')}
								/>
							</div>
							<div className="group">
								<label>Profile Picture</label>
								<input type="file" onChange={this.addFile} />
							</div>
							<button className="primary" type="submit" onClick={this.signup}>
								Signup
							</button>
						</form>
						<p className="footer">
							Already have an account? <a href="/Login">Login</a>
						</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Signup
