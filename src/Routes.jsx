import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Profile from './components/Profile.jsx'
import Spot from './components/Spot.jsx'
import Create from './components/Create.jsx'
import Spots from './components/Spots.jsx'
import Landing from './components/Landing.jsx'

class Routes extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/create" component={Create} />
					<Route path="/Login" component={Login} />
					<Route path="/Profile" component={Profile} />
					<Route path="/Signup" component={Signup} />

					<Route path="/spots/:id" component={Spot} />
					<Route path="/spots" component={Spots} />
					<Route path="/" component={Landing} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes
