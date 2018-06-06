import React, {Component} from 'react';
import Button from '../../../src/button/button';
import './buttondemo.styl';

class ButtonDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="button-demo">
        <div className="buttons">
          <Button size="large">Large</Button>
          <Button>Default</Button>
          <Button size="small">Small</Button>
        </div>
        <div className="buttons">
          <Button size="large" icon="discover">Large</Button>
          <Button icon="discover">Default</Button>
          <Button size="small" icon="discover">Small</Button>
        </div>
        <div className="buttons">
          <Button size="large" disabled={true}>Large</Button>
          <Button icon="discover" disabled={true}>Default</Button>
          <Button size="small" disabled={true}>Small</Button>
        </div>
      </div>
    );
  }
}

export default ButtonDemo;