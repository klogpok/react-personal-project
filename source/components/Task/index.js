// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    render () {
        const { message } = this.props;

        return (
            <li className = { Styles.task }>
                <div className = 'content'>{message}</div>
                <div className = 'actions'>
                    <div className = { Styles.toggleTaskFavoriteState } />
                    <div className = { Styles.toggleTaskFavoriteState } />
                    <div className = 'removeTask'>X</div>
                </div>
            </li>
        );
    }
}
