import React, {Component} from 'react';
import { Dialog } from '../../../src/index';
import { Button } from '../../../src/index';
import './dialogdemo.styl';

class DialogDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    }
  }

  onDismiss() {
    this.setState({
      dialogOpen: false,
    });
  }

  openDialog() {
    this.setState({
      dialogOpen: true,
    });
  }

  render() {
    return (
      <div className="dialog-demo">
        <Button size="large" onClick={ this.openDialog.bind(this) }>Open Dialog</Button>
        <Dialog 
          isOpen={ this.state.dialogOpen } 
          onDismiss={this.onDismiss.bind(this)}
          style={{ color: 'red' }}>
          <p>This Text has red color.</p>
          <Button size="small" onClick={ this.onDismiss.bind(this) }>close</Button>
        </Dialog>
      </div>
    );
  }
}

export default DialogDemo;