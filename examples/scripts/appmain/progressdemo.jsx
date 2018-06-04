import React, {Component} from 'react';
import Progress from '../../../src/progress/progress';
import './progressdemo.styl';

class ProgressDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="progress-demo">
        <Progress className="progress-wrap" min={10} max={50} />
      </div>
    );
  }
}

export default ProgressDemo;