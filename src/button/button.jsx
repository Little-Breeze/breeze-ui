import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ''
    };
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  onTouchStart() {
    const { hoverClass, disabled } = this.props;
    if (!disabled) {
      this.setState({
        classes: classnames('button-hover', hoverClass)
      });
    }
  }

  onTouchEnd() {
    const { hoverClass, disabled } = this.props;
    if (!disabled) {
      this.props.onTouchTap();
    }
  }

  render() {
    const { className, hoverClass, onTouchTap, icon, size, disabled, loading, children ...others } = this.props;
    const classList = classnames(className, 
      this.state.classes, 
      { 'disabled': disabled },
      { 'loading': loading },
      { [size] : size !== 'default' }
    );
    return (
      <div className={classList} {...others}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd} >
        {children}
      </div>
    )
  }
}

Button.defaultProps = {
  onTouchTap: () => {} ,
  size: 'default',
};

Button.propTypes = {
  className: PropTypes.string,
  hoverClass: PropTypes.string,
  loadingClass: PropTypes.string,
  onTouchTap: PropTypes.func,
  icon: PropTypes.string,
  size: PropTypes.string, // default, small, large
  disabled: PropTypes.bool,
  loading: PropTypes.bool
};

export default Button;