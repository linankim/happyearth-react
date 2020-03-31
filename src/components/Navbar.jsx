import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Navbar, Nav, FormControl, Form, Button } from 'react-bootstrap'
// import '../styles/nav.css'

class TopNav extends React.Component {
	render() {
		return (
			<>
				<Navbar>
					<Nav className="mr-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#features">About</Nav.Link>
						<Nav.Link href="#pricing">Leave a review</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="/Login">Login</Nav.Link>
						<Nav.Link href="/Signup">Create an Account</Nav.Link>
					</Nav>
				</Navbar>
			</>
		)
	}
}

export default TopNav
