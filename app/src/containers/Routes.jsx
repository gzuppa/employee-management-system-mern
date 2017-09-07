import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Switch, Route } from 'react-router'
import { Breadcrumb, Alert } from 'antd';

import './Route.css';

import LoginPage from '../components/login/LoginPage.jsx';

// import IssueList from './IssueList.jsx';
// import DeparmentPage from '../components/department/DepartmentPage.jsx';
// import DeparmentEdit from '../components/department/DepartmentEdit.jsx';

import EmployeePage from '../components/employee/EmployeePage.jsx';
import EmployeeEdit from '../components/employee/EmployeeEdit.jsx';

// import RelationPage from '../components/relation/RelationPage.jsx';

// import IssueReport from '../components/dashboard/IssueReport.jsx';

// import SchedulePage from '../components/schedule/SchedulePage.jsx';
import DashboardPage from '../components/dashboard/DashboardPage.jsx';


const NoMatch = () => <p>Page Not Found</p>;


const Routes = (props) => (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />
    <Route path="/dashboard" component={DashboardPage} />

    <Route exact path="/employee" component={EmployeePage} />
    <Route exact path="/employee/:id" component={EmployeeEdit} />

    <Route component={NoMatch} />
  </Switch>
)
export default Routes;
