import React from 'react'
import axios from 'axios'
import '../styles/login.css'
import Sidebar from './Sidebar.jsx'

class Signup extends React.Component {
	state = {
		user: {
			file: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			residenceCountry: '',
			avatar: ''
		},
		emptyField: {
			firstName: false,
			lastName: false,
			email: false,
			password: false,
			residenceCountry: false
		},
		alert: false
	}

	//change value of state for signup
	changeField = (e, field) => {
		let user = this.state.user
		user[field] = e.target.value
		this.setState({ user })
		console.log({ user })
	}
	addFile = e => {
		let user = this.state.user
		user.file = e.target.files[0]
		console.log('e.target.files[0]', e.target.files[0])
		this.setState({ user }, () => {})
	}

	//alert for empty fields in signup form
	emptyField = (e, field, f) => {
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
					if (f == 'email' && this.state.alert == true) {
						emptyField[f] = !emptyField[f]
						this.setState({ emptyField })
						this.state.alert = !this.state.alert
						this.setState({ alert })
					} else if (f == field && emptyField[f] == true) {
						emptyField[f] = !emptyField[f]
						this.setState({ emptyField })
					} else {
						console.log('no alert for field')
					}
				}
			}
		}
	}

	//signup button
	signup = e => {
		e.preventDefault()
		if (
			this.state.user.firstName !== '' &&
			this.state.user.lastName !== '' &&
			this.state.user.email !== '' &&
			this.state.user.password !== '' &&
			this.state.user.residenceCountry !== '' &&
			this.state.user.avatar !== ''
		) {
			let data = new FormData()
			console.log('i am at this point')
			for (let key in this.state.user) {
				console.log('KEY', this.state.user[key])
				data.append(key, this.state.user[key])
				console.log('i am here', data)
			}
			console.log({ data })
			axios
				.post(`${process.env.REACT_APP_API}/signup`, data)
				.then(res => {
					console.log(res)
					if (res.data.token) {
						localStorage.setItem('token', res.data.token)
						this.props.history.push('/')
					} else {
						this.state.alert = !this.state.alert
						this.setState({ alert })
					}
				})
				.catch(err => {
					console.log({ err })
				})
		} else {
			this.emptyField()
		}
	}
	render() {
		return (
			<div>
				<Sidebar />
				<div className="loginimage">
					<div className="loginform">
						<div className="loginheader">
							<div>Happy Earth</div>
						</div>
						<form>
							<div className="group">
								<label className="loginfont">First Name</label>
								<input
									type="text"
									value={this.state.user.firstName}
									onChange={e => this.changeField(e, 'firstName')}
								/>
								{this.state.emptyField.firstName ? (
									<p className="info">Please type in your first name</p>
								) : null}
							</div>
							<div className="group">
								<label className="loginfont">Last Name</label>
								<input
									type="text"
									value={this.state.user.lastName}
									onChange={e => this.changeField(e, 'lastName')}
								/>
								{this.state.emptyField.lastName ? (
									<p className="info">Please type in your last name</p>
								) : null}
							</div>
							<div className="group">
								<label className="loginfont">Country of Residence</label>
								<input
									type="text"
									value={this.state.user.residenceCountry}
									onChange={e => this.changeField(e, 'residenceCountry')}
								/>
								{this.state.emptyField.residenceCountry ? (
									<p className="info">
										Please type in your country of residence
									</p>
								) : null}
							</div>
							<div className="group">
								<label className="loginfont">Email</label>
								<input
									type="email"
									value={this.state.user.email}
									onChange={e => this.changeField(e, 'email')}
								/>
								{this.state.emptyField.email ? (
									<p className="info">Please type in your email</p>
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
									<p className="info">Please type in your password</p>
								) : null}
							</div>
							<div className="group">
								<label className="loginfont">Profile Picture</label>
								<input type="file" onChange={this.addFile} />
							</div>
							<button className="primary" onClick={this.signup}>
								Signup
							</button>
						</form>
						<p className="loginfont">
							Already have an account? <a href="/Login">Login</a>
						</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Signup
