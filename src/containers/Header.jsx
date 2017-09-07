import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Menu, Icon, Badge } from 'antd';
const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import "./Header.css";

const AdminMenu = (props) => {
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={['2']}
      className="header-item"
    >
      <Menu.Item key="mail">
        <Badge count={5}>
          <Icon type="mail" />
        </Badge>
      </Menu.Item>
      <Menu.Item key="user">
        <Icon type="user" />{"guest"}
      </Menu.Item>

    </Menu>
  );
}



class AppHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger header-item"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggleMenu}
        />
        <span className="header-title">{"Employee Management"}</span>
        <AdminMenu />
      </Header>
    );
  }
}


AppHeader.prototypes = {
  toggleMenu: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
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

export default withRouter(connect(mapStateToProps)(AppHeader));
