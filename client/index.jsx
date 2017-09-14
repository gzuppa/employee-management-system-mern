import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import reduxStore from './store/reduxStore';

import "./index.css";
import Auth from './store/auth';
// import Routes from "./Routes/IndexRoutes.jsx";
import { AnimatedSwitch } from 'react-router-transition';

import App from './containers/App.jsx'
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
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
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/" component={App} />
      </AnimatedSwitch>
    </Router>
  </Provider>,
  document.getElementById('contents')
)
if (module.hot) {
  module.hot.accept();
}
