#####	MVVM模式： 
			分三个部分：
				模型、视图、视图模型
				
			模型表示机器可读性强的数据（通常后端传递数据）
			视图表示人眼可读性强的数据（通常指代页面）
			视图模型
				将机器可读性强的数据【模型】，转换成人眼可读性强的数据【视图】
					如：数据绑定实现
					
				将人眼可读性强的数据【视图】，转换成机器可读性强的数据【模型】
					如：事件的监听
					
				以上数据的两个方向的传递，称为数据的双向绑定
				
			PS：双向数据绑定是MVVM模式的一大特征
			
#####	Vue就是基于MVVM模式实现的一套框架，在Vue中
			model：指代JS中的数据，如对象，数组....
			view：指代页面视图
			viewModel：指代的是vue实例化对象
			
			Vue实例化对象
				$el 绑定的容器元素
				_data 绑定了数据，数据中的属性会添加在Vue实例化对象中，并设置了特性（ES5的特性，看ES5视频课程讲解）
					数据的绑定正是因为数据设置了特性
			

			el设置容器元素
					el属性实现将视图绑定给vue实例化对象
						属性值可以是常用的css选择器
							其中自定义元素名称选择器为组件使用
					
					PS：页面中如果出现多个相同选择器，渲染第一个，后面忽略，所以在一个项目中尽量一个选择器对应一个vue实例化对象
					
			data属性绑定数据
					绑定过程：
						1 将数据存储在_data中
						2 将数据中的每一个属性添加给vue实例化对象，并设置了特性
							正是因为设置特性的缘故，所以绑定的数据data中的属性始终与vue实例化对象中添加的数据属性保持同步，不论何种类型（不区分原始值和引用类型数据）
							
							PS：
								传统对象：
										值类型复制，引用类型引用
								
								vue实例化对象：
										值类型和引用类型都是引用
						
					对于绑定的时候，数据中不存在的数据，通过vm.xxx新增一份是不会同步进去的，这份就是丢失的数据，在vue中叫`数据丢失`
							解决数据丢失：
									使用之前，在数据中定义出来，即可解决
									
							数据的绑定是单向的，只能由模型中的数据流向视图中，而不能由视图流向模型，可以通过事件监听实现视图流向模型
							
			插值
				数据绑定的本质将模型中的数据绑定给vm(vue实例化对象)，存储在实例化对象的数据在页面中是看不到的，想要展示就要使用插值
				
				插值的作用：
					将vue实例化对象中的数据，渲染到页面中
					
				语法：
					{{数据}}
					
				插值语法提供了一个js环境，因此我们可以在插值语法内使用js表达式
				
				插值过滤器
					为了复用插值表达式的业务逻辑，vue提供了插值过滤器
					
					过滤器语法：{{数据 | 过滤器名称}}
					
				
				1.0
					内置了过滤器
					可以使用属性插值
						style={{width:100px}}
					可以使用单次插值
						{{*数据}}
					可以使用渲染html插值
						{{{数据}}}
					
				PS：2.0版本全部移除，但是可以自定义过滤器
				
			指令
				就是对DOM元素的拓展，让其具备一定的功能特征
			
				v-bind指令
					让属性值变成一个js环境，供其可以使用vue中的数据变量
					
					语法糖：
						`:`
			
			数据动态绑定
				动态数据绑定又叫计算数据属性
				data绑定的数据，在渲染到页面过程中，想修改只能通过插值表达式或者插值过滤器来修改
						这里的修改是在数据获取后，页面渲染的时候修改
						
				但如果想在数据获取之前修改，可以使用动态数据绑定的语法
				
				渲染页面的时候，有两次可以更改数据的时间点
					1	动态数据绑定
					2	插值过滤或者插值表达式
					
				相对于动态数据绑定来说，data数据绑定属于静态绑定
				
				动态数据绑定通过`computed`绑定数据，属性值也是对象
						key	表示属性名称
						value	是一个函数，每次获取该数据的时候都会执行
							参数（argument）是vue实例化对象
							作用域this是vue实例化对象
							返回值就是获取的数据
							
			数据双向绑定
				数据由模型到视图（数据绑定和插值）
				数据由视图到模型（事件监听）
				
				vue提供了`v-model`指令，实现了数据双向绑定的功能
					获取dom的内容，存储在vue中
						v-model的属性值就是data绑定的数据，一定要在vue中绑定
						
				vue中，指令的属性值就是js环境，可以直接使用js表达式
				
			类的绑定
				在vue2.0中，绑定类有三种方式
					1.	v-bind:class="['bg-red red','fz-50']" 	//绑了3个类
							数组中每一个成员代表一组类（成员可以出现空格，表示多个类）
							1.0不能出现空格，只能表示一个类
							
					2.	v-bind:class="{
							red: true,
							'bg-red fz-50': true
						}"
							key	表示类的名称
								可以出现空格，表示多个类
								1.0中不能出现空格，只能表示一个类
								
							value是一个布尔值
								true	表示保留这个类
								false	表示删除这个类
				
					3.	v-bind:class="red + ' fz-50'"
							字符串可以出现空格
							
			样式绑定
				跟类绑定一样，有三种方式
					1.	v-bind:style="[
							{
								color: 'red',
								background: bg	//data属性变量
							},
							{
								padding: '10px 10px'
							}
						]"
							每一个成员是一个对象，表示一组样式
								key	表示样式名称
									由于样式名称中经常出现`-`，所以要加引号（不建议使用）
									vue建议使用驼峰命名
								
								value	表示样式属性值
								
					2.	v-bind:style="{
							color: 'red',
							background: bg	//data属性变量
						}"
							key	表示样式名称
							value	表示样式属性值
							
					3.	v-bind:style=""

			数据丢失
				1.	在数据没有在data中绑定的时候使用数据，数据会丢失
						解决：在使用前，将其预绑定
						
				2.	对于已有的数组，如果我们为其添加新成员，新的成员数据也会丢失
						解决：定义新的数组，覆盖旧有数组
							如：
								var vm = new Vue({
									el: "app",
									data: {
										oldArr: []
									}
								})
								
								oDiv.onclick = function(e) {
									//直接给oldArr添加新成员会丢失数据，如：
									//	vm.oldArr[3] = "red" 这样直接增加是无效的
								
									var newArr = []
									newArr[3] = "red"
									vm.oldArr = newArr
								}
								
			条件模版指令
				条件模板指令`v-if`可以控制元素是否创建
						true	创建元素
						false	删除元素
							v-if是真正的创建和删除，不是显示或隐藏（设置样式）
							
						`v-else`当v-if不满足条件的时候，创建v-else属性的元素
						
				`v-show`为显示或隐藏元素，属于设置样式
						原理：操作display: block/none属性
						
				vue中想要控制多个元素的创建，可以使用H5中的模板元素template
						template特点：是一个模版标签，跟普通的DOM元素一样，可以添加属性、样式等等，但是不会渲染到页面中
							如：
								var vm = new Vue({
									el: "app",
									data: {
										type: '财经',
										title: '房地产投资略有放缓 货币政策重在稳定预期'
									}
								})
							
								<template v-if="type">
									<span>type</span>
									<span>|<span>
								</template>
								<span>title</span>
								
			循环模板指令
				`v-for`:	循环创建dom元素
					语法：
						v-for="item in data"
							item 数组中的每一个成员
							data 要便利的聚合数据（数组）
						
					1.0提供的是$index变量访问循环中的索引值
					
				2.0想要访问循环中的索引值
					语法：
						v-for="(item,index) in data"
							item 数组中的每一个成员
							index 数组中的索引值
							
				PS：循环中的item、index只能循环作用域使用，在外部无法访问
					循环模板指令也可以通过<template>（控制多个元素）进行使用
					
			单选框
				单选框的数据双向绑定也通过v-model绑定
					一组单选框绑定的值是`同一个变量`
					通过value设置其值
						如：
							var vm = new Vue({
									el: "app",
									data: {
										sports: 'basketball'	//默认选中为basketball
									}
								})
								
							<label>篮球<input type="radio" v-model="sports" value="basketball"></label>
							<label>足球<input type="radio" v-model="sports" value="football"></label>
							<label>排球<input type="radio" v-model="sports" value="netball"></label>
							<h1>选中的运动：{{sports}}</h1>
							
				在1.0我们可以通过在表单元素中设置checked属性，让其默认选中，但2.0的checked失效了
				1.0中checked的优先级要高于绑定的数据
				2.0中，如果想要默认选中就要设置v-model绑定的数据
				
			多选框
				多选框的数据双向绑定也是通过v-model实现
					绑定的数据是`不同的变量`，为了方便访问绑定数据，通常都定义在对象下
					
					绑定的数据默认值为布尔值
						true	表示选中
						false	表示未选中
						
					多选框无法通过value定义值，必须通过`v-bind:true-value`或者`v-bind:false-value`绑定
						v-bind:true-value 表示选中时候的值
						v-bind:false-value	表示未选中时候的值
						
						PS：一旦绑定了v-bind:true-value或者v-bind:false-value这两个属性，那么v-model绑定的变量值必须为v-bind:true-value值才能使默认选中
						
					1.0中可以通过checked属性让其默认选中，2.0不可以，只能通过绑定的数据使其默认选中
					
			
			PS：单选框和多选框的不同点
				1.	v-model绑定数据
						单选框	绑定同一份数据
						多选框	绑定不同的数据
						
				2.	设置选框值
						单选框	value设置
						多选框	v-bind:true-value或者v-bind:false-value设置
						
				3.	绑定数据默认值
						单选框	value
						多选框	true / false
						
				相同点
					1.0	设置checked属性让其默认选中，优先级高于绑定的值
					2.0	checked属性失效，只能通过v-model绑定的数据来设置
					
			下拉框
				通过select标签定义下拉框，通过option定义选项
				通过v-model实现双向数据绑定
				
				select默认是单选框，v-model绑定的数据值为字符串
					option的默认值是innerText值，当设置了value才是value值
					
					当设置了value时，默认选中项的值必须是value的值
					
				2.0中，想设置默认选中项，要设置v-model绑定的数据
				1.0中，可以通过html的selected属性设置默认选中项
				
				多选下拉框
					通过设置multiple属性，让单选下拉框变成多选下拉框
							此时绑定的数据是一个数据

			表单特性
				1.0生效
					debounce:
						对表单绑定的数据，节流存储
							属性值就是延迟的时间 （毫秒为单位）
								<input type="text" v-model="msg" debounce="1000">
					
					lazy:
						当表单失去焦点的时候，存储数据
								<input type="text" v-model="msg" lazy>
								
			自定义过滤器
				在视图渲染数据的时候，有两次可以修改数据的机会
						1.	动态数据绑定中
						2.	插值的时候（插值表达式、插值过滤器）
						
				过滤器
					1.0	{{数据 | 过滤器名称 参数1 参数2 | 过滤器}}
					
					2.0 {{数据 | 过滤器名称（参数1，参数2）}}
					
				Vue.filter(过滤器名称，过滤函数)
						过滤函数（处理的数据，从第二个参数开始表示传递的参数）
						返回值就是渲染到页面中的数据
							作用域是window
							
			自定义指令
				定义指令分两步
					第一步	在页面模板中，使用自定义指令
						自定义属性以`v-`开头，多个单词用`-`分割，分母小写
						
					第二步	在js中，通过directive方法定义指令
						Vue.directive(指令名称，指令对象|指令方法)
							指令名称： 省略`v-`前缀
							
							指令对象
								bind	指令绑定的时候执行的方法
								update	指令的属性值更新的时候，执行的方法
								unbind	指令解除绑定的时候，执行的方法
								insteret	指令的dom元素，插入到页面中执行的方法
								componentUpdate	组件元素更新的时候，执行的方法
									
									每一个对象都有四个参数
										第一个参数表示dom
										第二个参数表示指令对象，包括指令的一些信息
										第三个参数表示当前的虚拟DOM
										第四个参数表示上一个虚拟DOM
										
							指令方法
								就是bind + update方法
								
			事件
				通过`v-on`指令定义事件，语法糖：@
					语法：v-on:事件名称="事件回调函数"
							参数集合 可写可不写
							
							事件回调函数定义在vue的methods属性中，跟data,computed一样，属性值是对象
								key	回调函数名称
								value	回调函数
									没有参数集合的时候，默认有一个参数就是事件对象
									
									当有参数集合的时候，默认没有参数，想要什么参数就传什么参数
											如果要使用事件对象，就要传递$event
											
								作用域是vue实例化对象
								
					methods中定义的方法就是vue的方法，可以在任何地方调用
						methods中定义的方法，会添加给vue
						
					vue中的事件都没有使用事件委托，因此都是直接绑定的
					
					键盘修饰符
						语法：v-on:事件名称.修饰符="回调函数"
							内置的9个键盘修饰符：
									space,enter,tab,esc,delete,up,down,left,right
									
			过渡
				2.0通过transition标签定义，通过name属性定义动画名称
					此时会根据name属性创建一些动画类，我们可以在css中定义这些动画
						例如
							<transition name="demo"></transition>
							
							css中
								.demo-enter		元素显示
								.demo-leave-to	元素隐藏
								.demo-enter-active
								.demo-leave-active	执行显隐
									
			组件
				vue组件是一个可以被服用的完整独立的模块（包含完整的HTML、css以及js）
				
				在vue中使用组件分成三步
					第一步	在页面中定义组件
								就是一个自定义元素
							
					第二步	用Vue.extend({})或者`var dose={}对象`定义组件类
								里面可以定义data,conputed,methods
									在组件中定义data不再是对象，而是函数
									
								在组件中，通过template定义组件模板视图
									可以是模板字符串
									可以是css选择器（此时模块是该选择器所对应的内容）
									
									PS:不论是模板字符串，还是css选择器内容，只能有一个根元素
									
					第三步	注册组件
								通过Vue.component将组件注册到页面中
								
								Vue.component(组件名称[自定义元素名称]，组件类)
								
								
				组件是一个完整的个体，组件之间，属性数据与方法是不会被共享的
				
				html5中新增模板元素，template元素，可以用来定义模板，该元素默认不显示
						vue建议使用template定义模板
						
				组件类继承了vue类，因此我们可以将vue实例化对象看作父组件
				
			组件通信
				组件是一个完整独立的个体，因此内部数据不能相互共享，如果想要共享就要实现组件间的通信
					组件间的数据传递，通常有两个方法，一个是由父传子，一个是由子传父
						父组件我们看成是vue实例化对象
						子组件我们看成是组件实例化对象
						
				父传子
					分两步
						第一步 	为子组件自定义元素，绑定属性数据（自定义属性数据），传递父组件中的数据
							如果使用v-bind指令，此时属性值是js环境
							如果没有使用v-bind指令，此时属性值是字符串
						
							PS：元素自定义属性，只能是小写字母，单词之间用`-`分割
							
						第二步	在子组件中，通过`props捕获`这部分数据，注册在子组件中
							PS：js中变量不能出现横线，所以要将属性名转为驼峰命名
							
					PS：当组件通过component进行动态切换时，如果组件没有重新进行加载，此时组件并不会进行通信
					
							
				子传父
					通过观察者模式实现
					
					组件或者vue实例化对象都是集成了三个方法
						$on		注册消息
						$emit	发布消息
						$off	注销消息

					发布消息或者注册消息都要在同一组件上
					工作中，我们通常在生命周期方法上注册
					
					在子组件中，可以通过`$parent`访问父组件
					
			动态组件切换
					`component`标签是一个万能组件元素，其中is属性的值是哪个组件名称，就可以动态渲染哪个组件
					
			生命周期
				beforeCreate	组件实例刚刚被创建，组件属性未被挂载
				created			组件实例创建完成，属性已绑定，DOM未生成
				beforeMount		模板编译、挂载前
				mounted			模板编译、挂载后，DOM已加载完成
				beforeUpdate	组件更新前
				updated			组件更新后
				actived			路由 keep-alive组件激活时调用
				deactived		路由 keep-alive组件移除时调用
				beforeDestory	组件销毁前调用
				destoryed		组件销毁后调用
				
