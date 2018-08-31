import React, {Component} from 'react';
import { Progress } from '../../../src/index';
import './progressdemo.styl';

class ProgressDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="progress-demo">
        <Progress className="progress-wrap" min={0} max={50} />
        <Progress className="progress-wrap" min={30} max={50} />
        <Progress className="progress-wrap" min={30} max={50} position="bottom" />
        <Progress className="progress-wrap" min={30} max={50} position="middle" />
        <Progress className="progress-wrap" min={60} max={50} />
      </div>
    );
  }
}

export default ProgressDemo;