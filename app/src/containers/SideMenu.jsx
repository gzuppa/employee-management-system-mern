import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;


class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.history.push({
      pathname: item.key
    });
  }

  render() {
    const { classes, history, isDocked } = this.props;

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={item => this.handleClick(item)}>
          <Menu.Item key="dashboard">
            <Icon type="user" />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="notice">
            <Icon type="video-camera" />
            <span>Notice</span>
          </Menu.Item>
          <Menu.Item key="department">
            <Icon type="upload" />
            <span>Department</span>
          </Menu.Item>
          <Menu.Item key="employee">
            <Icon type="video-camera" />
            <span>Employees</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

SideMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isDocked: PropTypes.bool.isRequired,
  adjustWidth: PropTypes.string.isRequired,
}
const mapStateToProps = (state, ownProps) => {
  const interfaceState = state.interfaceState;
  return {
    adjustWidth: interfaceState.adjustWidth,
    isDocked: interfaceState.isDocked,
  }
};

export default withRouter(connect(mapStateToProps)(SideMenu));