#####	路由
			是实现spa的关键
			
			安装路由:
				bower install vue-router
				
			使用路由
				在路由中使用组件只需要一步，创建定义组件时传递的`参数对象`
				
				使用路由分成五步
					第一步	创建渲染的路由容器元素
								通过`router-view`元素创建
								
								PS：router-view组件相当于子组件，我们可以对其添加属性数据，实现通信
								
					第二步	定义组件对象
								创建组件的过程
								
					第三步	定义路由规则
								[{},{}]
								每一个对象，就是一个规则对象
									path	规则
									name	名称
									component	组件对象
									
					第四步	实例化路由
								路由插件提供了一个VueRouter类，我们可以实例化，并传递路由规则
									routes:routes
									
					第五步	在vue实例化对象中，注册路由
								router:router
								
			动态路由
				在路由规则中，一个`/`将路由分成两部分，默认为静态，如果在静态路由名称前面添加`:`，此时就是动态的了
					
						静态路由：名称是对应不变的
						
						动态路由：名称是可变的
						
				一旦定义了动态路由，我们就可以在组件中获取到它
				
				组件实例化对象中有一个`$route`属性，存储了一些路由信息，我们可以在组件或者模板中直接使用
						实例化对象：
							$router	路由实例化对象
							
							$route	路由信息对象
										params	存储动态参数信息
										query	存储query信息
										hash	存储hash信息
										
							query和hash与动态参数相比:
									动态路由参数是必须存在的，否则无法进入路由
									query和hash可有可无，不影响路由进入
						
						当为路由设置了动态参数信息，不仅仅是当前组件可以访问，所有组件也是可以访问这些信息
						
			默认路由
				我们可以为路由`path`属性设置为`*`匹配所有的路由
				
				此时我们可以通过redirect重定向到默认路由
						属性值是路由规则
						
				PS：通常我们将默认路由放到`路由规则`最后面
				
			重定向路由
				如果path属性设定匹配某个值，此时设定了`redirect`,那将执行重定向
				
			嵌套路由
				嵌套路由就是在父路由中嵌套子路有，实现父路由的局部渲染
				
				使用嵌套路由分两步
						第一步	在父路由模板中，定义渲染的容器元素
									通过router-view组件定义
						
						第二步	在父路由的路由规则中，定义children属性，来定义子路由
									属性值是数组，每一个成员代表一个路由对象
											path	规则
											name	名称
											component	组件对象
											children	实现在子路由中再嵌套子路由
											
				在子路有中，通过`path`定义规则
						如果是绝对路径（以`/`开头），进入子路由，直接输入子路由path
						
						如果是相对路径（不以`/`开头），进入子路由，需要输入父路由 + 子路由
						
			路由导航
				`router-link`组件，实现路由导航
						默认编译成a标签，但是我们还可以对其添加属性，生成不同的标签
							`to`属性，类似a标签的href
									区别是：a标签hash通过#开头的，to属性省略#
									
									to属性的属性值是字符串，因此想要使用指令，可以使用v-bind指令
									
							`v-text`表示标签内部渲染的文案，是vue指令，因此属性值是js环境
							
							`tag`定义编译的标签类型，属性值是字符串
							
			异步请求
				vue和react一样是一个视图层框架，因此没有实现异步请求逻辑，如需要异步请求，就要使用vue-resource.js插件实现
				
				引入插件后，组件实例化对象会新增一个`$http`对象
				
					$http遵守ES6规范，支持promise，可以在异步请求中，同步使用数据
							get请求
								get(url,option)方法
										url	请求地址
										option配置对象
											params定义query数据
											
							post请求
								post(url,data,opation)方法
										url	请求地址
										data	请求数据
										option	配置对象
											params定义query数据
											
							then	监听返回的数据
										第一个参数表示成功时的回调函数
											作用域是实例化对象，可以通过`this`使用组件中的属性和方法
											
											参数有一个，就是封装后的异步请求对象
												其中data属性表示返回的数据
				
							post请求发送的数据也是json数据，不是模拟表单，所以想模拟表单，就要修改header
							
			AMD规范
				使用AMD规范的时候要注意，VUE以及它的插件已经被AMD模块化了，因此使用AMD规范的时候要安装插件，通过`Vue.use()`来安装插件
				
