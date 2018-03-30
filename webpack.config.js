const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    './src/index.js', 
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'src/index.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { //  to load react-cropper styles
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      { //  loader configuration that does not scramble the image file names in the build task 
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [{
          loader: 'graphql-tag/loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: { 
    historyApiFallback: true, // router fallback
    compress: true,
    disableHostCheck: true
  } 
}