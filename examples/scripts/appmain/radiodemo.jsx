import React, {Component} from 'react';
import {Radio, RadioGroup} from '../../../src/radiogroup/radiogroup';
import './radiodemo.styl';

class RadioDemo extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    console.log('on change');
    this.props.onChange && this.props.onChange() ;
  }

  render() {
    return (
      <RadioGroup className="radio-demo" selectedIndex={1}>
        <Radio name="input-radio" 
            className="input-radio" 
            text="This is radio 1"
            onChange={this.onChange} />
        <Radio name="input-radio" 
            className="input-radio" 
            text="This is radio 2"
            onChange={this.onChange} />
        <Radio name="input-radio" 
            className="input-radio" 
            text="This is radio 3"
            onChange={this.onChange} />
        <Radio name="input-radio" 
            className="input-radio" 
            text="This is radio 4"
            onChange={this.onChange}
            disabled />
      </RadioGroup>
    );
  }
}

export default RadioDemo;