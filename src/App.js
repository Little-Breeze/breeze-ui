import React, { Component } from 'react';
// import logo from '../images/logo.svg';
import './css/iconfont.css';
import './css/App.css';
import Icon from './components/icon.jsx';
import Checkbox from './components/checkbox.jsx';
import BackTop from './components/backtop.jsx';

class App extends Component {
  render() {
    return (
      <ul className="App">
        <li>
          <Icon type="add" />
        </li>
        <li>
          <Checkbox className="test-check-box" name="check-box" text="test" />
        </li>
        <li>
          <BackTop alwaysShown={true} />
        </li>
      </ul>
    );
  }
}

export default App;
