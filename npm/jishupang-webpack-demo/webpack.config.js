const path = require('path')
const Uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const glob = require('glob')
const PurifyCSSPlugin = require("purifycss-webpack")
const entry = require("./webpack.config/entry.js")
const webpack = require("webpack")
const copyWebpackPlugin = require("copy-webpack-plugin")


let address = {}

if (process.env.type == "build") {
  address["publicPath"] = "http://cdn.jspang.com"
} else {
  address["publicPath"] = "http://192.168.2.153:1400/"
}


module.exports = {
  devtool: "source-map",
  entry: entry.path,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: address.publicPath
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: extractTextPlugin.extract({ 
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          }, {
            loader: "postcss-loader"
          }]
        })
      },
      {
        test: /\.(jpg|png|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        use: ["html-withimg-loader"]
      },
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // new Uglify()
    new webpack.optimize.CommonsChunkPlugin({
      name: ['jquery','vue'],
      filename: "assets/js/[name].js",
      minChunks: 2
    }),
    new webpack.BannerPlugin('lzijian编写的组件代码'),
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      template: './src/index.html'
    }),
    new extractTextPlugin("css/index.css"),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    }),
    new copyWebpackPlugin([{
      from: __dirname + '/src/public',
      to: './public'
    }]),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: '192.168.2.153',
    port: 1400
  },
  watchOptions: {
    poll: 1000,
    aggregeateTimeout: 500,
    ignored: /node_modules/
  }
}