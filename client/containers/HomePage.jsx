import React from 'react';
import ReactDOM from 'react-dom'
import { Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import LoginPage from "./LoginPage.jsx";
import SignUpPage from "./SignUpPage.jsx";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      date: '',
    };

    this.toggle = this.toggle.bind(this);
    console.log(this.props);
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleChange(date) {
    message.info('Selected Date: ' + date.toString());
    this.setState({ date });
  }
  render() {
    const { match, history, location } = this.props;

    return (
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}>
        <Redirect from="/" to="/login" />
        <Route path={match.url + "/login"} component={LoginPage} />
        <Route path={match.url + "/signup"} component={SignUpPage} />
      </AnimatedSwitch>
    );
  }
}


export default HomePage;
