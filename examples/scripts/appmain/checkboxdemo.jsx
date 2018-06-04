import React, {Component} from 'react';
import Checkbox from '../../../src/checkbox/checkbox';
import './checkboxdemo.styl';

class CheckboxDemo extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    console.log('on change');
  }

  render() {
    return (
      <div className="checkbox-demo">
        <Checkbox name="input-check" 
            className="input-check" 
            text="This is checkbox"
            onChange={this.onChange} />
        <Checkbox name="input-check1" 
            className="input-check" 
            text="This is another"
            onChange={this.onChange}
            checked={true} />
        <Checkbox name="input-check1" 
            className="input-check" 
            text="checkbox disabled"
            onChange={this.onChange}
            disabled={true} />
      </div>
    );
  }
}

export default CheckboxDemo;