import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../page/mainPage.vue'
import Login from '../page/loginRegister.vue'
import Edit from '../page/userEditInfo.vue'
import Post from '../page/commitPost.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/login/:type',
      component: Login
    },
    {
      path: '/edit',
      component: Edit
    },
    {
      path: '/post',
      component: Post
    }
  ]
})
