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
	NavLink
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
					</div>
				</div>
				<div
					class="center-box"
					style={{ height: '85vh', backgroundColor: 'white' }}
				>
					<h2 class="secondary">cities</h2>{' '}
				</div>
			</>
		)
	}
}

export default Landing
