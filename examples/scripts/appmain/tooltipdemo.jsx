import React, {Component} from 'react';
import ToolTip from '../../../src/tooltip/tooltip';
import './tooltipdemo.styl';

class ToolTipDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button1: false
    };
    this.onHandleButton1 = this.onHandleButton1.bind(this);
  }

  onHandleButton1() {
    this.setState((prevState) => {
      return {
        button1: !prevState.button1
      };
    });
  }

  render() {
    return (
      <div className="tooltip-demo">
        <div className="button button1" onTouchTap={this.onHandleButton1}>
          button1
          <ToolTip position="bottom" content="tooltip" isShowing={this.state.button1} />
        </div>
        <div className="button button3">
          button3
          <ToolTip position="right" content="tooltip" isShowing={true} />
        </div>
        <div className="button button4">
          button4
          <ToolTip position="left" content="tooltip" isShowing={true} />
        </div>
         <div className="button button2">
          button2
          <ToolTip position="top" content="tooltip" isShowing={true} />
        </div>
      </div>
    );
  }
}

export default ToolTipDemo;