<template>
  <div class="edit-info">
    <p class="title">用户信息编辑</p>
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息修改">
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="userInfo.nickname" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userInfo.gender">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人简历">
            <el-input
              type="textarea"
              style="width: 400px"
              placeholder="请输入个人简历"
              v-model="userInfo.bio"
              rows="5"
              resize="none"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmEdit">确认修改</el-button>
            <el-button @click="resetInfo">置空</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form ref="form" :model="pswInfo" label-width="80px">
          <el-form-item label="原密码">
            <el-input placeholder="请输入原密码" v-model="pswInfo.prePSW" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input placeholder="请输入新密码" v-model="pswInfo.newPSW" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmChangePSW">修改密码</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="更换头像"> -->
          <!-- <el-upload
              class="avatar-uploader"
              action="/api/user/uploadAvatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" style="width: 100px;border: 1px dashed #d9d9d9;"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>请选择.jpg文件</span> -->
            <el-tab-pane label="更换头像">
                <!-- <form action="/api/user/uploadAvatar" method="post" enctype="multipart/form-data"> -->
                    <input class="select-btn" type="file" name="avatar" value="请选择jpg文件" ref="fileInput">
                    <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                    <el-button type="primary" @click="uploadAvatarAction">提交</el-button>
                <!-- </form> -->
            </el-tab-pane>
      <!-- </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import api from "../api/api.js";
import crypto from "crypto-js";

export default {
  data() {
    return {
      userInfo: {
        //   nickname: '',
        //   gender: -1,
        //   bio: ''
      },
      pswInfo: {
        prePSW: "",
        newPSW: ""
      },
    imageUrl: ''
    };
  },
  methods: {
    confirmEdit() {
      let params = {
        id: this.userInfo._id,
        nickname: this.userInfo.nickname,
        gender: this.userInfo.gender,
        bio: this.userInfo.bio
      };

      api
        .aPost("/api/user/edit", params)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: "个人信息修改成功"
            });
          }

          if (res.data.code == -1) {
            this.$message({
              showClose: true,
              message: "个人信息修改失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetInfo() {
      this.userInfo = {};
    },
    confirmChangePSW() {
      let params = {
        id: this.userInfo._id,
        prePSW: crypto.MD5(this.pswInfo.prePSW).toString(),
        newPSW: crypto.MD5(this.pswInfo.newPSW).toString()
      };

      api.aPost("/api/user/changePSW", params).then(res => {
        if (res.data.code == 1)
          this.$message({
            showClose: true,
            message: "原密码错误，修改失败",
            type: "error"
          });
        else if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "密码修改成功，请重新登录",
            type: "success"
          });

          //跳转登录页面
          this.$router.push("/login/0");
        }
      });
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    uploadAvatarAction () {
        // let data = new FormData()
        // data.append('file', this.$refs.fileInput.files[0])
        // console.log(data, data.get('file'))
        // api.aPost('/api/user/uploadAvatar', data, {headers: {"Content-Type": "multipart/form-data"}})
        //     .then((res) => {
        //         console.log(res)
        //     })
    }
  },
  created() {
    this.userInfo = this.$store.getters.getUserInfo;
    console.log(this.userInfo.gender);
  }
};
</script>

<style scoped>
.edit-info {
  width: 600px;
  margin: 0 auto;
}
.title {
  color: #409eff;
  font-size: 40px;
  padding: 20px 0;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
