import React, { Component } from 'react';
import classnames from 'classnames';
import { Tab, Tabs } from './tabs.jsx';
import './tab-switch';

export class TabCont extends Component {

  render() {
    const { active, className, children, onShow, onHide, ...others } = this.props;
    const classes = classnames('tab-cont', {'active': active}, className);
    return (
      <div className={classes} {...others}>
        {children}
      </div>
    );
  }
}

TabCont.propTypes = {
  active: React.PropTypes.bool,
  className: React.PropTypes.string,
  onShow: React.PropTypes.func,
  onHide: React.PropTypes.func
};

TabCont.defaultProps = {
  onShow: () => console.log('show'),
  onHide: () => console.log('hide') 
};

export class TabSwitch extends Component {
  constructor(props) {
    super(props);
    let selected;
    React.Children.map(props.children, (tabCont, index) => {
      if (tabCont.props.active) selected = index ;
    });
    this.state = {
      activeIndex: selected !== undefined ? selected : (props.activeIndex || 0)
    };
  }

  onTabChange(index, tab) {
    let preIndex = this.state.activeIndex;
    if (index === preIndex) return;
    let preTabContInstance = this.refs['tab-cont-' + preIndex];
    preTabContInstance.onHide && preTabContInstance.onHide() ;
    this.props.onChange && this.props.onChange(index, tab) ;
    this.setState({ activeIndex: index }, () => {
      let tabContInstance = this.refs['tab-cont-' + index];
      if (tabContInstance && tabContInstance.onShow) tabContInstance.onShow() ;
    });
  }

  render() {
    const { className, children, activeIndex, keepOneCont = false, ...others } = this.props;
    const classes = classnames('tab-switch', className);

    const newProps = {
      activeIndex: this.state.activeIndex,
      onTabChange: this.onTabChange.bind(this)
    };

    let tabs = children[0];
    let contsWrap = children[1];

    let newTabs = React.cloneElement(tabs, {
      activeIndex: this.state.activeIndex,
      onTabChange: this.onTabChange.bind(this)
    });

    let newConts = this.conts = contsWrap.props.children.map((tabCont, index) => {
      let newEl = React.cloneElement(tabCont, {
        key: index,
        active: this.state.activeIndex === index,
        ref: 'tab-cont-' + index
      });
      return newEl;
    });

    let newContsWrap = React.cloneElement(contsWrap, 
      {}, 
      keepOneCont ? newConts[this.state.activeIndex] : newConts
    );

    return (
      <div className={classes}>
        { newTabs }
        { newContsWrap }
      </div>
    );
  }
}
