import React, { Component } from 'react';

class Composer extends Component {
    render () {
        return (
            <form>
                <input
                    maxLength = { 50 }
                    placeholder = 'New task description'
                    type = 'text'
                />
                <button>Add new task</button>
            </form>
        );
    }
}

export default Composer;
