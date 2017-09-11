import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import reduxStore from './store/reduxStore';

import "./index.css";
import Routes from "./Routes/IndexRoutes.jsx";

render(
  <Provider store={reduxStore}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('contents')
)
if (module.hot) {
  module.hot.accept();
}
