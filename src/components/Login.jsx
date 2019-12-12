import React from 'react'
import axios from 'axios'
import '../styles/login.css'
import Sidebar from './Sidebar.jsx'

class Login extends React.Component {
	state = {
		user: {
			email: '',
			password: ''
		}
	}

	// Login button
	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({ user })
		console.log({ user })
	}

	login = e => {
		e.preventDefault()
		if (this.state.user.email !== '' && this.state.user.password !== '') {
			axios
				.post(`${process.env.REACT_APP_API}/login`, this.state.user)
				.then(res => {
					this.setState(this.state.user)
					if (!res.data.token) {
						console.log('Problems with login')
					} else {
						localStorage.setItem('token', res.data.token)
						this.props.history.push('/create')
					}
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			alert('all fields are required')
		}
	}

	render() {
		return (
			<div>
				<Sidebar />
				<div className="loginimage">
					<div className="loginform">
						<div>
							<div className="loginheader">
								<div>Happy Earth</div>
							</div>
							<form>
								<div className="group">
									<label className="loginfont">Email</label>
									<input
										type="email"
										value={this.state.email}
										onChange={e => this.changeField(e, 'email')}
									/>
								</div>
								<div className="group">
									<label className="loginfont">Password</label>
									<input
										type="password"
										value={this.state.password}
										onChange={e => this.changeField(e, 'password')}
									/>
								</div>
								<button className="primary" onClick={this.login}>
									Login
								</button>
							</form>
							<p className="footer">
								<a className="loginfont" href="/Signup">
									Signup
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login
