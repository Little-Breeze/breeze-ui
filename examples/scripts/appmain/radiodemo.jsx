import React, {Component} from 'react';
import Radio from '../../../src/radio/radio';
import './radiodemo.styl';

class RadioDemo extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    console.log('on change');
  }

  render() {
    return (
      <div className="radio-demo">
        <Radio name="input-radio" 
            className="input-radio" 
            text="This is radio"
            onChange={this.onChange} />
        <Radio name="input-radio" 
            className="input-radio" 
            text="This is radio"
            onChange={this.onChange}
            checked={true} />
        <Radio name="input-radio" 
            className="input-radio" 
            text="This is radio"
            onChange={this.onChange}
            disabled={true} />
      </div>
    );
  }
}

export default RadioDemo;