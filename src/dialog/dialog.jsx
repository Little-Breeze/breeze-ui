import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { wrapEvent } from '../helpers/util';
import './dialog.styl';

class Dialog extends Component {
  constructor(args) {
    super(args);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onContentClick = this.onContentClick.bind(this);
  }

  onOverlayClick(e) {
    e.stopPropagation();
    this.props.onDismiss();
  }

  onContentClick(e) {
    e.stopPropagation();
  }

  render() {
    const { isOpen, onDismiss, children, ...others } = this.props;
    return isOpen && (
      <div className="dialog-overlay" onClick={ this.onOverlayClick }>
        <div className="dialog-content" {...others} onClick={ this.onContentClick }>
          { children }
        </div>
      </div>
    );
  }
}

Dialog.defaultProps = {
  isOpen: true,
  onDismiss: () => {},
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func,
};

export default Dialog;