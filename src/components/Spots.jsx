import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Card from './Card.jsx'
import Nav from './Nav.jsx'

class Spots extends React.Component {
	state = {
		spots: [],
		spotsClone: [],
		searchField: ''
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/spots`)
			.then(res => {
				this.setState({ spots: res.data })
				console.log('res data >>>>>>>>>', res.data)
			})
			.catch(error => {
				console.log({ error })
			})
	}

	render() {
		return (
			<div>
				<Nav />
				<div className="grid five large">
					{this.state.spots.map(spot => (
						<Card spot={spot} key={spot.id} />
					))}
				</div>
			</div>
		)
	}
}

export default withRouter(Spots)
