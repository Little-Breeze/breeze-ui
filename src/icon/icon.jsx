/**
 * Icon with font.
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import mergeProps from '../helpers/mergeProps';

const prefix = 'icon-';

class Icon extends Component {
  render() {
    const { type, children, ...others } = this.props;
    const props = mergeProps(others, {
      className: classnames('icon', prefix + type)
    });
    return (
      <i {...props}>
        {children}
      </i>
    )
  }
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default Icon;