import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import qs from 'query-string';
import Particles from 'react-particles-js';
import { config } from "./ParticleConfig";

import { Form, Icon, Input, Button, Checkbox } from 'antd';


import LoginForm from './forms/LoginForm.jsx';
import './Login.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classnames("wrapper blend-gradient")}>
        <Particles params={config} />
        <div className="login-form-wrapper">
          <div className="login-form">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
