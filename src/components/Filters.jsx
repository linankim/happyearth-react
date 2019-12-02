import React from 'react'
import '../styles/filters.css'

class Filters extends React.Component {
	state = {}
	render() {
		return (
			<div className="filters select">
				<select onChange={e => this.props.filterByType(e)}>
					<option value="All">All</option>
					<option value="Restaurant">Restaurant</option>
					<option value="Cafe">Cafe</option>
					<option value="Bar">Bar</option>
					<option value="Water Refill Station">Water Refill Station</option>
					<option value="Bulk Food">Bulk Food</option>
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