#####	VUEX
			vue是一个视图层面的框架，因此只能负责视图的创建于维护，因此对数据处理很弱
					因此才有了vue-resource、vue-router、Vuex插件
					
					因为组件间通信的成本很高，所以创建了Vuex这套专门为组件间通信的框架
					
					vue从2.0开始，参考react的flux思想
							flux思想分成三部分
									action	交互消息
									state	存储的数据
									view	视图
									
							交互：
								用户与视图发生交互，产生action消息
								被vuex（store）接收，更新状态state
								状态更新，重新渲染view视图
								
			vuex组成
				当我们引入vuex，就会有vuex的全局变量，其中有个store类就是用来创建store存储数据的
				
				vuex建议我们一个应用程序只创建一个store，里面的数据就是所有组件共享的数据
				
				创建store
					new Vuex.Store()
					
					store包含模块
						state	存储静态数据（data数据）
						
						getters	存储动态数据（computed数据）
						
						mutations	订阅监听同步消息的方法（观察者模式中的on方法）
							监听同步操作，是对state的操作
							
						actions	订阅监听异步消息的方法（观察者模式中的on方法）	
							监听异步操作，内部触发mutations更新状态
							
				组建中发布消息的方法
					commit提交mutations，更新状态数据
					
					despatch提交actions，更新状态数据
					
				创建store只需要三步
					第一步	创建store
								一个应用程序只有一个store
								
								创建过成功，store有四个组成部分（state,getters,mutations,actions）
								
					第二步	在vue实例化对象中，注册store
								store:store
								
					第三步	在组件中，发布actions或者mutations
								注册store后，跟路由一样，所有组件都拥有一个$store对象，通过$store可以使用commit/dispatch发布消息
								
					提交mutations
						store实例化对象，提供了commit方法，可以提交mutation
								第一个参数表示消息的名称
								第二个参数表示传递的数据
								
						mutations
							key	表示消息名称
							value	消息回调函数
							
							作用域是window
							
							参数有两个
								第一个是state对象
								第二个是commit提交过来的数据
					
					提交dispatch
						提交异步操作消息
							第一个参数表示消息名称
							第二个参数表示消息中传递的数据
						
						actions
							key	表示消息名称
							value	消息回调函数
							
							作用域是window
							
							参数有两个
								第一个是state对象
								第二个是dispatch提交过来的数据
								
							由于actions是异步的操作，在异步操作执行结束后要更新状态时，需要通过mutation更新状态，通过$store.commit()提交数据
								
					PS：组件发布消息
							actions接收消息，发起异步操作
							在异步结束后，将数据提交给mutation（为什么要将数据提交给mutation，因为mutation是同步操作可以实行监控）
							mutations修改状态
							状态修改后，视图更新
							
							注意：
								在actions中，如果操作是同步的，不如写在mutations
								
					getters
						存储动态的数据
							key	表示数据名称
							value 是一个函数，函数执行的结果就是要获取的数据
									第一个参数表示当前的state
									第二个参数表示当前的getters
									
							PS：每次修改的时候都会执行
							
#####	.vue文件
				webpack对于vue文件的解析需要用到两个插件
						vue-loader、vue-template-compiler
						
				当需要使用less、sass进行CSS预解析就要在style标签中添加`lang="less"`或者`lang="sass"`的属性值
				
				如果想各组件间的样式不互相影响，就要在style标签中添加`scoped`属性
								
							
