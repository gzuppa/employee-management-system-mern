// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEmployees } from '../../../actions/employeeActions'

import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.firstName} ${name.lastName}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'CreatedAt',
  render: createdAt => new Date(createdAt).toDateString(),
  dataIndex: 'createdAt',
}];


class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'created',
      selected: [],
      pageSize: 10,
      pageNum: 1,
      pagination: {},
    };

    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentWillReceiveProps(nextPros) {
    const newSelected = this.state.selected.filter(function (id) {
      return nextPros.deletedEmployees.indexOf(id) === -1;
    });
    this.setState({ selected: newSelected });
  }
  componentDidMount() {
    this.props.dispatch(fetchEmployees(this.props.location, this.state.pageSize));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search != this.props.location.search
      || prevProps.deletedEmployees.length != this.props.deletedEmployees.length) {
      const { employees } = this.props;
      this.props.dispatch(fetchEmployees(this.props.location, this.state.pageSize));
    }
  }
  handleTableChange(pagination, filters, sorter) {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  render() {
    const { classes, isFetching, employees, totalCount } = this.props;
    const { order, orderBy, selected } = this.state;


    return (
      <Table columns={columns}
        rowKey={record => record._id}
        dataSource={employees}
        pagination={{ total: totalCount }}
        loading={this.props.isFetching}
        onChange={this.handleTableChange}
      />
    );
  }
}

EmployeeTable.propTypes = {
  location: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  const { employees, totalCount, isFetching, lastUpdated, deletedEmployees, pageSize, pageNum, offset } = state.employeeState;
  return {
    employees: employees,
    totalCount: totalCount,
    isFetching: isFetching,
    lastUpdated: lastUpdated,
    deletedEmployees: deletedEmployees,
    pageNum: pageNum,
    offset: offset
  }
};

export default withRouter(connect(mapStateToProps)(EmployeeTable));
