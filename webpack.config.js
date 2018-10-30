const dev = false;

const webpack = require('webpack');
const path = require('path');

function addPlugins (obj, i) {
  obj.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      },
      minimize: true
    })
  ];
  if (i === 1) {
    obj.optimization = {
      minimize: true
    };
    /*
    {
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    }
    */
  }
  return obj;
}

const cfg = {
  entry: './src',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/env', {'modules': false}]]
        },
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'dist/sourcemap-transformer.js',
    libraryTarget: 'umd',
    library: 'sourcemap-transformer'
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', path.join(__dirname, 'src'), __dirname]
  },
  devtool: dev ? 'eval-cheap-module-source-map' : 'source-map',
  target: 'node'
};

const cfgMinified = Object.assign({}, cfg); // Clone top level
cfgMinified.output = Object.assign({}, cfg.output); // Clone deeper level
cfgMinified.output.filename = cfgMinified.output.filename.replace(/\.js$/, '.min.js');

module.exports = [cfg, cfgMinified].map(addPlugins);
