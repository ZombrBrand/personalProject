### 基本指令:  插值、v-bind、v-if、v-for、v-on、v-model

    <body>
        <div id='app'>
            <div>{{ message }}</div>
            <div v-bind:title="title">鼠标悬停几秒钟查看此处动态绑定的提示信息！</div>
            <div v-if='seen'>现在你看到我</div>
            <ul>
                <li v-for="todo in todos">
                    {{todo.text}} 
                </li>
            </ul>
            <div>
                <p>{{ message }}</p>
                <button v-on:click="reverMessage">逆转消息</button>
            </div>
            <div>
                <input v-model="message">
            </div>
        </div>
        <script src="../vue.js"></script>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    message: 'hello Vue',
                    title: '页面加载于' + new Date(),
                    seen: true,
                    todos: [
                        {text: '学习 JavaScript'},
                        {text: '学习 Vue'},
                        {text: '整个牛项目'}
                    ]
                },
                methods: {
                    reverMessage:function(){
                        this.message = this.message.split('').reverse().join('')
                    }
                }
            })
        </script>
    </body>  