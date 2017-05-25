var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

//css与js打包分离更改目录放置,需要实例化插件
var extractCSS = new ExtractTextPlugin('css/index.css')

// var HtmlWebpackPlugin = require('html-webpack-plugin') 

module.exports = {
	entry: {
		app: __dirname + "/src/js/index.js", //唯一入口文件
		// more: [__dirname + "/src/js/a.js",__dirname + "/src/js/b.js"],	//引入组件等等
		v: ['jquery'] //引入公共库
	},
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
			},
			{
				test:/\.png|\.jpg$/,
				loader:"url-loader?limit=5000&name=../assets/img/[hash:8].[name].[ext]"
			},
			{
				test:/\.html$/,
				loader:"html-loader"
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
		}),

		// 声明全局
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		// 插件块，可以将一些插件块独立得导出来成js
		new webpack.optimize.CommonsChunkPlugin({
			name:'v',
			filename:'lib/jquery.min.js'
		})

		// 如果额外引入组件之类的js
		// new webpack.optimize.CommonsChunkPlugin({
		// 	names:['a','b']
		// })
	],
	// 加载自己的jquery
	// externals:{
	// 	jquery:"http://libs.baidu.com/jquery/1.9.1/jquery.min.js"
	// },
	
	// resolve:{	//需要从外部引入自己的公共库函数或者方法
	// 	root:'d:/js/',	//指定引入地址
	// 	extensions:['','.js'],	//引入的文件
	// 	alias:{
	// 		addAdd:'add.js'	//别名
	// 	}
	// }
	// 引入方式，到入口文件src/index.js
	// var add = require('appAdd').add
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