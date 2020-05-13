import React from 'react'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'
import {
	Navbar,
	Nav,
	NavLink,
	FormControl,
	NavDropdown,
	Form,
	Button
} from 'react-bootstrap'
// import '../styles/nav.css'

class TopNav extends React.Component {
	render() {
		return (
			<>
				<Navbar bg="light" expand="lg">
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Nav className="mr-auto">
							<Nav.Link href="/login">Login</Nav.Link>
						</Nav>

						<Button variant="outline-success">Signup</Button>
					</Navbar.Collapse>
				</Navbar>
			</>
		)
	}
}

export default TopNav
