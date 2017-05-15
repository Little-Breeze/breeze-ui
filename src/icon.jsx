import React, { Component } from 'react';

const prefix = 'icon-';

class Icon extends Component {
  render() {
    const { type, className, children, ...others } = this.props;
    const classes = 'icon ' + ` ${prefix}${type} ` + className;
    return (
      <i className={classes} {...others}>
        {children}
      </i>
    )
  }
}

Icon.defaultProps = {
  className: ''
};

Icon.propTypes = {
  type: React.PropTypes.string
};

export default Icon;