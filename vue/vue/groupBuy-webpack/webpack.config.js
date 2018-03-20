module.exports = {
	entry: './static/app.js',
	output: {
		filename: './pack/index.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	}
}