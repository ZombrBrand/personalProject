const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: './modules/app.js',
	output: {
		filename: './pick/app.js'
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader','postcss-loader']
		},{
			test: /\.(jsx|js)$/,
			use: {
				loader: 'babel-loader'
			},
			exclude: /node_modules/
		},{
			test: /\.vue$/,
			use: ['vue-loader']
		},{
			test: /\.less$/,
			use: ['vue-style-loader','css-loader','less-loader']
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: path.resolve(__dirname),
		host: '192.168.10.102',
		compress: true,
		open: true
	}
}