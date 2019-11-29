import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Profile from './components/Profile.jsx'
import Spot from './components/Spot.jsx'
import Spots from './components/Spots.jsx'

class Routes extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/spots/:id" component={Spot} />
					<Route path="/Login" component={Login} />
					<Route path="/Profile" component={Profile} />
					<Route path="/Signup" component={Signup} />
					<Route path="/" component={Spots} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes
