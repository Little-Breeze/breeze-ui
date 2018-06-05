import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './progress.styl';

class Progress extends Component {
  constructor(args) {
    super(args);
    this.state = {
      parentElWidth: 0,
      textElWidth: 0
    };
    this.getParentEl = this.getParentEl.bind(this);
    this.getTextEl = this.getTextEl.bind(this);
  }

  getParentEl(el) {
    if (el) {
      this.setState({
        parentElWidth: el.getBoundingClientRect().width
      });
    }
  }

  getTextEl(el) {
    if (el) {
      this.setState({
        textElWidth: el.getBoundingClientRect().width
      });
    }
  }

  getTextLeftPos() {
    const { min, max } = this.props;
    let { parentElWidth, textElWidth } = this.state;
    let leftPos = min / max * parentElWidth - textElWidth / 2;
    if (leftPos < 0) {
      return 0;
    } else if (leftPos + textElWidth > parentElWidth) {
      return parentElWidth - textElWidth;
    } else {
      return leftPos;
    }
  }

  render() {
    const { className, min, max, position, showPercent, ...others } = this.props;
    let { parentElWidth, textElWidth } = this.state;
    const classes = classnames('progress', className);
    const textClasses = classnames('progress-text', position);
    return (
      <div className={classes} {...others} ref={this.getParentEl}>
        <div className={textClasses} ref={this.getTextEl} style={{left: this.getTextLeftPos() + 'px'}}>{min}/{max}</div>
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
  position: PropTypes.string, // top, bottom, middle
  showPercent: PropTypes.bool,
};

export default Progress;