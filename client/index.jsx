import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import reduxStore from './store/reduxStore';

import "./index.css";
// import Routes from "./Routes/IndexRoutes.jsx";
import { AnimatedSwitch } from 'react-router-transition';

import App from './containers/App.jsx'
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";

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
      {/* <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      > */}

      <Switch>
        {/* <PrivateRoute path="/" component={App} /> */}
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
      </Switch>
      {/* </AnimatedSwitch> */}
    </Router>
  </Provider>,
  document.getElementById('contents')
)
// if (module.hot) {
//   module.hot.accept();
// }
