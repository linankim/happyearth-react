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
	Card
} from 'react-bootstrap'

class Landing extends React.Component {
	render() {
		return (
			<>
				<div className="bg-img ">
					<div className="hero-text ">
						<div
							style={{
								marginBottom: '8em'
							}}
						></div>
						<div
							style={{
								marginTop: '0px'
							}}
						>
							<h1
								style={{
									fontFamily: 'Poppins',
									color: 'white',
									fontSize: '130px',
									letterSpacing: '3px',
									marginBottom: '50px'
								}}
							>
								{' happy earth'}
							</h1>
						</div>

						<h2 class="secondary">
							Crowd-sourced reviews of your city's most eco-friendly and
							sustainable restaurants, shops and cafes
						</h2>

						<Button variant="dark">Browse Spots</Button>
						<Button class="button" variant="outline-dark">
							Review a Spot
						</Button>
						<Form>
							<FormControl
								type="text"
								placeholder="Search"
								className="searchbar"
							/>
							<Button variant="outline-success">Search</Button>
						</Form>
					</div>
				</div>
				<div style={{ height: '85vh', backgroundColor: 'white' }}>
					<div class="center-box">
						<div className="grid two">
							<h2 class="secondary">
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
