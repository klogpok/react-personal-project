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
        this.newTaskMessage = this.props.message;
    }

    state = {
        isTaskEditing: false,
    }

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
        return this.props._removeTask(this.props.id);
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

        //console.log(this.taskInput.value);

        //this.setState({ newTaskMessage: event.target.value });

    }

    _updateNewTaskMessage = (event) => {
        console.log(event.target.value);
        this.setState({ newTaskMessage: event.target.value });
    }

    _setTaskEditingState () {
        this.setState(({ isTaskEditing }) => ({
            isTaskEditing: !isTaskEditing,
        }));

        if (this.isTaskEditing) {
            this.taskInput.current.focus();
            console.log('hop');
        }

    }

    render () {
        const { completed, favorite } = this.props;

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
                        disabled = { !this.state.isTaskEditing }
                        minLength = { 50 }
                        name = 'taskInput'
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { this.state.newTaskMessage }
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
                        onClick = { this._setTaskEditingState }
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
