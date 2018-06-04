import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class Radio extends Component {
  constructor(args) {
    super(args);
    this.labelId = 'checkbox-' + Math.random().toString('16').slice(2);
  }

  onChange(id, e) {
    this.props.onChange && this.props.onChange(id, e);
  }

  render() {
    const {id, className, children, name, text, ...others} = this.props;
    const classes = classnames('Radio', className);
    return (
      <label htmlFor={this.labelId} className={classes}>
        <input name={name}
          type="radio"
          id={this.labelId}
          {...others}
          onChange={this.onChange.bind(this, id)} />
        <label htmlFor={this.labelId}></label>
        <span className="Form-ele__label">
          {text || children}
        </span>
      </label>
    );
  }
}

Radio.defaultProps = {
  className: '',
  name: '',
  onChange: () => {}
};

Radio.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.number
};

export class RadioGroup extends Component {
  constructor(args) {
    super(args);
    this.state = {
      selectedIndex: this.props.selectedIndex
    };
  }

  onChange(idx) {
    this.setState({
      selectedIndex: idx
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child, {
        checked: index === this.state.selectedIndex,
        onChange: this.onChange.bind(this, index)
      })
    );
  }

  render() {
    const { children, className, ...others } = this.props;
    const classes = classnames('radio-group', className);
    return (
      <div className={classes} {...others}>
        {
          this.renderChildren()
        }
      </div>
    );
  }
}

RadioGroup.propTypes = {
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func
};