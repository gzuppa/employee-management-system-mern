// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEmployees, fetchEmployeesIfNeeded } from '../../../actions/employeeActions'

import { Table, Button } from 'antd';

import EnhancedTableHead from './EnhancedTableHead.jsx'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: (name, record) => <Link to={`/employee/${record._id}`}>{name.firstName} {name.lastName}</Link>,
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
    console.log('componentDidMount');
    this.props.dispatch(fetchEmployees(this.props.location, this.state.pageSize));
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    // if (prevProps.location.search != this.props.location.search
    //   || prevProps.deletedEmployees.length != this.props.deletedEmployees.length) {
    //   this.props.dispatch(fetchEmployees(this.props.location, this.state.pageSize));
    // }
  }
  handleTableChange(pagination, filters, sorter) {
    const { total, current, pageSize } = pagination
    // console.log('pagination', pagination);
    console.log('filters', filters);
    console.log('sorter', sorter);
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    // this.setState({
    //   pagination: pager,
    // });

    // console.log('location', this.props.location.search);
    const { search } = this.props.location;
    const query = Object.assign(qs.parse(search), { _page: current });
    this.props.history.push({ pathname: this.props.location.pathname, search: qs.stringify(query) })
    // // this.fetch({
    //   results: pagination.pageSize,
    //   page: pagination.current,
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   ...filters,
    // });
  }

  render() {
    const { classes, isFetching, employees, totalCount, pageNum } = this.props;
    const { order, orderBy, selected } = this.state;

    return (
      <div>
        {/* <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button> */}
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
