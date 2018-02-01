<template>
    <div>
        关于我
        <hr>
        <ul class="nav">
            <router-link :to="{name:'about'}" exact tag="li">
                <a>study</a>
            </router-link>
            <router-link :to="{name:'silder'}" exact tag="li">
                <a>silder</a>
            </router-link>
            <router-link :to="{name:'work'}" exact tag="li">
                <a>work</a>
            </router-link>
        </ul>
        <div>{{ test }}</div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            test: '改变前'
        }
    },
    beforeCreate() { //此钩子函数是组件实例生成后第一个触发
        //  console.log('beforeCreate: ',this.test)
    },
    beforeRouteEnter(to, from, next) {    //由于这个钩子函数是当前组件实例生成之前所触发的，所以无法获取到实例生成后的data数据
        // console.log('beforeRouteEnter')
        next((vm) => {  // next用来决定是否进入该组件，而next有个回调参数，可以利用回调获取this
            vm.test = '改变后'
        })
    },
    beforeRouteUpdate(to, from, next) {
        //基本使用于二级导航
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        next()
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        next()
    }
}
</script>

<style>

</style>
