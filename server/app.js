'use strict';

let http = require('http');
let path = require('path');
let util = require('util');
let opn = require('opn');
let webpack = require('webpack');
let express = require('express');

let app = express();

let getConfig = require('../webpack.base.config');
let config = getConfig();
let compiler = webpack(config);

let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');

let staticDir = path.resolve(__dirname, '../' + 'examples'); // for local dev

app.use(webpackDevMiddleware(compiler, config.devServer));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr', 
    heartbeat: 10 * 1000
}));

// serve static files
app.use(express.static(staticDir));

app.get('/', function(req, res, next) {
  var filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, function(err, result){
    if (err) {
      return next(err);
    }
    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
  // res.sendFile(path.join(__dirname, '/demo.html'));
});

http.createServer(app).listen(process.env.PORT || 3000, function() {
  let url = util.format('http://%s:%d', 'localhost', 3000);
  console.log('Listening at %s', url);
  opn(url + '/index.html');
});



