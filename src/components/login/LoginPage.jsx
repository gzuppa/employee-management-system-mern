import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import qs from 'query-string';
import Particles from 'react-particles-js';
import { random } from "./ParticleConfig";


import SignUpForm from './forms/SignUpForm.jsx';
import LoginForm from './forms/LoginForm.jsx';

import './Login.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <div className={classnames("wrapper blend-gradient")}>
        {/* <Particles params={random} /> */}
        <div className="login-form-wrapper">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
