// Core
import React, { Component } from 'react';

// Components
import Task from '../Task';
import Header from '../Header';
import Spinner from '../Spinner';
import Composer from '../Composer';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { sortTasksByGroup } from '../../instruments/helpers';
import Checkbox from '../../theme/assets/Checkbox';

export default class Scheduler extends Component {
    state = {
        tasks:             [],
        isTasksFetching:   false,
        tasksFilter:       '',
        allTasksCompleted: false,
    }

    async componentDidMount () {
        await this._fetchTasksAsync();
    }

    _setTaskFetchingState = (state) => {
        this.setState({
            isTasksFetching: state,
        });
    }

    _fetchTasksAsync = async () => {
        this._setTaskFetchingState(true);

        const tasks = await api.fetchTasks();

        this.setState({ tasks, isTasksFetching: false }, () => this.setState({ allTasksCompleted: this._getAllCompleted() }));
    }

    _createTaskAsync = async (message) => {
        this._setTaskFetchingState(true);

        const newTask = await api.createTask(message);

        this.setState(({ tasks }) => ({
            tasks:             [newTask, ...tasks],
            isTasksFetching:   false,
            allTasksCompleted: false,
        }));
    }

    _updateTaskAsync = async (task) => {
        this._setTaskFetchingState(true);

        const [updatedTask] = await api.updateTask(task);

        this.setState(({ tasks }) => ({
            tasks:           tasks.map((item) => item.id === updatedTask.id ? updatedTask : item),
            isTasksFetching: false,
        }));

        this.setState(() => ({
            allTasksCompleted: this._getAllCompleted(),
        }));
    }

    _removeTaskAsync = async (id) => {
        this._setTaskFetchingState(true);

        await api.removeTask(id);

        this.setState(({ tasks }) => ({
            tasks:           tasks.filter((task) => task.id !== id),
            isTasksFetching: false,
        }));

        this.setState(() => ({
            allTasksCompleted: this._getAllCompleted(),
        }));
    }

    _completeAllTasksAsync = async () => {

        if (this._getAllCompleted()) {
            return null;
        }

        this._setTaskFetchingState(true);

        const uncompletedTasks = this.state.tasks.filter((task) => !task.completed);

        await api.completeAllTasks(uncompletedTasks.map((task) => ({ ...task, completed: true })));

        this.setState(({ tasks }) => ({
            tasks:             tasks.map((task) => task.completed ? task : { ...task, completed: true }),
            isTasksFetching:   false,
            allTasksCompleted: true,
        }));
    }

    _updateTasksFilter = (tasksFilter) => {
        this.setState({ tasksFilter }, () => this._renderTasks());
    }

    _toggleTaskCompletedState = (id) => {
        let [updatedTask] = this.state.tasks.filter((task) => task.id === id);

        updatedTask = { ...updatedTask, completed: !updatedTask.completed };

        this._updateTaskAsync(updatedTask);
    }

    _toggleTaskFavoriteState = (id) => {
        let [updatedTask] = this.state.tasks.filter((task) => task.id === id);

        updatedTask = { ...updatedTask, favorite: !updatedTask.favorite };

        this._updateTaskAsync(updatedTask);
    }

    _getAllCompleted = () => {
        return !this.state.tasks.some((item) => !item.completed);
    }

    _renderTasks = () => {

        const { tasks, tasksFilter } = this.state;

        let tasksToDisplay = !tasksFilter
            ? tasks
            : tasks.filter((task) => task.message.toLowerCase().startsWith(tasksFilter));

        tasksToDisplay = sortTasksByGroup(tasksToDisplay);

        return tasksToDisplay.map((task) => {
            return (
                <Task
                    key = { task.id }
                    { ...task }
                    _removeTaskAsync = { this._removeTaskAsync }
                    _updateTaskAsync = { this._updateTaskAsync }
                />
            );
        });
    }

    render () {
        const { isTasksFetching, allTasksCompleted } = this.state;
        const tasksJSX = this._renderTasks();

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <Header _updateTasksFilter = { this._updateTasksFilter } />
                    <section>
                        <Composer _createTask = { this._createTaskAsync } />
                        <div>
                            <ul>{tasksJSX}</ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allTasksCompleted }
                            color1 = '#313b3d'
                            color2 = '#fff'
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>All tasks completed</span>
                    </footer>
                </main>
            </section>
        );
    }
}
