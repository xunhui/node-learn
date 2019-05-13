<template>
    <div class="post-list">
        <div class="post-avatar">
            <img :src="imgUrl" alt="avatar" class="avatar">
        </div>
        <div class="post-info">
            <p class="author-name">{{ authorName }}</p>
            <p class="create-time">创建时间：{{ createTime }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgUrl: '../../assets/avatar.jpg',
            authorName: 'Viccc',
            createTime: '2019-5-12'
        }
    }
}
</script>

<style scoped>
.post-list {
    display: flex;
}

.avatar {
    width: 100px;
    height: 100px;
}

.post-info {

}
</style>
