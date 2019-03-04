// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

class Composer extends Component {
    static propTypes = {
        _createTask: func.isRequired,
    }

    state = {
        message: '',
    }

    _onChangeHandler = (event) => {
        if (event.key === 'Enter' && event.target.value) {
            this._submitTask();
        } else {
            this.setState({ message: event.target.value });
        }

    }

    _handleFormSubmit = (event) => {

        event.preventDefault();

        if (this.state.message) {
            this._submitTask();
        }
    }

    _submitTask = () => {
        this.setState({ message: '' });
        this.props._createTask(this.state.message);
    }

    render () {

        return (
            <form onSubmit = { this._handleFormSubmit } >
                <input
                    maxLength = { 50 }
                    placeholder = 'New task description'
                    type = 'text'
                    value = { this.state.message }
                    onChange = { this._onChangeHandler }
                />
                <button type = 'submit' >Add new task</button>
            </form>
        );
    }
}

export default Composer;
