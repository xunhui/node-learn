<template>
    <div class="post-list">
        <div class="post-avatar">
            <!-- <img :src="imgUrl" alt="avatar" class="avatar"> -->
        </div>
        <div class="post-info">
            <div class="top-info column-info">
                <p class="post-title">{{ listData.title }}</p>
                <p class="author-name">{{ listData.user_name }}</p>
            </div>
            <div class="middle-info column-info">
                <p class="post-content">{{ listData.content }}</p>
            </div>
            <div class="bottom-info column-info">
                <el-button type="primary" class="edit-btn" @click="modifyPost">修改</el-button>
                <el-button type="danger" class="edit-btn" @click="deletePost">删除</el-button>
                <p class="create-time">创建时间：{{ listData.created_time }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api/api.js'

export default {
    data () {
        return {
            imgUrl: '../../assets/avatar.jpg',
            authorName: 'Viccc',
            createTime: '2019-5-12'
        }
    },
    props: ['listData'],
    methods: {
        modifyPost () {
            console.log('modify')
        },
        deletePost () {
            let params = {
                postId: this.listData._id
            }
            api.aPost('/api/post/deletePost', params)
                .then((res) => {
                    if (res.data.code == 0) {
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: "success"
                        })

                        this.$emit('refreshList')
                    }
                })
        }
    }
}
</script>

<style scoped>
.post-list {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
}

.avatar {
    width: 100px;
    height: 100px;
}

.post-info {
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    padding: 20px 40px;
}

.column-info {
    margin: 5px 0;
}

.top-info {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.post-title {
    font-weight: 600;
    font-size: 30px;
    flex: 1;
}
.author-name {
    width: 100px;
    color: #409eff;
    font-weight: 600;
    text-align: right;
}

.post-content {
    font-size: 16px;
    
}

.bottom-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
}

.edit-btn {
    width: 60px;
    height: 30px;
    padding: 0;
}

.create-time {
    flex: 1;
    font-size: 14px;
    text-align: right;
    color: #bbb;
}
</style>
