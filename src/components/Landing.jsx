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
					<div className="center-img ">
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

						<h2
							style={{
								fontFamily: 'Open Sans',
								color: 'white',
								fontSize: '35px',
								lineHeight: '200%',
								letterSpacing: '7px'
							}}
						>
							Crowd-sourced reviews of your city's most eco-friendly and
							sustainable restaurants, shops and cafes
						</h2>
					</div>
				</div>
			</>
		)
	}
}

export default Landing
