import React, { Component } from 'react';
import listdata from '../listdata';
import './appmain.styl'

class AppMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selected } = this.props;
    return (
      <div className="app-content">
        app main
        {
          listdata[selected]
        }
      </div>
    );
  }
}

export default AppMain;