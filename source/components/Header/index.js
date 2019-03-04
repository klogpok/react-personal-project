// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

class Header extends Component {
  static propTypes = {
      _updateTasksFilter: func.isRequired,
  }

  state = {
      inputValue: '',
  }

  _updateTasksFilter = (event) => {
      this.setState({
          inputValue: event.target.value,
      }, () => this.props._updateTasksFilter(this.state.inputValue.toLowerCase()));
  }

  render () {
      return (
          <header>
              <h1>Task Scheduler</h1>
              <input
                  placeholder = 'Search'
                  type = 'text'
                  value = { this.state.inputValue }
                  onChange = { this._updateTasksFilter }
              />
          </header>
      );
  }
}

export default Header;
