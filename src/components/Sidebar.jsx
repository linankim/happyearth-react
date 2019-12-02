import React from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import '../styles/burger.css'
import '../styles/sidebar.css'

class Sidebar extends React.Component {
	state = {
		menuOpen: false
	}
	handleStateChange(state) {
		this.setState({ menuOpen: state.isOpen })
	}
	closeMenu() {
		this.setState({ menuOpen: false })
	}
	logoutButton(e) {
		e.preventDefault()
		localStorage.removeItem('token')
	}

	render() {
		return (
			<Menu
				noOverlay
				isOpen={this.state.menuOpen}
				onStateChange={state => this.handleStateChange(state)}
			>
				<div className="sidebar">
					<ul>
						<li onClick={() => this.closeMenu()} className="active">
							<Link to="/profile">Profile</Link>
						</li>
						<li onClick={() => this.closeMenu()} className="active">
							<Link to="/create">Create</Link>
						</li>
						<li onClick={e => this.logoutButton(e)} className="active">
							<Link to="/">Logout</Link>
						</li>
					</ul>
				</div>
			</Menu>
		)
	}
}

export default Sidebar
