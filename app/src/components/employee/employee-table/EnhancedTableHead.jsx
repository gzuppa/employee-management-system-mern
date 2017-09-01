import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from 'antd';

import EmployeeAddTableItem from "./EmployeeAddTableItem.jsx";


export default class EnhancedTableHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="table-header">
                <div className="ant-table-title">
                    {"Employees"}
                </div>
                <div className="table-header-menu">
                    <div className="menu-item">
                        <Button shape="circle" icon="search" />
                    </div>
                    <div className="menu-item ">
                        {/* <Button>Add</Button> */}
                        <EmployeeAddTableItem />
                    </div>
                </div>
            </div>
        );
    }
}
EnhancedTableHead.propTypes = {
};