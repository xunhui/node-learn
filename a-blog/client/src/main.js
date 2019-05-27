import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'
import App from './App.vue'
import store from './store/index.js'

Vue.use(ElementUI)

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})