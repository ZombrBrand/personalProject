const path = require('path')

module.exports = {
	entry: { 
		entry: './src/entry.js',
		entry11:	'./src/entry1.js'
	},	
	output: {	
		path: path.resolve(__dirname,'dist'),
		filename:	'[name].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use:	['style-loader','css-loader']			
			}
		]
	},
	plugins: [],
	devServer:	{
		contentBase: path.resolve(__dirname,'dist'),
		compress: true,
		host: '192.168.10.102',
		port: 888
	}
}