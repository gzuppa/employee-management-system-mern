import React from 'react';
import PropTypes from 'prop-types'
import qs from 'query-string';

import { Card, Row, Col } from 'antd';

import EventTracker from './event/EventTracker.jsx'


class DashboardPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Employee">Card content</Card>
          </Col>
          <Col span={8}>
            <Card title="Leave Requests">Card content</Card>
          </Col>
          <Col span={8}>
            <Card title="On Leave">Card content</Card>
          </Col>

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
