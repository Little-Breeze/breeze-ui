import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './progress.styl';

class Progress extends Component {
  constructor(args) {
    super(args);
  }

  render() {
    const { className, min, max, position, showPercent, ...others } = this.props;
    const classes = classnames('progress', className, position);
    return (
      <div className={classes} {...others}>
        <div className="progress-text" style={{left: min/max*100 + '%'}}>{min}/{max}</div>
        <div className="current" style={{width: min/max * 100 + '%'}}></div>
      </div>
    );
  }
}

Progress.defaultProps = {
  min: 0,
  max: 100,
  position: 'top',
  showPercent: true
};

Progress.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  position: PropTypes.string,
  showPercent: PropTypes.bool,
};

export default Progress;