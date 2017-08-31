import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames';

import { Layout, Menu, Icon } from 'antd';
import { DatePicker, message } from 'antd';

const { Content } = Layout;
import "./App.css";

import SideMenu from "./SideMenu.jsx";
import Header from "./Header.jsx";

// withRouter IssueList can use this.props.router to access the router object.(this.props.location)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            date: '',
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleChange(date) {
        message.info('Selected Date: ' + date.toString());
        this.setState({ date });
    }
    render() {
        const classes = this.props.classes;

        return (
            <Layout className={classNames("app", "ant-layout-has-sider")}>
                <SideMenu collapsed={this.state.collapsed} />
                <Layout>
                    <Header toggleMenu={this.toggle} collapsed={this.state.collapsed} />
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <div style={{ width: 400, margin: '100px auto' }}>
                            <DatePicker onChange={value => this.handleChange(value)} />
                            <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


export default App;
