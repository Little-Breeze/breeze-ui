// for build use

'use strict';

const path = require('path');
const webpack = require('webpack');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;

const appDir = path.resolve(process.cwd(), 'examples');
const srcDir = path.resolve(process.cwd(), 'src');
const distDir = path.resolve(process.cwd(), 'dist');
const nodeModPath = path.resolve(__dirname, './node_modules');
const pathMap = require('./pathmap.json')

module.exports = () => {

  let publicPath = '/';
  let scriptsDir = path.resolve(appDir, 'scripts');

  let config = {

    entry: {
      main: [
        `${appDir}/scripts/main.js`,
      ]
    },

    output: {
      path: distDir,
      filename: 'js/[name].[hash:8].js',
      // publicPath: publicPath
    },

    resolve: {
      root: [appDir, srcDir, nodeModPath],
      alias: pathMap,
      extensions: ['', '.js', '.jsx', '.css', '.styl', '.png', '.jpg']
    },

    debug: true,

    devtool: 'source-map',

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          // exclude: /node_modules/,
          include: [appDir, srcDir],
          loader: 'babel',
          query: {
            presets: ['react', 'env']
          }
        }, 
        {
          test: /\.(svg|jpe?g|png|gif|ico)$/,
          loaders: [
            // url-loader更好用，小于10KB的图片会自动转成dataUrl，
            // 否则则调用file-loader，参数直接传入
            'url?limit=10000&name=imgs/[hash:8].[name].[ext]',
            'image-webpack?{bypassOnDebug:true, progressive:true,optimizationLevel:7,pngquant:{quality:"65-80",speed:4}}'
          ]
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader?name=css/fonts/[name].[ext]'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
          // loader: ExtractTextPlugin.extract("css", "css-loader"),
        },
        {
          test: /\.styl$/,
          // loader: ExtractTextPlugin.extract('style-loader/url!css-loader!stylus-loader'),
          // loaders: ["style-loader/url","file?name=css/[name].[hash].css!extract","css-loader","stylus-loader"],
          loaders: ['style-loader', 'css-loader', 'autoprefixer-loader', 'stylus-loader'],
          exculde: /node_modules/
        }
        
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: appDir + '/tmpl.ejs',
        filename: 'index.html',
        inject: 'body',
        // chunks: ['main']
        chunksSortMode: 'dependency'
      })
      
    ],

    devServer: {
      // hot: true,
      noInfo: false,
      inline: true,
      publicPath: publicPath,
      stats: {
          cached: false,
          colors: true
      }
    }

  };

  config.entry.main.push('webpack-hot-middleware/client?reload=true');
  // config.plugins.push(new DefinePlugin({'process.env': {'API': `"${env}"`}}));
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());

  return config;

};