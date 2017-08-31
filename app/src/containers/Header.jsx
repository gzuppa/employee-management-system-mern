import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

class AppHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      docked: true
    };

  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggleMenu}
        />
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
