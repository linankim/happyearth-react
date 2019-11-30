import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import '../styles/nav.css'

import Sidebar from './Sidebar.jsx'

class Nav extends React.Component {
	state = {
		user: {},
		menuOpen: false
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/auth`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(user => this.setState({ user: user.data }))
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<>
				<nav>
					<Sidebar />

					<div className="profile">
						<Link to="/profile" className="button">
							<div
								className="avatar"
								style={{
									backgroundImage: `url(${this.state.user.avatar})`
								}}
							></div>
							<span>{this.state.user.firstName}</span>
						</Link>
					</div>
				</nav>
			</>
		)
	}
}

export default Nav
