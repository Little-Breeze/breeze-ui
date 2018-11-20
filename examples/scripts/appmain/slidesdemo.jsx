import React, {Component} from 'react';
import { Slides, Pannel } from '../../../src/index';
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
        水平滑动
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

        垂直滑动
        <Slides className="slides-wrap" showNav={false} speed={500} vertical={true}>
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

        手动滑动
        <Slides className="slides-wrap" showNav={false} speed={500} autoSlide={false}>
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