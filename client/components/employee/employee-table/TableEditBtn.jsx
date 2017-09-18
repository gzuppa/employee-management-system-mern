import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Icon, Tabs, message, notification, Avatar } from 'antd';
const TabPane = Tabs.TabPane;

import EditEmployeeForm from '../forms/EditEmployeeForm.jsx';
import { createEmployee } from '../../../actions/employeeActions'
import Auth from '../../../store/auth';


const TabNames = {
  "1": "General",
  "2": "Position",
  "3": "Others"
}
class ModalTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="form-header">
        <Avatar style={{ backgroundColor: '#f56a00' }} size="large">{"ML"}</Avatar>
        <span style={{ paddingLeft: "15px" }}>
          <div>Worker Account</div>
          <div>Michael</div>
        </span>
      </div >
    );
  }
}

class TableEditBtn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
    this.showModal = this.showModal.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.saveFormRef = this.saveFormRef.bind(this);
  }

  showModal(e) {
    e.preventDefault();
    this.setState({ visible: true });
    this.props.dispatch
  }
  onCancel() {
    this.setState({ visible: false });
  }
  requestHeaders() {
    const jwt = Auth.getToken();
    return { 'AUTHORIZATION': `Bearer ${jwt}` }
  }
  onCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const name = {
        firstName: values.firstName,
        lastName: values.lastName
      }
      values.name = name;

      const employee = Object.assign({}, values);
      if (values.completionDate) {
        const completionDate = new Date(values.completionDate);
        employee.completionDate = completionDate;
      }
      const headers = Object.assign({
        'Content-Type': 'application/json'
      }, this.requestHeaders());
      const request = new Request(`/api/employee/${this.props.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(employee),
      });

      fetch(request).then(response => {
        if (response.ok) {
          response.json().then(updatedEmployee => {
            // convert to MongoDB Date object type
            updatedEmployee.createdAt = new Date(updatedEmployee.createdAt);

            this.setState({ employee: updatedEmployee });
            this.setState({
              visible: false,
            });
            notification.success({
              message: 'Updated employee successfully'
            });
          });
        } else {
          response.json().then(error => {
            notification.error({
              message: `Failed to update employee: ${error.message}`
            });
          });
        }
      }).catch(err => {
        notification.error({
          message: `Failed to update employee: ${error.message}`
        });
      });
    });
  }
  saveFormRef(form) {
    this.form = form;
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <span>
        <a href="#" onClick={this.showModal}>Edit</a>
        <Modal
          visible={visible}
          title={<ModalTitle />}
          okText="Update"
          onCancel={this.onCancel}
          confirmLoading={confirmLoading}
          onOk={this.onCreate}
          closable={false}
          maskClosable={false}
        >

          <Tabs defaultActiveKey="1" onChange={this.onChange} tabPosition="left">
            <TabPane tab={TabNames["1"]} key="1"> <EditEmployeeForm ref={this.saveFormRef} /></TabPane>
            <TabPane tab={TabNames["2"]} key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab={TabNames["3"]} key="3">Content of Tab Pane 3</TabPane>
          </Tabs>

        </Modal>
      </span>
    )
  }
}
TableEditBtn.propTypes = {
  id: PropTypes.string.isRequired
};
export default withRouter(TableEditBtn);
