// Core
import React, { PureComponent } from 'react';
import { string, func, bool } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import cx from 'classnames';

export default class Task extends PureComponent {
    static propTypes = {
        _removeTaskAsync: func.isRequired,
        completed:        bool.isRequired,
        favorite:         bool.isRequired,
        id:               string.isRequired,
        message:          string.isRequired,
    }

    constructor (props) {
        super(props);

        this.taskInput = React.createRef();
        this.state.newTaskMessage = props.message;
    }

    state = { isTaskEditing: false };

    // _getTaskShape = ({
    //     id = this.props.id,
    //     completed = this.props.completed,
    //     favorite = this.props.favorite,
    //     message = this.props.message,
    // }) => ({
    //     id,
    //     completed,
    //     favorite,
    //     message,
    // });

    _getTaskShape = () => ({
        id:        this.props.id,
        completed: this.props.completed,
        favorite:  this.props.favorite,
        message:   this.props.message,
    });

    _removeTaskAsync = () => {
        return this.props._removeTaskAsync(this.props.id);
    }

    getTaskStyles = () => {
        return cx(Styles.task, {
            [Styles.completed]: this.props.completed,
        });
    }

    getCheckboxStyles = () => {
        return cx(Styles.toggleTaskCompletedState, {
            [Styles.completed]: this.props.completed,
        });
    }

    _toggleTaskCompletedState = () => {
        this.props._updateTaskAsync({ ...this._getTaskShape(), completed: !this.props.completed });
    }

    _toggleTaskFavoriteState = () => {
        this.props._updateTaskAsync({ ...this._getTaskShape(), favorite: !this.props.favorite });
    }

    _updateTaskMessageOnClick = () => {

        if (!this.state.isTaskEditing) {
            this._setTaskEditingState(true);
        } else {
            this._updateTask();

            return null;
        }
    }

    _updateTask = () => {
        this._setTaskEditingState(false);

        if (this.state.newTaskMessage === this.props.message) {
            return null;
        }

        this.props._updateTaskAsync({ ...this._getTaskShape(), message: this.state.newTaskMessage });
    }

    _updateNewTaskMessage = (event) => {
        this.setState({ newTaskMessage: event.target.value });
    }

    _setTaskEditingState = (mode) => {
        this.setState({ isTaskEditing: mode }, () => {
            if (this.state.isTaskEditing) {
                this.taskInput.current.focus();
            }
        });
    }

    _cancelUpdatingTaskMessage = () => {
        this.setState({ isTaskEditing: false, newTaskMessage: this.props.message });
    }

    _updateTaskMessageOnKeyDown = (event) => {
        if (!this.state.newTaskMessage) {
            return null;
        }

        const key = event.key;

        if (key === 'Enter') {
            this._updateTask();
        } else if (key === 'Escape') {
            this._cancelUpdatingTaskMessage();
        }
    }

    _moveCaretAtEnd = (event) => {
        const temp = event.target.value;

        event.target.value = '';
        event.target.value = temp;
    }

    render () {
        const { completed, favorite } = this.props;

        const { newTaskMessage } = this.state;

        const taskStyles = this.getTaskStyles();

        return (
            <li className = { taskStyles }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles._toggleTaskCompletedState }
                        color1 = '#3b8ef3'
                        color2 = '#fff'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        autoFocus
                        disabled = { !this.state.isTaskEditing }
                        minLength = { 50 }
                        name = 'taskInput'
                        ref = { this.taskInput }
                        type = 'text'
                        value = { newTaskMessage }
                        onChange = { this._updateNewTaskMessage }
                        onFocus = { this._moveCaretAtEnd }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3b8ef3'
                        color2 = '#363636'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3b8ef3'
                        color2 = '#363636'
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        color1 = '#3b8ef3'
                        color2 = '#363636'
                        onClick = { this._removeTaskAsync }
                    />
                </div>
            </li>
        );
    }
}
