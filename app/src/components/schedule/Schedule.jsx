import React from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';
import "./Schedule.css";


class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment('2017-01-25'),
      selectedValue: moment('2017-01-25'),
    }

    this.onSelect = this.onSelect.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
  }

  onSelect(value) {
    this.setState({
      value,
      selectedValue: value,
    });
  }
  onPanelChange(value) {
    this.setState({ value });
  }
  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} />
        <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}

export default Schedule;
