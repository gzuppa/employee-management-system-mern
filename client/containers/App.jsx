import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames';


import enUS from 'antd/lib/locale-provider/en_US';
import { Layout, Menu, Icon, LocaleProvider, Breadcrumb } from 'antd';
const { Content, Sider } = Layout;
import "./App.css";

import SideMenu from "./SideMenu.jsx";
import Header from "./Header.jsx";
import Routes from "../Routes/AppRoutes.jsx";


const ItemRender = (route, params, routes, paths) => {
    console.log('route', route);
    // const last = routes.indexOf(route) === routes.length - 1;
    // return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;

    return (<div> <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item></div>);
}

// withRouter IssueList can use this.props.router to access the router object.(this.props.location)
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            date: '',
        };

        this.toggle = this.toggle.bind(this);
        console.log(this.props);
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
        const { history, location } = this.props;

        return (
            <LocaleProvider locale={enUS}>
                <Layout className={classNames("app", "ant-layout-has-sider")}>
                    <SideMenu collapsed={this.state.collapsed} />
                    <Layout>
                        <Header toggleMenu={this.toggle} collapsed={this.state.collapsed} />
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Routes />
                        </Content>
                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }
}


export default App;
