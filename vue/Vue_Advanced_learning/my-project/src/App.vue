<template>
    <div id="app">
      <div class="nav-box">
        <ul class="nav">
          <router-link :to='index' exact tag="li">
            <i class="fa fa-home"></i>
            <span>home</span>
          </router-link>
          <router-link :to="{path:'/document'}" tag="li">
            <i class="fa fa-home"></i>
            <span>document</span>
          </router-link>
          <router-link :to='about' tag="li" active-class="activeClass">
            <i class="fa fa-home"></i>
            <span>about</span>
          </router-link>
          <router-link :to="{path:'/user'}" tag="li" active-class="activeClass">
            <i class="fa fa-home"></i>
            <span>user</span>
          </router-link>
        </ul>
      </div>

      <!-- <router-view name="hobby"></router-view>
      <router-view name="abc"></router-view>    -->
      
      当前导航下标:
      <span>{{ $route.meta.index }}</span>
      <div>
        <input type="button" value="后退" @click="backhandle">
        <input type="button" value="前进" @click="forwardhandle">
        <input type="button" value="指定步数" @click="gohandle">
        <input type="button" value="push" @click="pushhandle">
        <input type="button" value="replace" @click="replacehandle">
      </div>
      <div class="relative">
        <transition name="left">
          <router-view class="center"></router-view>
        </transition>
      </div>
      
      
    </div>  
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      index: '/',
      about: '/about',
      direction: 'left'
    }
  },
  watch: {
    $route(to,from){
      if(to.meta.index > from.meta.index){
        this.direction = "left"
      }else{
        this.direction = "right"
      }
    }
  },
  methods: {
    backhandle(){
      this.$router.back()
    },
    forwardhandle(){
      this.$router.forward()
    },
    gohandle(){
      this.$router.go(-3)
    },
    pushhandle(){
      // this.$router.push('/document')
      this.$router.push({path:'/document'})
    },
    replacehandle(){
      this.$router.replace({path:'/document'})
    }
  }
}
</script>

<style>
  /* vue默认css以V开头 */
  .v-enter {
    transform: translateX(100%);
  }
  .v-enter-active,.v-leave-active {
    transition: 1s;
  }
  .v-leave-to {
    transform: translateX(-100%);
  } 

  /* 从右向左滑动 */
   .left-enter {
    transform: translateX(100%);
  }
  .left-enter-active,.left-leave-active {
    transition: all 1s;
  }
  .left-leave-to {
    transform: translateX(-100%);
  } 

  /* 从左向右滑动 */
  .right-enter {
    transform: translateX(-100%);
  }
  .right-enter-active,.left-leave-active {
    transition: all 2s;
  }
  .right-leave-to {
    transform: translateX(100%);
  }

</style>
