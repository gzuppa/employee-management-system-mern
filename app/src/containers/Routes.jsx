import React from 'react';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';

import App from './App.jsx';
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

function itemRender(route, params, routes, paths) {
  // console.log('route', route);
  // console.log('params', params);
  // const last = routes.indexOf(route) === routes.length - 1;

  // return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  return <Link to="/about">About</Link>;
}

const Routes = (props) => (

  <Switch>
    <Redirect exact from="/" to="/employee" />
    <Route exact path="/dashboard" component={withRouter(DashboardPage)} />

    <Route exact path="/employee" component={withRouter(EmployeePage)} />
    <Route exact path="/employee/:id" component={withRouter(EmployeeEdit)} />

    {/* <Redirect exact from="/" to="/department" /> */}
    {/* <Route exact path="/dashboard" component={withRouter(IssueReport)} /> */}

    {/* <Route exact path="/relation" component={RelationPage} /> */}

    {/* <Route exact path="/department" component={withRouter(DeparmentPage)} /> */}
    {/* <Route exact path="/department/:id" component={withRouter(DeparmentEdit)} />

    <Route exact path="/employee" component={withRouter(EmployeePage)} />
    
    <Route exact path="/schedule" component={withRouter(SchedulePage)} /> */}

    <Route component={NoMatch} />
  </Switch>
)
export default Routes;
