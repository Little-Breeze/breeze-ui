import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  constructor(args) {
    super(args);
    this.state = {
      labelId: 'checkbox-' + Math.random().toString('16').slice(2),
      isChecked: this.props.checked || false
    };

  }

  onChange(e, id) {
    this.props.onChange && this.props.onChange(e.target.checked, id);
    e.target.checked = !!!e.target.checked;
    this.setState({
      isChecked: !!!e.target.checked
    });
  }

  render() {
    const {id, className, children, name, text, checked, disabled, ...others} = this.props;
    let {labelId, isChecked} = this.state;
    const classes = 'Checkbox ' + className;
    return (
      <label htmlFor={labelId} className={classes}>
        <input name={name}
          type="checkbox"
          id={labelId}
          checked={isChecked}
          disabled={disabled}
          {...others}
          onChange={(e) => { this.onChange(e, id) }} />
        <label htmlFor={labelId}></label>
        <span className="Form-ele__label">
          {text || children}
        </span>
      </label>
    );
  }
}

Checkbox.defaultProps = {
  className: '',
  name: '',
  onChange: () => {}
};

Checkbox.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  id: PropTypes.number
};

export default Checkbox;