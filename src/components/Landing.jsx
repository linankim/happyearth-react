import React from 'react'
import '../styles/landing.css'

class Landing extends React.Component {
	render() {
		return (
			<div className="image landinggrid verticalcenter">
				<row1></row1>
				<row2 className="landing">
					<div>
						<h1>Welcome to Happy Earth</h1>
						<input
							type="text"
							className="search"
							placeholder="Enter City Name"
						></input>
					</div>
				</row2>
				<row3></row3>
			</div>
		)
	}
}

export default Landing
