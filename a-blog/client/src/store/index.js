import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {}
    },
    getters: {
        getUserInfo: (state) => {
            return state.userInfo
        }
    },
    mutations: {
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo
        }
    }
})

export default store