import React from 'react'
import axios from 'axios'
import '../styles/login.css'

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
		}
	}

	//signup button
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

	signup = e => {
		e.preventDefault()
		console.log('>>>>>>>>>>', `${process.env.REACT_APP_API}/signup`)
		console.log('state', this.state)
		if (
			this.state.user.firstName !== '' &&
			this.state.user.lastName !== '' &&
			this.state.user.email !== '' &&
			this.state.user.password !== '' &&
			this.state.user.residenceCountry !== ''
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
						alert('email adress already in use')
					}
				})
				.catch(err => {
					console.log({ err })
					console.log('NO')
				})
		} else {
			alert('All fields must entered')
		}
	}
	render() {
		return (
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
						</div>
						<div className="group">
							<label className="loginfont">Last Name</label>
							<input
								type="text"
								value={this.state.user.lastName}
								onChange={e => this.changeField(e, 'lastName')}
							/>
						</div>
						<div className="group">
							<label className="loginfont">Country of Residence</label>
							<input
								type="text"
								value={this.state.user.residenceCountry}
								onChange={e => this.changeField(e, 'residenceCountry')}
							/>
						</div>
						<div className="group">
							<label className="loginfont">Email</label>
							<input
								type="email"
								value={this.state.user.email}
								onChange={e => this.changeField(e, 'email')}
							/>
						</div>
						<div className="group">
							<label className="loginfont">Password</label>
							<input
								type="password"
								value={this.state.user.password}
								onChange={e => this.changeField(e, 'password')}
							/>
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
		)
	}
}

export default Signup
