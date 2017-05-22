// 随时随地将你的当前目录变成一个静态文件服务器的根目录。
    cnpm i -g anywhere	

### 淘宝npm镜像
    $ npm install -g cnpm --registry=https://registry.npm.taobao.org

### 命令：

#### 只通过本地安装，在这个文件夹下可以找到对应的执行文件
	./node_modules/.bin/

#### 下载所有依赖包
	cnpm install

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

#### browserify 打包工具
	npm install browserify -g
	npm install browserify --save-dev 

	browserify commonjs/b.js > index.js 

#### less CSS转换器
	npm install less -g
	npm install less --save-dev

	lessc css/index.less > index.css

#### CSS压缩
	npm install less-plugin-clean-css -g

	lessc css/index.less > index.css --clean-css="advanced"
