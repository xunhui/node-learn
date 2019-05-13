<template>
  <div class="background-div">
    <div class="content">
      <div></div>
      <div class="login-content" v-if="loginShow">
        <el-tabs type="border-card" :value="$route.params.type">
          <el-tab-pane name="0">
            <span slot="label">登录</span>
            <el-form :model="userLoginInfo" status-icon ref="userLoginInfo" lable-position="top">
              <!-- 登录 -->
              <el-form-item label prop="phoneNum" :error="phoneNumError">
                <el-input v-model="userLoginInfo.phoneNum" size="large" placeholder="请输入手机号"></el-input>
              </el-form-item>

              <el-form-item label prop="password" :error="pswError">
                <el-input
                  v-model="userLoginInfo.password"
                  type="password"
                  size="large"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>

              <el-form-item class="el-form-div">
                <el-button
                  class="btn login-btn"
                  type="primary"
                  size="large"
                  @click="loginSubmit('userLoginInfo')"
                >登录</el-button>
              </el-form-item>
              <div class="login-notice">
                <span class="left-text">（推荐使用谷歌浏览器）</span>
                <!-- <el-button type="text" class="right-text" @click="forgetShow('userLoginInfo')">忘记密码</el-button>  -->
              </div>
            </el-form>
          </el-tab-pane>
          <!-- 注册 -->
          <el-tab-pane name="1" label="注册">
            <el-form :model="userRegInfo" status-icon ref="userRegInfo" lable-position="top">
              <el-form-item label prop="phone" :error="phoneNumError">
                <el-input v-model="userRegInfo.phone" size="large" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label>
                <el-input
                  v-model="userRegInfo.nickname"
                  size="large"
                  placeholder="请输入昵称"
                ></el-input>
              </el-form-item>
              <el-form-item label prop="password2">
                <el-input
                  v-model="userRegInfo.password"
                  size="large"
                  type="password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>

              <el-form-item class="el-form-div" :error="msgError">
                <el-button
                  class="btn login-btn"
                  type="primary"
                  size="large"
                  @click="regSubmit()"
                >确认注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import crypto from "crypto-js";
//import api from "@/api/devAPI.js";
// import api from "@/api/api.js";

const TIME_COUNT = 60; //获取验证码倒计时
//数据格式筛选
var checkPhone = (rule, value, callback) => {
  callback();
};
var checkPassword1 = (rule, value, callback) => {
  callback();
};
var checkPassword2 = (rule, value, callback) => {
  callback();
};
export default {
  name: "login",
  data() {
    return {
      loginShow: true,
      userLoginInfo: {
        phoneNum: "",
        password: ""
      },
      userRegInfo: {
        phone: "",
        nickname: '',
        password: ''
      },
      forgetInfo: {
        phone: "",
        password1: "",
        password2: "",
        verifyCode: ""
      },
      phoneNumError: "",
      pswError: "",
      codeError: "",
      msgError: "",
      getVerifyText: "获取验证码",
      disableif: false,
      count: "",
      timer: null,
      codeType: -1,
      codeParams: {
        phoneNumber: "",
        verifyCode: ""
      }
    };
  },
  methods: {
    loginSubmit: function(userLoginInfo) {
      this.phoneNumError = "";
      this.pswError = "";
    },
    //注册
    register() {
      this.phoneNumError = "";
      let userRegInfo = {
        phoneNum: this.userRegInfo.phone,
        password: crypto.MD5(this.userRegInfo.password1).toString()
      };
    },
    //找回密码
    findPSW() {
      this.phoneNumError = "";
      let forgetInfo = {
        phoneNumber: this.forgetInfo.phone,
        newPassword: crypto.MD5(this.forgetInfo.password1).toString()
      };
    },
    //点击注册
    regSubmit: function() {
      
    },
    //点击修改密码
    forgetSubmit: function(forgetInfo) {}
  },
  created() {

  }
};
</script>

<style type="text/css">
.background-div {
  /*background: url('../../../assets/background.png') center center no-repeat;*/
  width: 100%;
  position: absolute;
  height: 100%;
}
.content {
  width: 500px;
  margin: 200px auto;
}
.login-btn {
  background-color: #409eff;
  width: 470px;
  height: 40px;
}
.el-form-div {
  margin-top: 30px;
}
.login-notice {
  margin-top: 10px;
}

.left-text {
  display: inline-block;
  width: 250px;
}
.right-text {
  display: inline-block;
  width: 150px;
  margin-left: 60px;
}
</style>