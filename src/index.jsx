import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import Animate from 'rc-animate';

import App from './containers/App.jsx'
import reduxStore from './store/reduxStore';
import LoginPage from "./components/login/LoginPage.jsx";
import RegisterPage from "./components/login/RegisterPage.jsx";

{/* <CSSTransitionGroup
  transitionName='fade'
  transitionEnterTimeout={500}
  transitionLeaveTimeout={500}
>
  <Switch key={location.pathname} location={location}>
    <Route path="/red" render={Red} />
    <Route path="/green" render={Green} />
    <Route path="/blue" render={Blue} />
  </Switch>
</CSSTransitionGroup> */}
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
render(
  <Provider store={reduxStore}>
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={App} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('contents')
)
if (module.hot) {
  module.hot.accept();
}
