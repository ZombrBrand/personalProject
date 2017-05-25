var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

//css与js打包分离更改目录放置,需要实例化插件
var extractCSS = new ExtractTextPlugin('css/index.css')

// var HtmlWebpackPlugin = require('html-webpack-plugin') 

module.exports = {
	entry: __dirname + "/src/js/index.js", //唯一入口文件
	output: {
		path: __dirname + "/assets/",
		filename:"js/index.js",
		publicPath:"./assets/"	//公共路径，webpack-server在缓存中加载经过webpack模块化的地址
	},
	devServer: {
	  contentBase: "./", //还没明白有什么用，不写也可以使用
	  host:'127.0.0.1',
	  port: '9000'
	},
	module: {
		loaders:[	//webpack1.x的写法
			{ 
				test: /\.js$/, 
				loader: "babel-loader", 
				query: {
					presets: ['es2015','react']
				}
			},
			{
				test:/\.css$/,
				// loader:'style-loader!css-loader'
				
				// css与js打包分离配置
				// loader: ExtractTextPlugin.extract({
				// 	fallback:'style-loader',
				// 	use:'css-loader'
				// })
				
				// css分离打包更改目录存放
				loader: extractCSS.extract({
					fallback:'style-loader',
					use:'css-loader'
				})
			},
			{
				test:/\.less$/,
				loader:'style!css!less'
			},
			{
				test:/\.json$/,
				loader:"json-loader"
			}
		]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		// new ExtractTextPlugin("index.css")
		extractCSS,
		// new HtmlWebpackPlugin({
		// 	title: 'liangzj',
		// 	filename: '../index.html'
		// })
		new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
		})
	]
}





// webpack2.x的写法
// module: {
// +   rules: [
//       {
//         test: /\.css$/,
// +       use: [
// +         {
// +           loader: "style-loader"
// +         },
// +         {
// +           loader: "css-loader",
// +           options: {
// +             modules: true
// +           }
// +         }
//         ]
//       },
//       {
//         test: /\.jsx$/,
//         loader: "babel-loader", // 这里不再使用 "use"
//         options: {
//           // ...
//         }
//       }
//     ]
//   }