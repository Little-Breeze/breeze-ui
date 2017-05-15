import React, {Component} from 'react';

class CountDown extends Component {

  static prefix = 'count-down';

  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      mins: 0,
      seconds: 0
    };
  }

  componentDidMount() {
    this.interval = false;
    this.endTime = 0;
    this.start();
  }

  start() {
    if (this.interval) return;
    this.draw();
    this.interval = setInterval(
      this.draw(),
      this.props.refresh
    );
  }

  draw = () => {
    let date = this.getDiffDate();
    this.setState(date);
  }

  getDiffDate() {
    let diff = this.props.timestamp - (this.endTime++);
    if (diff <= 0) {
      if (this.interval) {
        this.stop();
        this.onEnd();
      }
      return {
        days: 0,
        hours: 0,
        mins: 0,
        seconds: 0
      };
    }

    if (diff >= 86400) {
      let days = Math.floor(diff / 86400);
      diff -= days * 86400;
    }
    if (diff >= 3600) {
      let hours = Math.floor(diff / 3600);
      diff -= hours * 3600;
    }
    if (diff >= 60) {
      let mins = Math.floor(diff / 60);
      diff -= mins * 60;
    }
    let seconds = Math.floor(diff);

    return {
      days: days,
      hours: hours,
      mins: mins,
      seconds: seconds
    };
  }

  stop() {
    // console.log('stop');
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = false;
    }
  }

  onEnd() {
    // do something on end
    this.props.endCallback();
  }

  addZero(num) {
    num += '';
    if (num.length === 2) return;
    return '0' + num;
  }

  componentWillUnmount() {
    this.stop();
  }

  render() {
    const { className, timestamp, endCallback, ...others } = this.props;
    const classes = CountDown.prefix + ' ' + className;
    let { hours, minutes, seconds } = this.state;
    return (
      <div className={classes} 
           {...others}>
        <span className="hours">{this.addZero(hours)}</span> :
        <span className="minutes">{this.addZero(minutes)}</span> :
        <span className="seconds">{this.addZero(seconds)}</span> 
      </div>
    );
  }
}

CountDown.defaultProps = {
  className: '',
  refresh: 1000, // ms
  endCallback: () => void 0;
};

CountDown.propTypes = {
  timestamp: React.PropTypes.number.isRequired,
  endCallback: React.PropTypes.func
};

export default CountDown;