import React, { Component } from 'react';
import classnames from 'classnames';
import listdata from '../listdata';
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
          {
            Object.keys(listdata).map((name, i) => (
              <li key={i} onTouchTap={() => {this.props.onHandleItemClick(name)}}>{name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Drawer;