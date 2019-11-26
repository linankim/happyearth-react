import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './components/Auth.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

class Routes extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/auth" component={Auth} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes
