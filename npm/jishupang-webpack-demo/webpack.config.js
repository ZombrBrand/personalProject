const path = require('path')
const Uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')


let websit = {
	publicPath: "http://192.168.2.153:1111/"
}

module.exports = {
	entry: { 
		entry: './src/entry.js'
		// entry11:	'./src/entry1.js'
	},	
	output: {	
		path: path.resolve(__dirname,'dist'),
		filename:	'js/[name].js',
		publicPath: websit.publicPath
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
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
					},{
						loader: "less-loader"
					}],
					fallback: "style-loader"
				})
			}
		]
	},
	plugins: [
		// new Uglify()
		new htmlPlugin({
			minify:	{
				removeAttributeQuotes:true
			},
			hash: true,
			template: './src/index.html'
		}),
		new extractTextPlugin("css/index.css")
	],
	devServer:	{
		contentBase: path.resolve(__dirname,'dist'),
		compress: true,
		host: '192.168.2.153',
		port: 1115
	}
}