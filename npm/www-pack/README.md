#### webpack服务器
	npm install webpack-dev-server -g

	webpack-dev-server --inline 	//以inline形式启动服务器

	
#### css-*以打包的形式引进入口文件
	npm install css-loader --save-dev
	npm install style-loader --save-dev

	引入CSS文件到入口文件：
	require('index.css')	//在入口文件index.js中引入

	如何在一个CSS文件里加载别的CSS文件
	@import url('./font.css')	//在index.css中加载font.css,相当于index.css作为主CSS入口文件

#### less转换css
	npm install less-loader less --save-dev

#### 支持json的loader
	npm install json-loader --save-dev

#### babel js打包工具
	npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev
	
#### css与js打包分离工具
	npm install extract-text-webpack-plugin --save-dev

#### html帮助生成HTML文件
	npm install html-webpack-plugin --save-dev

#### uglify js压缩工具
	npm install uglify-js --save-dev

#### file-loader和url-loader
	npm install file-loader url-loader --save-dev