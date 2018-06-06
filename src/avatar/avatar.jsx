import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import './avatar.styl';

const prefix = 'breeze-avatar-';
const displayName = 'breeze-avatar'

class Avatar extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onImgError = this.onImgError.bind(this);
  }

  onImgError(e) {
    e.target.src = this.props.defaultImage;
  }

  onClick(e) {
    this.props.onClick && this.props.onClick()
  }

  render() {
    const { className, image, defaultImage, icon, size, shape, ...others } = this.props;
    const classes = classnames(displayName, 
      className, 
      { [prefix+shape]: shape !== 'circle' },
      { [prefix+size] : size !== 'default' }
    );
    return (
      <span className={classes} {...others} onClick={this.onClick}>
      {
        icon 
        ? <Icon type={icon} />
        : <img src={image} onError={this.onImgError} />
      }
      </span>
    );
  }
}

Avatar.propTypes = {
  image: PropTypes.string,
  defaultImage: PropTypes.string,
  size: PropTypes.string, // default , large, small
  icon: PropTypes.string, // icon type
  shape: PropTypes.string, // circle , square
};

Avatar.defaultProps = {
  defaultImage: '',
  size: 'default',
  shape: 'circle'
};

export default Avatar;