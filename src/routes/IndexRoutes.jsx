import React from 'react';
import { Redirect, Link, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import App from '../containers/App.jsx'
import LoginPage from "../containers/LoginPage.jsx";
import SignUpPage from "../containers/SignUpPage.jsx";


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)
const IndexRoutes = (props) => (
  <AnimatedSwitch
    atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
    className="switch-wrapper"
  >
    <PrivateRoute path="/" component={App} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/signup" component={SignUpPage} />
  </AnimatedSwitch>
)
export default IndexRoutes;
