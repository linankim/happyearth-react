import React from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import '../styles/sidebar.css'

class Sidebar extends React.Component {
	state = {
		localStorage: false
	}
	logoutButton(e) {
		e.preventDefault()
		localStorage.removeItem('token')
	}

	componentDidMount() {
		if (!localStorage.getItem('token')) {
			this.setState({ localStorage: false })
		} else {
			this.setState({ localStorage: true })
		}
	}

	render() {
		return (
			<wrapper>
				{this.state.localStorage ? (
					<div className="loggedIn">
						<div className="sidebar image">
							<ul>
								<li>
									<div className="font">Happy Earth</div>
								</li>
								<li className="active">
									<Link to="/profile">Profile</Link>
								</li>
								<li className="active">
									<Link to="/create">Create</Link>
								</li>
								<li className="active">
									<Link to="/spots">Spots</Link>
								</li>
								<li className="active" onClick={e => this.logoutButton(e)}>
									<Link to="/">Logout</Link>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<div className="guest">
						<div className="sidebar image">
							<ul>
								<li>
									<div className="font">Happy Earth</div>
								</li>
								<li className="active">
									<Link to="/create">Create</Link>
								</li>
								<li className="active">
									<Link to="/spots">Spots</Link>
								</li>
								<li className="active">
									<Link to="/login">Login</Link>
								</li>
								<li className="active">
									<Link to="/signup">Sign Up</Link>
								</li>
							</ul>
						</div>
					</div>
				)}
			</wrapper>
		)
	}
}

export default Sidebar
