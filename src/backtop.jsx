import React, {Component} from 'react';
import {getScrollTop, setScrollTop} from './helpers/util';
import Icon from './icon.jsx';
// import '../css/backtop.css';

class BackTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false
    };
  }

  componentDidMount() {
    if (!this.props.alwaysShown) {
      window.onscroll = this.updateScroll;
    }
  }

  updateScroll = () => {
    this.setState({
      shown: getScrollTop() > this.props.visibleHeight && true
    });
  }

  gotoTop() {
    setScrollTop(0);
    this.props.onHandler();
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  render() {
    const { className, alwaysShown, visibleHeight, onHandler, ...others } = this.props;
    const classes = 'back-top ' + className
    return (
      <div className={classes} 
        {...others}
        onClick={this.gotoTop.bind(this)}>
        <Icon type="top" />
      </div>
    );
  }
}

BackTop.propTypes = {
  alwaysShown: React.PropTypes.bool,
  visibleHeight: React.PropTypes.number,
  onHandler: React.PropTypes.func
};

BackTop.defaultProps = {
  className: '',
  alwaysShown: false,
  visibleHeight: 400,
  onHandler: () => {}
};

export default BackTop;