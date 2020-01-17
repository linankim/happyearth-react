import React from 'react'
import axios from 'axios'
import '../styles/login.css'
import '../styles/universal.css'
import Sidebar from './Sidebar.jsx'

class Login extends React.Component {
	state = {
		user: {
			email: '',
			password: ''
		},
		emptyField: {
			email: false,
			password: false
		},
		alert: false
	}

	// change value of state for login
	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({ user })
		this.emptyField()
		console.log({ user })
	}

	//alert for empty fields in login form
	emptyField = (field, f) => {
		let user = this.state.user
		let emptyField = this.state.emptyField
		for (field in user) {
			if (`${user[field]}` == '') {
				for (f in emptyField) {
					if (f == field && emptyField[f] == false) {
						emptyField[f] = !emptyField[f]
						this.setState(emptyField)
					} else {
						console.log('user[field] in loop has input')
					}
				}
			} else {
				for (f in emptyField) {
					if (f == field && emptyField[f] == true) {
						emptyField[f] = !emptyField[f]
						this.setState(emptyField)
					} else {
						console.log('no alert for field')
					}
				}
			}
		}
	}

	//login button
	login = e => {
		e.preventDefault()
		if (this.state.user.email !== '' && this.state.user.password !== '') {
			axios
				.post(`${process.env.REACT_APP_API}/login`, this.state.user)
				.then(res => {
					this.setState(this.state.user)
					if (!res.data.token) {
						this.state.alert = !this.state.alert
						this.setState({ alert: this.state.alert })
					} else {
						localStorage.setItem('token', res.data.token)
						if (sessionStorage != undefined) {
							let path = sessionStorage.getItem('path')
							this.props.history.push(`${path}`)
							sessionStorage.removeItem('path')
						} else {
							this.props.history.push('/spots')
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			this.emptyField()
		}
	}

	render() {
		return (
			<div>
				<Sidebar />
				<div className="background  centerforms grid">
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
										value={this.state.user.email}
										onChange={e => this.changeField(e, 'email')}
									/>
									{this.state.emptyField.email ? (
										<p className="logininfontalert">
											Please type in your email
										</p>
									) : null}
								</div>
								<div className="group">
									<label className="loginfont">Password</label>
									<input
										type="password"
										value={this.state.user.password}
										onChange={e => this.changeField(e, 'password')}
									/>
									{this.state.emptyField.password ? (
										<p className="logininfontalert">
											Please type in your password
										</p>
									) : null}
								</div>
								{this.state.alert ? (
									<p className="logininfontalert">
										Either email or password incorrect
									</p>
								) : null}
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
