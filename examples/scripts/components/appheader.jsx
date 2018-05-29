import React, { Component } from 'react';
import classnames from 'classnames';
import './appheader.styl';

class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { resize } = this.props;
    return (
      <div className="app-header">
        app header
      </div>
    );
  }
}

export default AppHeader;