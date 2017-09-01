import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../actions/notificationActions';

import { message } from 'antd';

const Success = (props) => {
  message.success(props.msg);
};

class Notification extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const open = this.props.notification.message ? true : false;
    const message = this.props.notification.message ? this.props.notification.message : "";

    return (
      <Success msg={message} />
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}


export default connect(
  mapStateToProps
)(Notification);
