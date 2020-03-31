import React from 'react'
import axios from 'axios'
import '../styles/landing.css'
// import '../styles/universal.css'
import Sidebar from './Sidebar.jsx'

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
				if (res.data[0]) {
					console.log('res.data', res.data)
					this.setState({ options: res.data })
				} else {
					this.setState({
						options: ['Not available']
					})
				}
			})
			.catch(err => {
				console.log('errorr >>>', { err })
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

	componentWillMount() {
		console.log('this.state.options', this.state.options)
	}
	render() {
		return (
			<>
				<div className="bg-img">
					<div className="center-img ">
						<div>
							<h1 style={{ fontSize: '45px' }}> happy earth</h1>
							<h3>
								Crowdsourced reviews of your city's most eco-friendly and
								sustainable restaurants, shops and cafes
							</h3>
							<input
								className="ctnr-search"
								type="text"
								className="search"
								placeholder="search by city"
								onChange={this.search}
							></input>
							<h3>
								Read Reviews, Leave Reviews and read about your favorite local
								spots
							</h3>
							{/*
							1. insert dropdown with results
							2. each option has onClick={this.selectOption}
						*/}
							<div className={this.dropdownStatus()}>
								{this.state.options.map(option => {
									return (
										<div
											className="option"
											onClick={this.selectOption}
											id={option}
										>
											{option}
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default Landing
