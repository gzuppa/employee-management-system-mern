import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';


export default class EnhancedTableHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ant-table-title">
                {"Employees"}
                <div className="align-right">
                    <Button shape="circle" icon="search" />
                    <Button>Add</Button>
                </div>
            </div>
        );
    }
}
EnhancedTableHead.propTypes = {
};
