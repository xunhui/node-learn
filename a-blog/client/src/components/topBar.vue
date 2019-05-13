<template>
    <div class="top-bar">
        <p class="top-bar-title">Just a node demo</p>
        <el-dropdown :show-timeout=showTimeOut @command="commandAction" v-if="ifHasLogin">
            <span class="el-dropdown-link">
                欢迎你，{{ name }}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePsw">修改密码</el-dropdown-item>
                <el-dropdown-item divided command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="top-bar-btn" v-else>
            <el-button type="primary" @click="goLogin(0)">登录</el-button>
            <el-button type="warning" @click="goLogin(1)">注册</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            showTimeOut: 150,
            name: 'cc',
            ifHasLogin: false
        }
    },
    methods: {
        commandAction (command) {
            if (command == "changePsw") {
                console.log('changePsw')
            } else if (command == "exit") {
                console.log('exit')
            }
        },
        goLogin (e) {
            //跳转登录或注册
            this.$router.push({path: `/login/${e}`})
        }
    },
    created () {
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
    color: #409EFF;;
    font-size: 18px;
    flex: 1;
    padding-left: 50px;
}

.top-bar-btn {
    padding-right: 100px;
}

.top-bar .el-dropdown {
    padding-right: 50px;
    color: #409EFF;;
    cursor: pointer;
}

</style>


