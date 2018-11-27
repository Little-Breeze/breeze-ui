import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './wizard.styl';

export class WzStep extends Component {

  constructor(args) {
    super(args);
    this.onAdvance = this.onAdvance.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPre = this.onPre.bind(this);
  }

  onAdvance() {
    if (this.props.onAdvance) {
      this.props.onAdvance.apply(this, [this.onNext]);
    }
  }

  onBack() {
    if (this.props.onBack) {
      this.props.onBack.apply(this, [this.onPre]);
    }
  }

  onNext() {
    this.props.onNext();
  }

  onPre() {
    this.props.onPre();
  }

  render() {
    const {isCurrent, title, className, nextButton, preButton, children, lastStep, firstStep, ...rest} = this.props;
    const classes = classnames('step wz-step', className, {current: isCurrent});

    let newPreButton = null;
    let newNextButton = null;
    if (nextButton) {
      newNextButton = React.cloneElement(nextButton, {
        onClick: this.onAdvance
      });
    }
    if (preButton) {
      newPreButton = React.cloneElement(preButton, {
        onClick: this.onBack
      });
    }

    return (
      <div className={classes} {...rest}>
        {children}
        <div className="button-wrapper">
          {lastStep ? null : newNextButton}
          {firstStep ? null : newPreButton}
        </div>
      </div>
    )
  }
}

WzStep.propTypes = {
  // public
  onAdvance: PropTypes.func,
  onBack: PropTypes.func,
  title: PropTypes.string,
  nextButton: PropTypes.element,
  preButton: PropTypes.element,
  // private
  onNext: PropTypes.func,
  onPre: PropTypes.func,
  firstStep: PropTypes.bool,
  lastStep: PropTypes.bool,
  isCurrent: PropTypes.bool,
}

export class Wizard extends Component {

  constructor(args) {
    super(args);
    this.state = {
      currentStepTitle: '',
      currentStepIndex: 0,
      steps: []
    };
  }

  componentDidMount() {
    let newSteps = React.Children.map(this.props.children, wzStep => {
      return wzStep.props.title;
    });
    this.setState({
      steps: newSteps,
      currentStepTitle: newSteps[this.state.currentStepIndex]
    });
  }

  render() {
    let {steps, currentStepIndex, currentStepTitle} = this.state;
    const {children, className, ...rest} = this.props;
    let newWzSteps = React.Children.map(children, (wzStep, index) => {
      let newWzStep = React.cloneElement(wzStep, {
        key: index,
        onNext: () => {
          this.setState({
            currentStepIndex: currentStepIndex + 1,
            currentStepTitle: steps[currentStepIndex + 1]
          });
        },
        onPre: () => {
          this.setState({
            currentStepIndex: currentStepIndex - 1,
            currentStepTitle: steps[currentStepIndex - 1]
          });
        },
        firstStep: currentStepIndex === 0,
        lastStep: currentStepIndex === steps.length - 1,
        isCurrent: index === currentStepIndex,
      });
      return newWzStep;
    });
    return (
      <div className={classnames('wizard', className)}>
        <div className="modal-header">
          <h4 className="modal-title">{currentStepTitle}</h4>
          <ul className={`steps-indicator steps-${steps.length}`}>
            {
              steps.map((stepTitle, index) => (
                <li key={index} className={classnames({default: index !== currentStepIndex, current: index === currentStepIndex})}>
                  <a><span className="step-num">{index + 1}</span>{stepTitle}</a>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="steps">
          {newWzSteps}
        </div>
      </div>
    );
  }
}
