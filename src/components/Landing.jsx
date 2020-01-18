import React from 'react'
import axios from 'axios'
import '../styles/landing.css'
import '../styles/universal.css'
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
				<Sidebar />
				<div className="background centerforms grid">
					<div className="landing">
						<div>
							<div className="formheaderfont">Welcome to Happy Earth</div>
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
