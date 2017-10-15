<template>
    <div>
        我是user
        <div class="user-list">
            <router-link style="padding: 0px 10px" :to="{path:'/user/' + item.tip + '/' + item.id,query:{info:'follow'}}" :key='index' v-for='(item,index) of userList'>{{ item.userName }}</router-link> 
        </div> 
        <div class="user-info" v-if="userInfo.userName" style="font-size: 14px;">
            <p>姓名：{{ userInfo.userName }}</p>
            <p>性别：{{ userInfo.sex }}</p>
            <p>爱好：{{ userInfo.hobby }}</p>  
        </div>
        <div class="user-list" v-if="userInfo.userName">
            <router-link exact :to="{path:'',query:{info:'follow'}}">我的关注</router-link>
            <router-link exact :to="{path:'',query:{info:'share'}}">我的分享</router-link>
        </div>
        <div v-if="userInfo.userName">
            {{ $route.query }}
        </div>
    </div>
</template>

<script>
    let data = [
        {
            id:1,
            tip:'vip',
            userName:"leo1",
            sex:'男',
            hobby:'写代码'
        },
        {
            id:2,
            tip:'vip',
            userName:"leo2",
            sex:'男',
            hobby:'唱歌'
        },
        {
            id:3,
            tip:'common',
            userName:"leo3",
            sex:'男',
            hobby:'读书'
        }
    ]

    export default {
        data(){
            return {
                userList: data,
                userInfo: {}
            }
        },
        watch: {
            $route(){
                this.getData()
            }
        },
        methods: {
            getData(){
								console.log(this.$route)
                let id = this.$route.params.userId
            
                if(id){
                    this.userInfo = this.userList.filter((item) => {
                        return item.id == id
                    })[0]
                }else{
                    this.userInfo = {}
                }   
            }
        },
        created(){
            // console.log(this.$route)
            this.getData()
        }
    }
</script>

<style>

 
</style>


