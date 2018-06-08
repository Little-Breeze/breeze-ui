import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const prefix = "pannel-";

class Pannel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, className, selected, onTouchTap, ...others } = this.props;
    const classes = classnames('pannel-content', className, { 'pannel-selected': selected });
    return (
      <div className={classes} {...others} onTouchTap={onTouchTap}>
        {
          children
        }
      </div>
    );
  }
}

export default Pannel;