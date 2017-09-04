import React from 'react'
import { connect } from 'react-redux';

import { Select, Spin ,Icon, Button, Input, AutoComplete} from 'antd';
import debounce from 'lodash.debounce';
const Option = Select.Option;


function onSelect(value) {
  console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
  return (new Array(getRandomInt(5))).join('.').split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }));
}

function renderOption(item) {
  return (
    <Option key={item.id} title={item.text}>
      {/* {item.query} 在
      <a
        href={`https://s.taobao.com/search?q=${item.query}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.category}
      </a>
      区块中
      <span className="global-search-item-count">约 {item.count} 个结果</span> */}
      <div>{item.text}</div>
    </Option>
  );
}

class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;

    this.state = {
      data: [],
      value: [],
      fetching: false,
    }

    this.fetchUser = debounce(this.fetchUser, 800);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  fetchUser(value) {
    console.log('fetching user', value);
    // this.lastFetchId += 1;
    // const fetchId = this.lastFetchId;
    this.setState({ fetching: true });
    fetch(`/api/employee?_limit=5&search=${value}`)
      .then(response => response.json())
      .then((body) => {
        // if (fetchId !== this.lastFetchId) { // for fetch callback order
        //   return;
        // }
        const data = body.records.map(user => ({
          id: user._id,
          text: `${user.name.firstName} ${user.name.lastName}`,
          fetching: false,
        }));
        this.setState({ data });
      });
  }
  handleSearch (value){
    console.log('handleSearch', value)
    this.setState({
      data: value ? searchResult(value) : [],
    });
    // this.fetchUser()
  }
  handleChange(value) {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  render() {
    const { fetching, data, value } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '100%' }}
          dataSource={data.map(renderOption)}
          onSelect={onSelect}
          onSearch={this.fetchUser.bind(this)}
          placeholder="Find by name"
          optionLabelProp="text"
        >
          <Input
            suffix={(
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            )}
          />
        </AutoComplete>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const employeeState = state.employeeState;
  return {
      employees: employeeState.employees,
      totalCount: employeeState.totalCount,
      isFetching: employeeState.isFetching,
      lastUpdated: employeeState.lastUpdated,
      updatedEmployee: employeeState.updatedIssue,
  }
};

export default connect(mapStateToProps)(EmployeeSearch);
