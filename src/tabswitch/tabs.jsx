import React, { Component } from 'react';
import classnames from 'classnames';

const PREFIX = 'tabs';

export const Tab = (props) => {
  const { children, className, active, href, text, ...others } = props; 
  const classes = classnames(`${PREFIX}-item`, {'active': active}, className)
  return (
    <li className={classes} {...others}>
      {
        href ? <a href={href}>{text || children}</a> : (text || children)
      }
    </li>
  );
}

export class Tabs extends Component {

  constructor(props) {
    super(props);
    let selected;
    props.children.map((tab, index) => {
      if (tab.props.active) selected = index ;
    });
    this.state = {
      activeIndex: selected !== undefined ? selected : (props.activeIndex || 0)
    };
  }

  onTabChange(index, tab) { 
    if (!tab.props.href) {
      this.setState({ activeIndex: index });
      this.props.onTabChange && this.props.onTabChange(index, tab);
    }
  }

  render() {
    const { children, className, activeIndex, ...others } = this.props;
    const classes = classnames(`${PREFIX}-nav`, className);

    let tabs = children.map((tab, index) => (
      React.cloneElement(tab, {
        key: index, 
        active: this.state.activeIndex === index,
        onClick: this.onTabChange.bind(this, index, tab)
      })
    ));
    return (
      <div className={classes} {...others}>
        <ul>
          {tabs}
        </ul>
      </div>
    );
  }
}

Tabs.propTypes = {
  activeIndex: React.PropTypes.number,
  className: React.PropTypes.string,
  onTabChange: React.PropTypes.func
};

Tabs.Tab = Tab;