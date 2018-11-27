import React, {Component} from 'react';
import { Icon } from '../../../src/index';
import './icondemo.styl';

class IconDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="icon-demo">
        <div className="icon-wrap">
          <Icon type="discover" />
          <div className="icon-name">icon-discover</div>
        </div>
        <div className="icon-wrap">
          <Icon type="wealth" />
          <div className="icon-name">icon-wealth</div>
        </div>
        <div className="icon-wrap">
          <Icon type="home_page" />
          <div className="icon-name">icon-home_page</div>
        </div>
        <div className="icon-wrap">
          <Icon type="Smile" />
          <div className="icon-name">icon-smile</div>
        </div>
        <div className="icon-wrap">
          <Icon type="fav-solid" />
          <div className="icon-name">icon-fav-solid</div>
        </div>
        <div className="icon-wrap">
          <Icon type="close" />
          <div className="icon-name">icon-close</div>
        </div>
      </div>
    );
  }
}

export default IconDemo;