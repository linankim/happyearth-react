import React from 'react'
import axios from 'axios'

class Signup extends React.Component {
	state = {
		user: {
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

	signup = e => {
		e.preventDefault()
		console.log('>>>>>>>>>>', `${process.env.REACT_APP_API}/signup`)
		if (
			this.state.user.firstName !== '' &&
			this.state.user.lastName !== '' &&
			this.state.user.email !== '' &&
			this.state.user.password !== '' &&
			this.state.user.residenceCountry !== ''
		) {
			axios
				.post(`${process.env.REACT_APP_API}/signup`, this.state.user)
				.then(res => {
					console.log(res)
					localStorage.setItem('token', res.data.token)
					this.props.history.push('/')
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
			<div className="grid center middle tall image">
				<div className="card small">
					<div className="content">
						<div className="logo" style={{ backgroundImage: `` }}></div>
						<h1>Happy Earth</h1>
						<form>
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
								<label>Country of Residence</label>
								<input
									type="text"
									value={this.state.user.residenceCountry}
									onChange={e => this.changeField(e, 'residenceCountry')}
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
								<label>Profile Picture</label>
								<input type="file" onChange={this.addFile} />
							</div>
							<button className="primary" onClick={this.signup}>
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
