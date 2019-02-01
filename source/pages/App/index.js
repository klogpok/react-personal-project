// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import Schelduler from '../../components/Scheduler';

@hot(module)
class App extends Component {
    render () {
        return (
            <>
                <Schelduler />
            </>
        );
    }
}

export default App;
