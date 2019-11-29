import React from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'

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
	showSettings = e => {
		e.preventDefault()
	}
	render() {
		return (
			<Menu
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
						<li onClick={() => this.closeMenu()} className="bm-burger-button">
							Settings
						</li>
					</ul>
				</div>
			</Menu>
		)
	}
}

export default Sidebar
