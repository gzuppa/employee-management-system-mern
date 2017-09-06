import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Menu, Dropdown, Icon } from 'antd';


const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">Edit</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">Delete</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Cancel</Menu.Item>
  </Menu>
);

export default class EmployeeTableActionMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <a href="#">View</a>

        <span className="ant-divider" />
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            More <Icon type="down" />
          </a>
        </Dropdown>
      </span>
    );
  }
}
EmployeeTableActionMenu.propTypes = {
};
