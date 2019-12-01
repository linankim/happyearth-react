import React from 'react'
import '../styles/filters.css'

class Filters extends React.Component {
	state = {}
	render() {
		return (
			<div className="filters select">
				<select>
					<option value="1">Restaurant</option>
					<option value="1">Cafe</option>
					<option value="1">Bar</option>
					<option value="1">Water Refill Station</option>
					<option value="1">Bulk Food</option>
				</select>
				<input
					onChange={e => this.props.updateSearchField(e)}
					type="text"
					className="search"
					placeholder="Search..."
				></input>
			</div>
		)
	}
}

export default Filters
