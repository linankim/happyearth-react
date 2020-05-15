import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import '../styles/landing.css'
// import '../styles/universal.css'
import TopNav from './Navbar.jsx'
import Spots from './Spots.jsx'
import {
	FormControl,
	Form,
	Button,
	InputGroup,
	Navbar,
	Nav,
	NavLink,
	Card,
	Dropdown,
	DropdownButton,
	ButtonGroup,
	Alert,
	Modal
} from 'react-bootstrap'

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

	UserSigninModal = props => {
		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Modal heading
					</Modal.Title>
				</Modal.Header>
			</Modal>
		)
	}

	componentWillMount() {
		console.log('this.state.options', this.state.options)
	}
	render() {
		return (
			<>
				{/*	<Alert variant="warning ">
					{'TRAVEL NOTICE: '}
					<Alert.Link href="#">COVID-19 Important Info</Alert.Link>
				</Alert> */}
				<Navbar className="justify-content-end">
					<Nav.Item>
						<Button className="button" variant="outline-dark">
							Browse Spots
						</Button>
					</Nav.Item>
					<Nav.Item>
						<Button className="button" variant="outline-dark">
							+ Post a Review
						</Button>
						<Button className="sign-in" variant="dark">
							Log In
						</Button>
					</Nav.Item>
				</Navbar>
				<div className="bg-img ">
					<div className="hero-text ">
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
									letterSpacing: '3px',
									marginBottom: '50px'
								}}
							>
								{' happy earth'}
							</h1>
						</div>
						<h2 class="secondary">
							Crowd-sourced reviews of your city's most eco-friendly and
							sustainable restaurants, shops and cafes.
						</h2>
						{/*search starts here<Button variant="dark">Browse Spots</Button>
						<Button class="button" variant="outline-dark">
							Review a Spot
						</Button>*/}
						{/*search starts here*/}
						<div className="center-search">
							<i className="fas fa-search-location searchIcon"></i>
							<input
								className="center-searchBox"
								type="search"
								placeholder="Search by city"
								onChange={this.search}
								style={{
									boxShadow: 'none',
									fontFamily: 'Jost',
									fontSize: '22px',
									letterSpacing: '3px',
									color: 'black',
									padding: '5px'
								}}
							></input>
						</div>

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
				<div style={{ height: '85vh', backgroundColor: 'white' }}>
					<div className="center-box">
						<div className="grid five">
							<h2 className="secondary">
								Browse Happy Earth's Top Reviewed Cities:
							</h2>{' '}
							<Card style={{ width: '18rem' }}>
								<Card.Img variant="top" src="holder.js/100px180" />
								<Card.Body>
									<Card.Title>City Name</Card.Title>
									<Card.Text>
										Some quick example text to build on the card title and make
										up the bulk of the card's content.
									</Card.Text>
									<Button variant="primary">See $cityname Spots</Button>
								</Card.Body>
							</Card>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default Landing
