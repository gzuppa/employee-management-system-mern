import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'query-string';

import { Form, Icon, Input, Button, Checkbox } from 'antd';


import LoginForm from './forms/LoginForm.jsx';
import './Login.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginForm />
    );
  }
}

export default LoginPage;
