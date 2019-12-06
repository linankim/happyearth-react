import React from 'react'
import axios from 'axios'
import '../styles/landing.css'

class Landing extends React.Component {
	state = {
		options: [],
		open: false
	}
	search = e => {
		axios
			.get(`${process.env.REACT_APP_API}/cities?name=${e.target.value}`)
			.then(res => {
				console.log({ res })
				// if length, set state options
				// else set state options = "Not found"
			})
			.catch(err => {
				console.log({ err })
				// else set state options = "Not found"
			})
		this.setState({ open: true })
	}
	selectOption = e => {
		this.props.history.push(`/spots?city=${e.target.id}`)
	}
	dropdownStatus = () => {
		if (this.state.open) {
			return 'dropdown open'
		} else {
			return 'dropdown'
		}
	}
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
							onChange={this.search}
						></input>
						{/*
							1. insert dropdown with results
							2. each option has onClick={this.selectOption}
						*/}
						<div className={this.dropdownStatus()}>
							<div className="option" onClick={this.selectOption} id="Lamai">
								Lamai
							</div>
							<div className="option" onClick={this.selectOption} id="Chaweng">
								Chaweng
							</div>
							<div className="option" onClick={this.selectOption} id="test">
								test
							</div>
						</div>
					</div>
				</row2>
				<row3></row3>
			</div>
		)
	}
}

export default Landing
