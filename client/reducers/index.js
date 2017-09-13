import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authState from './auth';
import interfaceState from './interface';
import employeeState from './/employee';
import departmentState from './department';
import notification from './notifications';

const EMSApp = combineReducers({
  authState,
  interfaceState,
  employeeState,
  departmentState,
  notification,
  form: formReducer
});

export default EMSApp;
