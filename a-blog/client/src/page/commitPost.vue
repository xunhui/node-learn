<template>
  <div class="commit-page">
    <p class="title">发表你的评论</p>
    <el-card>
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="blog.title" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              style="width: 400px"
              placeholder="请输入评论内容"
              v-model="blog.content"
              rows="5"
              resize="none"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmCommit">确认发布</el-button>
            <el-button @click="resetInfo">置空</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import api from "../api/api.js";
import crypto from "crypto-js";

export default {
  data() {
    return {
      blog: {

      },
      userInfo: {}
    };
  },
  methods: {
    confirmCommit () {
        let params = {
          userId: this.userInfo._id,
          title: this.blog.title,
          content: this.blog.content
        }

        api.aPost('/api/post/commitPost', params)
          .then((res) => {
            if (res.data.code == 1) {
              this.$message({
                showClose: true,
                message: "发表成功",
                type: "success"
              })

              this.$router.push('/')
            }
          })
    },
    resetInfo () {
        this.blog = {}
    }
  },
  created() {
    this.userInfo = this.$store.getters.getUserInfo;
  }
};
</script>

<style scoped>
.commit-page {
  width: 600px;
  margin: 0 auto;
}

.title {
  color: #409eff;
  font-size: 40px;
  padding: 20px 0;
}
</style>
