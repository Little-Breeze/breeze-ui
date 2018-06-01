import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import mergeProps from '../helpers/mergeProps';
import './tooltip.styl';

class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false
    };
    this.onHandleTap = this.onHandleTap.bind(this);
  }

  componentDidMount() {
    const { isShowing, delay } = this.props;
    this.setState({ isShowing: isShowing });
    if (this.props.isShowing === true) {
      if (delay > 0) {
        this.makeTimer(delay);
      }
      this.props.onTipShow();
    }
  }

  show() {
    this.setState({ isShowing: true });
  }

  hide() {
    this.setState({ isShowing: false });
  }

  makeTimer(delay) {
    this.timer = setInterval(() => {
      this.hide();
      clearInterval(this.timer);
      this.timer = null;
    }, delay * 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShowing !== this.props.isShowing) {
      if (nextProps.isShowing === true) {
        this.show();
        if (nextProps.delay > 0) {
          this.makeTimer(nextProps.delay);
        }
        this.props.onTipShow();
      } else {
        this.hide();
        this.props.onTipHide();
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  onHandleTap() {
    this.setState({ isShowing: false });
    this.props.onTipTap();
  }

  render() {
    const { position, content, onTipClick, onTipShow, onTipHide, ...others } = this.props;
    const classes = classnames('tooltip', position, { 'hidden': !this.state.isShowing });
    const props = mergeProps(others, {
      className: classes
    });
    return (
      <div {...props} onTouchTap={this.onHandleTap}>
        { content && content != '' ? content : children }
      </div>
    );
  }
}

ToolTip.propTypes = {
  position: PropTypes.string,
  content: PropTypes.string,
  isShowing: PropTypes.bool,
  delay: PropTypes.number, // 如果有delay且delay不为0的话, 延迟多少秒之后消失
  onTipTap: PropTypes.func,
  onTipShow: PropTypes.func,
  onTipHide: PropTypes.func
};

ToolTip.defaultProps = {
  position: 'bottom',
  onTipTap: () => {} ,
  onTipShow: () => {} ,
  onTipHide: () => {} 
}

export default ToolTip;