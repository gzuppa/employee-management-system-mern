import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from 'antd';

import EmployeeAddTableItem from "./EmployeeAddTableItem.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";


export default class EnhancedTableHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="table-header">
                <div className={classnames("table-header-menu", "table-header-item")}>
                    <EmployeeAddTableItem />
                </div>
                <div className={classnames("table-header-item", "search-bar")}>
                    <EmployeeSearch />
                </div>

            </div >
        );
    }
}
EnhancedTableHead.propTypes = {
};
