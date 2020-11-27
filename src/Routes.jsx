import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/Profile.jsx";
import Spot from "./components/Spot.jsx";
import Create from "./components/CreateSpot/CreateType.jsx";
import CreateFoodType from "./components/CreateSpot/CreateFoodType.jsx";
import FeaturesFoodType from "./components/CreateSpot/FeaturesFoodType.jsx";

import CreateShopType from "./components/CreateSpot/CreateShopType.jsx";
import CreateMiscType from "./components/CreateSpot/CreateMiscType.jsx";
import Spots from "./components/Spots.jsx";
import Landing from "./components/Landing.jsx";

// import TopNav from "./components/Nav-Top.jsx";
// import NavSpots from "./components/Nav-Spots.jsx";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/create-food-drink-spot" component={CreateFoodType} />
          <Route path="/add-features-1" component={FeaturesFoodType} />
          <Route path="/create-shop-spot" component={CreateShopType} />

          <Route path="/create-misc-spot" component={CreateMiscType} />

          <Route path="/create-type" component={Create} />
          <Route path="/Login" component={Login} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Signup" component={Signup} />
          <Route path="/spots/:id" component={Spot} />
          <Route path="/spots" component={Spots} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
