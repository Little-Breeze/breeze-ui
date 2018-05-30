import React, { Component } from 'react';
import classnames from 'classnames';
import './appheader.styl';

class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { resize, selected } = this.props;
    return (
      <div className="app-header">
        { selected }
      </div>
    );
  }
}

export default AppHeader;