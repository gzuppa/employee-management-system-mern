import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Animate from 'rc-animate';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import { AnimatedSwitch } from 'react-router-transition';
import { Provider } from 'react-redux'

import App from './containers/App.jsx'
import reduxStore from './store/reduxStore';
import LoginPage from "./components/login/LoginPage.jsx";
import RegisterPage from "./components/login/RegisterPage.jsx";

import "./index.css";

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
const transitionMap = {
  blog: { classNames: 'fade-translate', timeout: 500 },
  albumn: { classNames: 'fade-in-out', timeout: 300 },
  account: { classNames: 'fade-translate', timeout: 550 },
};

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
      {/* <Route render={({ location }) => (
        <CSSTransitionGroup
          transitionName='fade'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <Switch key={location.key} location={location}>
            <PrivateRoute exact path="/" component={App} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </CSSTransitionGroup>
      )} /> */}
      {/* <TransitionGroup>
        <CSSTransition key={location.key}
          classNames="default-transition"
          timeout={300}
          {...transitionMap[current]}
          mountOnEnter={true}
          unmountOnExit={true}> */}


      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <PrivateRoute exact path="/" component={App} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </AnimatedSwitch>
    </Router>
  </Provider>,
  document.getElementById('contents')
)
if (module.hot) {
  module.hot.accept();
}
