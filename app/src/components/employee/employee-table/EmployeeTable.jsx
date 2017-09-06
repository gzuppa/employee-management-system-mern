import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEmployees, fetchEmployeesIfNeeded } from '../../../actions/employeeActions'

import { Table, Button } from 'antd';

import EnhancedTableHead from './EnhancedTableHead.jsx'
import EmployeeTableActionMenu from './EmployeeTableActionMenu.jsx'


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: (name, record) => `${name.firstName} ${name.lastName}`,
  width: 150,
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: 150,
},
{
  title: 'Department',
  dataIndex: 'department',
},
{
  title: 'Title',
  dataIndex: 'title',
},
{
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'CreatedAt',
  render: createdAt => new Date(createdAt).toDateString(),
  dataIndex: 'createdAt',
},
{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <EmployeeTableActionMenu />
  ),
}];


class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'created',
      pageSize: 10,
      pageNum: 1,
      pagination: {},
      filteredInfo: null,
      sortedInfo: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.props.dispatch(fetchEmployees(this.props.location, this.state.pageSize));
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    if (prevProps.location.search != this.props.location.search) {
      this.props.dispatch(fetchEmployees(this.props.location, this.state.pageSize));
    }
  }
  handleChange(pagination, filters, sorter) {
    const { total, current, pageSize } = pagination

    // this.setState({
    //   filteredInfo: filters,
    //   sortedInfo: sorter,
    // });
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
    const { search } = this.props.location;
    console.log('search', search);
    const query = Object.assign(qs.parse(search), { _page: current });
    // this.props.history.push({ pathname: this.props.location.pathname, search: qs.stringify(query) });
    // // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters,
    // });
  }
  clearFilters() {
    this.setState({ filteredInfo: null });
  }
  clearAll() {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }
  setAgeSort() {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }

  render() {
    const { classes, isFetching, employees, totalCount, pageNum } = this.props;
    const { order, orderBy, selected } = this.state;

    return (
      <div>
        <EnhancedTableHead />
        <Table
          columns={columns}
          rowKey={record => record._id}
          dataSource={employees}
          pagination={{ total: totalCount, current: pageNum, }}
          loading={this.props.isFetching}
          onChange={this.handleTableChange}
        />
      </div>
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
