import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styl/normalize.styl';
import './styl/iconfont.styl';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('app'));