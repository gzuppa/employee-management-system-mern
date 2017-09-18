import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Icon, Tabs, message, notification, Avatar } from 'antd';
const TabPane = Tabs.TabPane;

import EditEmployeeForm from '../forms/EditEmployeeForm.jsx';
import { updateEmployee } from '../../../actions/employeeActions'
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedEmployee && this.props.id == nextProps.updatedEmployee._id) {
      this.setState({ visible: false });
    }
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
      delete values.firstName;
      delete values.lastName;
      values.name = name;
      values._id = this.props.id;

      const employee = Object.assign({}, values);
      if (values.completionDate) {
        const completionDate = new Date(values.completionDate);
        employee.completionDate = completionDate;
      }
      this.props.dispatch(updateEmployee(employee, this.props.history));
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
  id: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { updatedEmployee, error, isFetching } = state.employeeState;
  return {
    updatedEmployee: updatedEmployee,
    isFetching: isFetching,
    error: error,
  }
};
export default withRouter(connect(mapStateToProps)(TableEditBtn));
