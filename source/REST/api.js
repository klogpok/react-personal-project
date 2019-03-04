import { MAIN_URL, TOKEN } from './config.js';
import { BaseTaskModel } from '../instruments/helpers';

export const api = {
    fetchTasks: async () => {
        const response = await fetch(MAIN_URL, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
        });

        const { data: tasks } = await response.json();

        return tasks;
    },

    createTask: async (message) => {
        const task = {
            ...new BaseTaskModel(),
            message,
        };

        const response = await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ ...task }),
        });

        const { data: newTask } = await response.json();

        return newTask;
    },

    updateTask: async (updatedTask) => {

        const response = await fetch(MAIN_URL, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify([{ ...updatedTask }]),
        });

        const { data: task } = await response.json();

        return task;
    },

    removeTask: async (id) => {
        await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
        });
    },

    completeAllTasks: async (tasks) => {
        const ps = tasks.map((task) => {
            return (
                fetch(MAIN_URL, {
                    method:  'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:  TOKEN,
                    },
                    body: JSON.stringify([{ ...task }]),
                })
            );
        });

        //const updatedTasks = await Promise.all(ps);
        await Promise.all(ps);

        // const res = [];

        // for (const key of updatedTasks) {
        //     const clone = key.clone();
        //     const { data: [task] } = await clone.json();

        //     res.push(task);
        // }

        //return res;

        //return updatedTasks;
    },
};
