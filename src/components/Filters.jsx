import React from 'react'
import Spots from './Spots.jsx'

class Filters extends React.Component {
	state = {
		searchField: this.props.searchField
	}
	render() {
		return (
			<div className="filters">
				<select>
					<option value="1">Restaurant</option>
					<option value="1">Cafe</option>
					<option value="1">Bar</option>
					<option value="1">Water Refill Station</option>
					<option value="1">Bulk Food</option>
				</select>
				<input
					onChange={e =>
						this.props.updateSearchField(e, this.state.searchField)
					}
					value={this.state.searchField}
					type="text"
					className="search"
					placeholder="Search..."
				></input>
			</div>
		)
	}
}

export default Filters
