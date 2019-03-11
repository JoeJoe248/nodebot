import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux"; //gives us the store
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import CreateRecipe from "./components/create-recipe/CreateRecipe";
import CreateCookEvent from "./components/create-cookEvent/CreateCookEvent";
import GetRecipes from "./components/get-myRecipes/GetRecipes";
import Profiles from "./components/profiles/Profiles";
import GetCookEvents from "./components/get-myCookEvents/GetCookEvents";
import CookEventAnalytics from "./components/get-myCookEvents/CookEventAnalytics";
import Chart from "./components/get-myCookEvents/Chart";

import "./App.css"; //where we put our global css
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

//check for token
if (localStorage.jwtToken) {
  //set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //call set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //clear current profile
    store.dispatch(clearCurrentProfile());
    //redirec to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/recipes" component={GetRecipes} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/cookLog" component={GetCookEvents} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-recipe"
                  component={CreateRecipe}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-cookEvent/:recipeId?"
                  component={CreateCookEvent}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/analytics-cookEvnt"
                  component={CookEventAnalytics}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/analytics-chart" component={Chart} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
