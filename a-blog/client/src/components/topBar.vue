<template>
  <div class="top-bar">
    <p class="top-bar-title">Just a node demo</p>
    <div v-if="ifHasLogin">
      <el-button type="primary" size="small" @click="commitPost">发表评论</el-button>
      <el-dropdown :show-timeout="showTimeOut" @command="commandAction">
        <span class="el-dropdown-link">
          欢迎你，{{ getUserInfo.nickname }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePsw">编辑信息</el-dropdown-item>
          <el-dropdown-item divided command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="top-bar-btn" v-else>
      <el-button type="primary" @click="goLogin(0)">登录</el-button>
      <el-button type="warning" @click="goLogin(1)">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTimeOut: 150,
      name: "cc",
      ifHasLogin: false
    };
  },
  computed: {
    getUserInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  methods: {
    commandAction (command) {
      if (command == "changePsw") {
        this.$router.push("/edit");
      } else if (command == "exit") {
        this.$router.push("/login/0");
      }
    },
    goLogin (e) {
      //跳转登录或注册
      this.$router.push({ path: `/login/${e}` });
    },
    commitPost () {
        this.$router.push('/Post')
    }
  },
  created() {
    if (this.$store.getters.getUserInfo._id) this.ifHasLogin = true;
  }
};
</script>

<style scoped>
.top-bar {
  width: 100%;
  height: 80px;
  /* background: #409EFF; */
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #eee;
}

.top-bar-title {
  color: #409eff;
  font-size: 18px;
  flex: 1;
  padding-left: 50px;
}

.top-bar-btn {
  padding-right: 100px;
}

.top-bar .el-dropdown {
  padding-right: 50px;
  color: #409eff;
  cursor: pointer;
}
</style>


