import React, {Component} from 'react';

class Checkbox extends Component {
  constructor(args) {
    super(args);
    this.state = {
      labelId: 'checkbox-' + Math.random().toString('16').slice(2),
      checked: this.props.checked || false
    };
  }

  onChange(e) {
    this.props.onChange && this.props.onChange(e, e.target.checked);
    e.target.checked = !!!e.target.checked;
    this.setState({
        checked: !!!e.target.checked
    });
  }

  render() {
    const {className, children, name, text, ...others} = this.props;
    let {labelId, checked} = this.state;
    const classes = 'Checkbox ' + className;
    return (
      <label htmlFor={labelId} className={classes}>
        <input name={name}
          type="checkbox"
          id={labelId}
          checked={checked}
          {...others}
          onChange={this.onChange.bind(this)} />
        <span className="Form-ele__label">
          {text || children}
        </span>
      </label>
    );
  }
}

Checkbox.defaultProps = {
  className: '',
  onChange: () => {}
};

Checkbox.propTypes = {
  name: React.PropTypes.string,
  className: React.PropTypes.string,
  checked: React.PropTypes.bool,
  text: React.PropTypes.string
};

export default Checkbox;