import React, { Component } from 'react';
import classnames from 'classnames';
import './appheader.styl';
import menuIcon from '../../imgs/icon-menu.png';

class AppHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { resize, selected, onHandleHeaderClick } = this.props;
    return (
      <div className="app-header">
        { resize && <img src={menuIcon} onClick={onHandleHeaderClick} /> }
        <span>{ selected }</span>
      </div>
    );
  }
}

export default AppHeader;