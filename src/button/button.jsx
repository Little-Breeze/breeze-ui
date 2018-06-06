import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import './button.styl';

const prefix = 'breeze-btn-';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ''
    };
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onTouchStart() {
    const { touchClass, disabled, loading } = this.props;
    if (!loading && !disabled) {
      this.setState({
        classes: classnames(prefix+'touch', touchClass)
      });
    }
  }

  onTouchEnd() {
    const { touchClass, disabled, loading } = this.props;
    this.setState({ classes: '' });
    if (!loading && !disabled) {
      this.props.onTouchTap();
    }
  }

  onMouseLeave() {
    this.setState({ classes: '' });
  }

  render() {
    const { className, touchClass, loadingClass, onTouchTap, icon, size, disabled, loading, children, ...others } = this.props;
    const classList = classnames('breeze-btn', className, 
      this.state.classes, 
      { [prefix+'disabled']: disabled },
      { [prefix+'loading']: loading },
      { [loadingClass]: loading },
      { [prefix+size] : size !== 'default' }
    );
    return (
      <button className={classList} {...others}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        onMouseEnter={this.onTouchStart}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onTouchEnd}>
        { icon && <Icon type={icon} /> }
        <span>{children}</span>
      </button>
    )
  }
}

Button.defaultProps = {
  onTouchTap: () => {} ,
  size: 'default',
};

Button.propTypes = {
  className: PropTypes.string,
  touchClass: PropTypes.string,
  loadingClass: PropTypes.string,
  onTouchTap: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.string, // default, small, large
  disabled: PropTypes.bool,
  loading: PropTypes.bool
};

export default Button;