import React from 'react'
import axios from 'axios'
import '../styles/landing.css'
// import '../styles/universal.css'
import TopNav from './Navbar.jsx'
import Spots from './Spots.jsx'
import { FormControl, Form, Button, InputGroup } from 'react-bootstrap'

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
				<TopNav />
				<div className="bg-img">
					<div className="center-img ">
						<div
							style={{
								marginTop: '0px'
							}}
						>
							<h1
								style={{
									fontFamily: 'Pacifico',
									color: 'white',
									fontSize: '150px',
									marginBottom: '50px'
								}}
							>
								{' '}
								happy earth
							</h1>
						</div>
						<h2
							style={{
								fontFamily: 'EB Garamond',
								fontSize: '35px',
								lineHeight: '200%',
								letterSpacing: '8px'
							}}
						>
							Crowd-sourced reviews of your city's most eco-friendly and
							sustainable restaurants, shops and cafes
						</h2>
						<div className="center-search">
							<i className="fas fa-search-location fa-2x searchIcon"></i>
							<input
								className="center-searchBox"
								type="search"
								placeholder="Search for a city"
								onChange={this.search}
								style={{
									boxShadow: 'none',
									fontFamily: 'EB Garamond',
									fontSize: '22px',
									letterSpacing: '3px',
									color: 'black',
									padding: '5px'
								}}
							></input>{' '}
						</div>
					</div>
				</div>

				{/*
													1. insert dropdown with results
													2. each option has onClick={this.selectOption}
												*/}
				<div className={this.dropdownStatus()}>
					{this.state.options.map(option => {
						return (
							<div className="option" onClick={this.selectOption} id={option}>
								{option}
							</div>
						)
					})}
				</div>

				<div className="bg-img2">
					<div className="center-img "></div>
				</div>
			</>
		)
	}
}

export default Landing
