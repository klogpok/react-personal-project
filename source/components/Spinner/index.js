// Core
import React, { Component } from 'react';
import { bool } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class Spinner extends Component {
    static propTypes = {
        isTaskFetching: bool.isRequired,
    }
    render () {
        const { isTaskFetching } = this.props;

        return (
            isTaskFetching && <div className = { Styles.spinner } />
        );
    }
}
