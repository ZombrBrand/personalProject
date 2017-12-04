const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')

let websit = {
	publicPath: "http://192.168.2.153:1270/"
}

module.exports = {
	entry: {
		mobileReset: './src/js/mobileReset.js'
		// flex: './src/js/flex.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js',
		publicPath: websit.publicPath
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
			}, {
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
				test: /\.(jpg|png|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 5000,
						outputPath: 'images'
					}
				}]
			},
			{
				test: /\.(htm|html)$/i,
				use: ["html-withimg-loader"]
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			minify: {
				removeAttributeQuotes: true
			},
			hash: true,
			template: './src/index.html'
		}),
		new extractTextPlugin("css/index.css"),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		compress: true,
		host: '192.168.2.153',
		port: 1270
	},
	watchOptions: {
		poll: 1000,
		aggregeateTimeout: 500,
		ignored: /node_modules/
	}
}