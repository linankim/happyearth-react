import React from 'react'
import '../styles/popup.css'
import '../styles/grid.css'

class Popup extends React.Component {
	state = {
		showPopup: this.props.showPopup
	}

	//delete Profile

	//close Popup
	closePopup = e => {
		e.preventDefault()
		let showPopup = this.state.showPopup
		showPopup = !showPopup
		this.setState({ showPopup })
	}
	render() {
		return (
			<div className="popup">
				<div className="popup\_inner">
					<h3>Are you sure you want to delete your Profile?</h3>
					<button onClick={e => this.props.deleteProfile(e)}> Delete</button>
					<button onClick={e => this.closePopup(e)}> Cancel</button>
				</div>
			</div>
		)
	}
}

export default Popup
