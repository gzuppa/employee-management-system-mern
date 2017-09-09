
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import classnames from 'classnames';
import qs from 'query-string';
import Particles from 'react-particles-js';
import { config } from "./ParticleConfig";

import { Card } from 'antd';


import SignUpForm from './forms/SignUpForm.jsx';

import './Login.css';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
  }
  signup() {

  }
  render() {
    return (
      <div className={classnames("wrapper blend-gradient")}>
        {/* <Particles params={config} /> */}
        <div className="login-form-wrapper">
          <Card title="Regitster" style={{width:"600px"}}>
            <SignUpForm />
          </Card>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
