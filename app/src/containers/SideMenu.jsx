import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
import "./SideMenu.css";


class SideMenu extends Component {

  constructor(props) {
    super(props);
  
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.history.push(`${item.key}`);
  }

  render() {
    const { history ,location} = this.props;

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className="logo">
          <img src="/images/michael_icon.png"></img>
          {this.props.collapsed ? "" : <span>{"ANTD ADMIN"}</span>}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} onClick={item => this.handleClick(item)}>
          <Menu.Item key="/dashboard">
            <Icon type="user" />
            <span>Dashboard</span>
          </Menu.Item>
          {/* <Menu.Item key="/notice">
            <Icon type="video-camera" />
            <span>Notice</span>
          </Menu.Item>
          <Menu.Item key="/department">
            <Icon type="upload" />
            <span>Department</span>
          </Menu.Item> */}
          <Menu.Item key="/employee">
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
