// Core
import React, { Component } from 'react';

// Components
import Task from '../Task';
import Header from '../Header';
import Spinner from '../Spinner';
import Composer from '../Composer';

// Instruments
import Styles from './styles.m.css';
//import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { BaseTaskModel } from '../../instruments/helpers';

export default class Scheduler extends Component {
    state = {
        tasks: [
            new BaseTaskModel(undefined, undefined, undefined, 'Task 1'),
            new BaseTaskModel(undefined, undefined, undefined, 'Task 2'),
            new BaseTaskModel(undefined, undefined, undefined, 'Task 3')
        ],
        isTaskFetching: false,
        searchValue:    '',
    }

    _setTaskFetchingState (state) {
        this.setState({
            isTaskFetching: state,
        });
    }

    _createTask (message) {
        this._setTaskFetchingState(true);

        const task = {
            ...new BaseTaskModel(),
            message,
        };

        this.setState(({ tasks }) => ({
            tasks:          [task, ...tasks],
            isTaskFetching: false,
        }));
    }

    _onSearchValueChange = (searchValue) => {
        this.setState({ searchValue }, () => this._renderTasks());
    }

    _renderTasks = () => {

        const { tasks, searchValue } = this.state;

        const tasksToDisplay = !searchValue
            ? tasks
            : tasks.filter((task) => task.message.toLowerCase().startsWith(searchValue));

        return tasksToDisplay.map((task) => <Task key = { task.id } { ...task } />);
    }

    render () {
        const { isTaskFetching } = this.state;
        const tasksJSX = this._renderTasks();

        return (
            <section className = { Styles.scheduler }>
                <Spinner isTaskFetching = { isTaskFetching } />
                <main>
                    <Header _onSearchValueChange = { this._onSearchValueChange } />
                    <section>
                        <Composer />
                        <div>
                            <ul>{tasksJSX}</ul>
                        </div>
                    </section>
                    <footer />
                </main>
            </section>
        );
    }
}
