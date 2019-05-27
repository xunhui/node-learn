<template>
    <div class="manage" ref="manage">
        <top-bar></top-bar>
        <!-- <div class="manage-page">
            <router-view></router-view>
        </div> -->
        <div class="post">
            <post-list v-for="item in postListData" :key="item.id" :listData="item" @refreshList="getPostLists"></post-list>
        </div>
    </div>
</template>

<script>
import topBar from "../components/topBar.vue";
import postList from '../components/postList.vue'
import api from '../api/api.js'

export default {
    data () {
        return {
            mytitle: '这里是帖子列表啊啊啊',
            postListData: []
        }
    },
    components: {
        topBar,
        postList
    },
    computed: {
        
    },
    methods: {
        getPostLists () {
            api.aGet('/api/post/getPostList')
            .then((res) => {
                console.log(res.data)
                this.postListData = res.data.postLists
            })
        }
    },
    mounted () {
        this.getPostLists()
    }
}
</script>

<style>
.manage {
    
}

.manage-page {
    position: absolute;
    left: 200px;
    top: 80px;
    bottom: 0;
    right: 0;
    padding: 30px;
    padding-top: 50px;
    background: #eee;
}

.post {
    padding: 30px 150px;
}
</style>


