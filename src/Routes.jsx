import React from 'react'
import { BrowswerRouter, Switch, Route } from 'react-router-dom'
import Auth from './Components/Auth.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'

class Routes extends React.Component {
	render() {
		return (
			<BrowswerRouter>
				<Switch>
					<Route path="/Auth" component={Auth} />
					<Route path="/Login" component={Login} />
					<Route path="/Signup" component={Signup} />
				</Switch>
			</BrowswerRouter>
		)
	}
}

export default Routes
