import React, {Component} from 'react';
import Slides from '../../../src/slides/slides';
import Pannel from '../../../src/slides/pannel';
import './slidesdemo.styl';

import img1 from '../../imgs/01.jpg';
import img2 from '../../imgs/02.jpg';
import img3 from '../../imgs/03.jpg';
import img4 from '../../imgs/04.jpg';
import img5 from '../../imgs/05.jpg';

class SlidesDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="slides-demo">
        <Slides className="slides-wrap" defaultIndex={2}>
          <Pannel>
            <img src={img1} />
          </Pannel>
          <Pannel>
            <img src={img2} />
          </Pannel>
          <Pannel>
            <img src={img3} />
          </Pannel>
          <Pannel>
            <img src={img4} />
          </Pannel>
          <Pannel>
            <img src={img5} />
          </Pannel>
        </Slides>

        <Slides className="slides-wrap" showNav={false} speed={500}>
          <Pannel>
            <img src={img1} />
          </Pannel>
          <Pannel>
            <img src={img2} />
          </Pannel>
          <Pannel>
            <img src={img3} />
          </Pannel>
          <Pannel>
            <img src={img4} />
          </Pannel>
          <Pannel>
            <img src={img5} />
          </Pannel>
        </Slides>
      </div>
    );
  }
}

export default SlidesDemo;