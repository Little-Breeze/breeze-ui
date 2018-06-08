import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Pannel from './pannel';
import './slides.styl'

const prefix = "slides-";

class Slides extends Component {
  constructor(args) {
    super(args);
    this.state = {
      pannelStyle: {},
      scrollBoxStyle: {}
    };
    this.containerEl = null;
    this.scrollBoxEl = null;
    this.pannelNum = this.props.children.length;
    this.endPannelIndex = this.pannelNum - 1;
    this.containerWidth = null;
    this.containerHeight = null;
    this.curPannelIndex = this.props.defaultIndex || 0;
    this.moveBoxLeft = 0;
  }

  componentDidMount() {
    this.containerEl = this.refs.container;
    this.scrollBoxEl = this.refs.scrollBox;

    this.getContainerWH();
    this.initStyle();
    this.initEvent();
    this.setPannelIndex(this.curPannelIndex);
    this.setAutoRun(this.props.autoSlide);
  }

  getContainerWH() {
    this.containerWidth = this.containerEl.getBoundingClientRect().width;
    this.containerHeight = this.containerEl.getBoundingClientRect().height;
  }

  initStyle() {
    let pannelStyle = {
      width: this.containerWidth,
      height: this.containerHeight,
    };
    let scrollBoxStyle = {
      width: this.containerWidth * this.pannelNum,
      height: this.containerHeight
    };
    this.setState({
      pannelStyle: pannelStyle,
      scrollBoxStyle: scrollBoxStyle
    });
  }

  initEvent() {
    // init touch event
  }

  slideChange(num, callback) {
    if (typeof num == 'number') {
      this.moveBoxLeft = num * this.containerWidth;
    } else {
      let nextPannelLeft = this.moveBoxLeft + this.containerWidth;
      let endPannelLeft = this.containerWidth * (this.pannelNum - 1);
      // 如果是最后一帧 特殊处理
      if (nextPannelLeft > endPannelLeft) {
        this.moveBoxLeft = 0;
      } else {
        this.moveBoxLeft += this.containerWidth;
      }
    }
    this.curPannelIndex = this.getPannelIndex();
    let leftNum = this.moveBoxLeft <= 0 ? 0 : -this.moveBoxLeft;
    this.setState(prevState => {
      return {
        scrollBoxStyle: {
          ...prevState.scrollBoxStyle, 
          left: leftNum, WebkitTransition: `left ${this.props.speed}ms ${this.props.effect}`
        }
      }
    });
  }

  setPannelIndex(index, callback) {
    let num = parseInt(index, 10);
    num = (num <= 0) ? 0 : num;
    this.slideChange(num, callback);
  }

  getPannelIndex() {
    let tabListIndex = this.moveBoxLeft / this.containerWidth;
    return tabListIndex <= 0 ? 0 : tabListIndex;
  }

  setAutoRun(isRun, index) {
    if (isRun) {
      this.setIntervalObj = setInterval(() => {
        this.slideChange(index);
      }, this.props.viewTime);
    } else {
      clearInterval(this.setIntervalObj);
      this.setIntervalObj = null;
    }
  }

  componentWillUnmount() {
    if (this.setIntervalObj) {
      clearInterval(this.setIntervalObj);
      this.setIntervalObj = null;
    }
  }

  renderChildren() {
    const { children, defaultIndex, pannelClass, onPannelTap } = this.props;
    return React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        className: pannelClass,
        selected: index === this.curPannelIndex,
        onTouchTap: onPannelTap.bind(this, index),
        style: this.state.pannelStyle,
      })
    );
  }

  renderNavContent() {
    const { children } = this.props;
    let navElList = [];
    let length = children.length;
    if (length > 1) {
      for (let i = 0; i < length; i++) {
        navElList.push(
          <span key={i} className={classnames('nav-item', { 'selected': i === this.curPannelIndex })}></span>
        );
      }
      return navElList;
    } else {
      return null;
    }
  }

  render() {
    const { className, children, contentClass,　showNav, navClass, ...others } = this.props;
    const classes = classnames('breeze-slides', className);
    return (
      <div className={classes} {...others} ref="container">
        <div className={classnames('slide-content', contentClass)}>
          <div className="scroll-box" ref="scrollBox" style={this.state.scrollBoxStyle}>
            { this.renderChildren() }
          </div>
        </div>
        { 
          showNav
          &&
          <div className={classnames('nav-content', navClass)} style={{width: this.containerWidth}}>
            { this.renderNavContent() }
          </div>
        }
      </div>
    );
  }
}

Slides.defaultProps = {
  autoSlide: true,
  defaultIndex: 0,
  viewTime: 2000,
  speed: 300,
  showNav: true,
  effect: 'ease-in',
  onPannelTap: () => {} ,
}

Slides.propTypes = {
  autoSlide: PropTypes.bool,
  defaultIndex: PropTypes.number,
  viewTime: PropTypes.number,  // 可视停留时间
  speed: PropTypes.number, //　动画时间
  effect: PropTypes.string, // 动画效果
  onPannelTap: PropTypes.func,
  showNav: PropTypes.bool,
  contentClass: PropTypes.string,
  pannelClass: PropTypes.string,
  navClass: PropTypes.string
};

export default Slides;