### 随时随地将你的当前目录变成一个静态文件服务器的根目录
    cnpm i -g anywhere	

### 淘宝npm镜像
    $ npm install -g cnpm --registry=https://registry.npm.taobao.org

### 命令：

#### 只通过本地安装，在这个文件夹下可以找到对应的执行文件
	./node_modules/.bin/

#### 下载所有开发依赖包(devDependencies)
	cnpm install

#### 下载所有生产依赖包(dependencies)
	cnpm i --production

#### babel 转化JS代码
	npm install -g babel-cli
	npm install --save-dev babel-cli   

	npm install -babel-preset-es2015 --save-dev   //ES6转换器

配置文件：
	//.babelrc文件 
	{
		"preset": [
			"es2015"
		],
		"plugins": []
	}

	babel es6.js -o es5.js //文件转换
	babel src -d build	//转换文件夹，批量转换
	babel --watch src -d bulid	//监控文件夹，只要有更新，直接转换
	babel-node es6.js  //直接转换读取es6

#### 浏览器同步测试工具
	npm install browsers-sync -g

	browsers-sync start --server	//开启服务器
	browsers-sync start --server -f bulid/*  开启服务器并监控文件变动

#### browserify js打包工具
	npm install browserify -g
	npm install browserify --save-dev 

	browserify commonjs/b.js > index.js 

#### js压缩
	npm install uglifyjs -g

	uglifyjs index.js -m -o index.min.js

	所谓 JavaScript 混淆:
	基本就是重命名局部变量（YUI Compressor 也可以配置参数，拒绝变量重命名）
	移除代码空白（Space、Tab、Line-Feed）在相同语义的情况下压缩代码，比如去掉末尾分号（Remove Terminator Semicolons），常量替换（Constant Propagation）


#### less CSS转换器
	npm install less -g
	npm install less --save-dev

	lessc css/index.less > index.css

#### CSS压缩
	npm install less-plugin-clean-css -g

	lessc css/index.less > index.css --clean-css="advanced"

#### img压缩(后端使用)
	npm install node-smushit -g

	smushit img

#### img压缩(前端使用，免费每月500张)
	npm install tinify

	tinify img

#### base64-css 图片base64转换
	npm install base64-css

	不使用全局化命令：
	node node_modules.base64-css/bin/cli.js -f index.css