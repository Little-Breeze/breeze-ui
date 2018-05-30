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
      resize: false,
      showDrawer: false,
      selected: ''
    };
  }

  componentDidMount() {
    this.handleResize();
    window.onresize = this.handleResize.bind(this);
  }

  handleResize() {
    let clientWidth = document.body.clientWidth;
    this.setState({ resize: clientWidth <= 640 });
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  onHandleItemClick(key) {
    this.setState({selected: key});
  }

  onHandleHeaderClick() {
    // show or hide drawer
    this.setState(prevState => {
      return { showDrawer: !prevState.showDrawer }
    });
  }

  render() {
    let { resize, showDrawer, selected } = this.state;
    return (
     <div className="app">
      <Drawer resize={resize} onHandleItemClick={this.onHandleItemClick.bind(this)} />
      {
        resize && showDrawer 
        ? (
             <div className="drawer-wrap" onClick={() => {this.setState({showDrawer: false})}}>
              <div className="mask"></div>
              <Drawer resize={false} onHandleItemClick={this.onHandleItemClick.bind(this)} />
            </div>
          )
        : null
      }
     
      <div className="app-right" style={{
        position: 'absolute',
        left: resize ? '0' : '256px',
        top: '0',
        right: '0'
      }}>
        <AppHeader resize={resize} selected={selected} onHandleHeaderClick={this.onHandleHeaderClick.bind(this)} />
        <AppMain selected={selected} />
      </div>
     </div>
    );
  }
}

export default App;
