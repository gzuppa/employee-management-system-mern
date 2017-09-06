import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Modal, Button, Icon } from 'antd';

import EditEmployeeForm from '../forms/EditEmployeeForm.jsx';


export default class TableRowActionMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      visible: false,
    }

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  showModal(e) {
    e.preventDefault();
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  render() {
    const { id } = this.props;
    const { visible, loading } = this.state;

    return (
      <div>
        <span>
          <a href="#" onClick={this.showModal}>Edit</a>
        </span>
        <Modal
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <EditEmployeeForm id={id} />
        </Modal>
      </div>
    );
  }
}
TableRowActionMenu.propTypes = {
  id: PropTypes.string.isRequired
};
