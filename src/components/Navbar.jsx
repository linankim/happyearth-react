import React from 'react'
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom'
import {
	Navbar,
	Nav,
	NavLink,
	FormControl,
	Form,
	Button
} from 'react-bootstrap'
// import '../styles/nav.css'

class TopNav extends React.Component {
	render() {
		return (
			<>
				<Nav className=" bg-img-nav topnav" navbar>
					<NavLink href="/login">Login</NavLink>
					<NavLink href="/signup">Create an Account</NavLink>
				</Nav>
			</>
		)
	}
}

export default TopNav
