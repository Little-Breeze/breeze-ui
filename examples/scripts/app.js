import React, { Component } from 'react';
import classnames from 'classnames';
import Drawer from './components/drawer';
import AppHeader from './components/appheader';
import AppMain from './components/appmain';
import './app.styl';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resize: false
    };
  }

  componentDidMount() {
    window.onresize = () => {
      let clientWidth = document.body.clientWidth;
      if (clientWidth <= 640) {
        this.setState({ resize: true });
      } else {
        this.setState({ resize: false});
      }
    };
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    let { resize } = this.state;
    return (
     <div className="app">
      <Drawer resize={resize} />
      <div className="app-main" style={{
        position: 'absolute',
        left: resize ? '0' : '256px',
        top: '0',
        right: '0'
      }}>
        <AppHeader resize={resize} />
        <AppMain />
      </div>
     </div>
    );
  }
}

export default App;
