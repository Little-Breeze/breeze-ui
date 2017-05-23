/**
 * Icon with image.
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import mergeProps from '../helpers/mergeProps';

class ImageIcon extends Component {
  render() {
    const { src, children, ...others } = this.props;
    const props = mergeProps(others, {
      className: 'image-icon';
    });
    return (
      <img {src} {...props} />
    )
  }
}

ImageIcon.propTypes = {
  src: PropsTypes.string.isRequired,
  style: PropTypes.object
};

export default ImageIcon;