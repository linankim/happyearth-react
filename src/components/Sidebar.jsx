import React from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends React.Component {
	render() {
		return (
			<div className="sidebar">
				<ul>
					<li className="active">
						<Link to="/profile">Profile</Link>
					</li>
				</ul>
			</div>
		)
	}
}

export default Sidebar
