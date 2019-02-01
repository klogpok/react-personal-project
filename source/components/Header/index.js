// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

class Header extends Component {
  static propTypes = {
      _onSearchValueChange: func.isRequired,
  }

  state = {
      inputValue: '',
  }

  _onSearchValueChange = (event) => {
      this.setState({
          inputValue: event.target.value,
      }, () => this.props._onSearchValueChange(this.state.inputValue.toLowerCase()));
  }

  render () {
      return (
          <header>
              <h1>Task Scheduler</h1>
              <input
                  placeholder = 'Search'
                  type = 'text'
                  value = { this.state.inputValue }
                  onChange = { this._onSearchValueChange }
              />
          </header>
      );
  }
}

export default Header;
