import React, {Component} from 'react';
import Slides from '../../../src/slides/slides';
import Pannel from '../../../src/slides/pannel';
// import './slidesdemo.styl';

class SlidesDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="slides-demo">
        <Slides>
          <Pannel />
          <Pannel />
          <Pannel />
        </Slides>
      </div>
    );
  }
}

export default SlidesDemo;