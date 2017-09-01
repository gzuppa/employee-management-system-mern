import React from 'react';
import PropTypes from 'prop-types'
import qs from 'query-string';

import { Row, Col } from 'antd';

import EventTracker from './event/EventTracker.jsx'


class DashboardPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
        <Row>
          <Col span={24}> <EventTracker /></Col>
        </Row>
      </div >
    );
  }
}
DashboardPage.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
};

export default DashboardPage;
