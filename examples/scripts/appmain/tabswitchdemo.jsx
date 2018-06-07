import React, {Component} from 'react';
import { TabSwitch, TabCont }  from '../../../src/tabswitch/tabswitch';
import { Tab, Tabs }  from '../../../src/tabswitch/tabs';
// import Icon from './tabs';
import './tabswitchdemo.styl';

class TabSwitchDemo extends Component {
  constructor(props) {
    super(props);
  }

  onChange(i) {
    console.log('on change', i);
  }

  render() {
    return (
      <div className="tab-switch-demo">
        <TabSwitch onChange={this.onChange.bind(this)} 
              activeIndex={1} >
          <Tabs className="home-nav">
            <Tab>
              <div className="nav-item">
                昨天
              </div>
            </Tab>
            <Tab>
              <div className="nav-item">
                今天
              </div>
            </Tab>
             <Tab>
              <div className="nav-item">
                后天
              </div>
            </Tab>
          </Tabs>
          <div className="tabs-cont">
            
            <TabCont>
              <div>由来称独立，本自号倾城。</div>
            </TabCont>

            <TabCont>
              <div>柳叶眉间发，桃花脸上生。</div>
            </TabCont>

            <TabCont>
              <div>腕摇金钏响，步转玉环鸣。</div>
            </TabCont>

          </div>
        </TabSwitch>
      </div>
    );
  }
}

export default TabSwitchDemo;