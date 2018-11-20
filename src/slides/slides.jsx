import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './slides.styl'

export class Pannel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, className, selected, onTouchTap, ...others } = this.props;
    const classes = classnames('pannel-content', className, { 'pannel-selected': selected });
    return (
      <div className={classes} {...others} onClick={onTouchTap}>
        {
          children
        }
      </div>
    );
  }
}

export class Slides extends Component {
  constructor(args) {
    super(args);
    this.state = {
      pannelStyle: {},
      scrollBoxStyle: {}
    };
    this.containerEl = null;
    this.scrollBoxEl = null;
    this.pannelNum = 0;
    this.endPannelIndex = 0;
    this.containerWidth = null;
    this.containerHeight = null;
    this.curPannelIndex = 0;
    this.moveBoxDistance = 0;
  }

  componentDidMount() {
    this.containerEl = this.refs.container;
    this.scrollBoxEl = this.refs.scrollBox;

    this.pannelNum = this.props.children.length;
    this.endPannelIndex = this.pannelNum - 1;
    this.curPannelIndex = this.props.defaultIndex || 0;

    this.getContainerWH();
    this.initStyle();
    this.initEvent();
    this.setPannelIndex(this.curPannelIndex);
    this.setAutoRun(this.props.autoSlide);
  }

  getContainerWH() {
    let clientRect = this.containerEl.getBoundingClientRect();
    this.containerWidth = clientRect.width;
    this.containerHeight = clientRect.height;
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
    let offloadFn = (fn) => { setTimeout(fn || (() => void 0), 0) };
    let start = {};
    let delta = {};
    let events = {
      handleEvent: (event) => {
        switch(event.type) {
          case 'touchstart': events.start(event); break;
          case 'touchmove': events.move(event); break;
          case 'touchend': offloadFn(events.end(event)); break;
          default: break;
        }
      },

      start: (event) => {
        var touches = event.touches[0];
        // measure start values
        start = {
          x: touches.pageX,
          y: touches.pageY,
          time: +new Date()
        };
        // reset delta and end measurements
        delta = {};
        // attach touchmove and touchend listeners
        this.scrollBoxEl.addEventListener('touchmove', events, false);
        this.scrollBoxEl.addEventListener('touchend', events, false);
      },

      move: (event) => {
        // prevent native scrolling
        event.preventDefault();
        // ensure swiping with one touch and not pinching
        if (event.touches.length > 1 || event.scale && event.scale !== 1) {
          return;
        }
        var touches = event.touches[0];
        // measure change in x and y
        delta = {
          x: touches.pageX - start.x,
          y: touches.pageY - start.y
        };
        // stop slideshow
        this.stop();
      },

      end: (event) => {
        var isValidSlide;
        var direction;
        // measure duration
        var duration = +new Date() - start.time;
        if (this.props.vertical) {
          isValidSlide = Number(duration) < 250 && Math.abs(delta.y) > 20 || Math.abs(delta.y) > this.containerHeight/2;
          direction = delta.y < 0;
        } else {
          isValidSlide = Math.abs(delta.x) > 20 || Math.abs(delta.x) > this.containerWidth/2;
          direction = delta.x < 0;
        }
        if (isValidSlide) {
          if (direction) {
            if (this.curPannelIndex !== this.endPannelIndex) {
              this.slideChange(this.curPannelIndex+1);
            }
          } else {
            if (this.curPannelIndex !== 0) {
              this.slideChange(this.curPannelIndex-1);
            }
          }
        }
        // kill touchmove and touchend event listeners until touchstart called again
        this.scrollBoxEl.removeEventListener('touchmove', events, false)
        this.scrollBoxEl.removeEventListener('touchend', events, false)
      }
    };

    this.scrollBoxEl.addEventListener('touchstart', events, false);
  }

  slideChange(num, callback) {
    let containerUnit = this.getContainerUnit();
    if (typeof num == 'number') {
      this.moveBoxDistance = num * containerUnit;
    } else {
      let nextPannelD = this.moveBoxDistance + containerUnit;
      let endPannelD = containerUnit * (this.pannelNum - 1);
      // 如果是最后一帧 特殊处理
      if (nextPannelD > endPannelD) {
        this.moveBoxDistance = 0;
      } else {
        this.moveBoxDistance += containerUnit;
      }
    }
    this.curPannelIndex = this.getPannelIndex();
    let moveNum = this.moveBoxDistance <= 0 ? 0 : -this.moveBoxDistance;
    let widthStyle = {
      left: moveNum,
      WebkitTransition: `left ${this.props.speed}ms ${this.props.effect}`
    }
    let heightStyle = {
      top: moveNum,
      WebkitTransition: `top ${this.props.speed}ms ${this.props.effect}`
    }
    this.setState(prevState => {
      return {
        scrollBoxStyle: {
          ...prevState.scrollBoxStyle, 
          ...(this.props.vertical ? heightStyle : widthStyle)
        }
      }
    });
  }

  setPannelIndex(index, callback) {
    let num = parseInt(index, 10);
    num = (num <= 0) ? 0 : num;
    this.slideChange(num, callback);
  }

  getContainerUnit() {
    return this.props.vertical ? this.containerHeight : this.containerWidth;
  }

  getPannelIndex() {
    let tabListIndex = this.moveBoxDistance / this.getContainerUnit();
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

  stop() {
    if (this.setIntervalObj) {
      clearInterval(this.setIntervalObj);
      this.setIntervalObj = null;
    }
  }

  componentWillUnmount() {
    this.stop();
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
    const { className, children, contentClass,　dots, navClass, vertical, ...others } = this.props;
    const classes = classnames('breeze-slides', className);
    return (
      <div className={classes} {...others} ref="container">
        <div className={classnames('slide-content', contentClass)}>
        <div
						className={classnames('scroll-box', {horizontal: !vertical})}
						ref="scrollBox"
						style={this.state.scrollBoxStyle}
					>
						{this.renderChildren()}
					</div>
        </div>
        { 
          dots
          &&
          <div
						className={classnames(navClass, 'nav-content', vertical ? 'vertical' : 'horizontal')}
						style={vertical ? {height: this.containerHeight} : {width: this.containerWidth}}
					>
						{this.renderNavContent()}
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
  dots: true,
  effect: 'ease-in',
  onPannelTap: () => void 0 ,
  vertical: false,
}

Slides.propTypes = {
  autoSlide: PropTypes.bool,
  defaultIndex: PropTypes.number,
  viewTime: PropTypes.number,  // 可视停留时间
  speed: PropTypes.number, //　动画时间
  effect: PropTypes.string, // 动画效果
  onPannelTap: PropTypes.func,
  dots: PropTypes.bool,
  contentClass: PropTypes.string,
  pannelClass: PropTypes.string,
  navClass: PropTypes.string,
  vertical: PropTypes.bool
};