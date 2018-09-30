import React, {Component} from 'react';
import { Wizard, WzStep } from '../../../src/index';
// import Button from '../../../src/index';
import './wizarddemo.styl';

class WizardDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container find-pwd-container">
        <div className="find-pwd-content fade-ng-cloak init-ng-cloak" ng-controller="PasswordResetFormCtrl">
          <Wizard>
            <WzStep
                title="One" 
                onAdvance={(done) => done()} 
                nextButton={<button className="btn btn-wide btn-primary first-step">下一步</button>}
              >
                <div>
                  Step One
                </div>
              </WzStep>
              <WzStep
                title="Two" 
                onAdvance={(done) => done()} 
                nextButton={<button className="btn btn-wide btn-primary first-step">下一步</button>}
              >
                <div>
                  Step Two
                </div>
              </WzStep>
              <WzStep
                title="Three" 
                onAdvance={(done) => done()} 
                nextButton={<button className="btn btn-wide btn-primary first-step">下一步</button>}
              >
                <div>
                  Step Three
                </div>
              </WzStep>
              <WzStep
                title="Four" 
              >
                <div>
                  Step four
                </div>
              </WzStep>
          </Wizard>
        </div>
      </div>
    );
  }
}

export default WizardDemo;