import React from 'react'
import axios from 'axios'
import '../styles/login.css'

import { Button, Modal, Navbar, Nav, NavLink } from 'react-bootstrap'

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
			<>
				<div className="login-grid">
					<div
						className="login-image"
						style={{ width: '44vw', opacity: '0.9' }}
					>
						<h2
							class="secondary"
							style={{
								fontFamily: 'Pacifico',
								color: 'white'
							}}
						>
							Don't have an account?
							<h2
								class="secondary"
								style={{
									color: 'white',
									fontSize: '25px'
								}}
							>
								{
									' To post reviews and save your favorite spots on happy earth, please create an account.  '
								}
							</h2>
						</h2>

						<a className="link-button" href="/Signup">
							Signup
						</a>
					</div>
					<div>
						<form className="form-container">
							<h2
								class="secondary"
								style={{
									color: 'black',
									fontSize: '25px'
								}}
							>
								welcome back to{' '}
							</h2>
							<h1
								style={{
									fontFamily: 'Pacifico',
									color: 'black',
									fontSize: '60px',
									letterSpacing: '3px'
								}}
							>
								happy earth
							</h1>
							<h2
								class="secondary"
								style={{
									color: 'black'
								}}
							>
								Please log in using your details
							</h2>
							<div className="input-container ">
								<i className="fas fa-at input-icon"></i>
								<input
									className="input-box"
									type="email"
									placeholder="Email"
									value={this.state.user.email}
									onChange={e => this.changeField(e, 'email')}
								/>
								{this.state.emptyField.email ? (
									<p>Please type in your email</p>
								) : null}
							</div>
							<div className="input-container">
								{/*pwd*/}
								<i className="fas fa-unlock input-icon"></i>
								<input
									className="input-box"
									type="password"
									placeholder="Password"
									value={this.state.user.password}
									onChange={e => this.changeField(e, 'password')}
								/>
								{this.state.emptyField.password ? (
									<p>Please type in your password</p>
								) : null}
								{this.state.alert ? (
									<p>Either email or password incorrect</p>
								) : null}
							</div>
							<div>
								<Button
									className="button-login"
									variant="outline-dark"
									onClick={this.login}
								>
									Login
								</Button>
							</div>
						</form>
					</div>
				</div>
			</>
		)
	}
}

export default Login
