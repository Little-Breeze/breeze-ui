import React, { Component } from 'react';
import classnames from 'classnames';
import './drawer.styl';

class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { resize } = this.props;
    const classes = classnames('drawer', { 'hidden' : resize })
    return (
      <div className={classes}>
        <ul>
          <li>button</li>
          <li>tip</li>
        </ul>
      </div>
    );
  }
}

export default Drawer;