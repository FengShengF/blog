
import Vue from "vue"
import router from "./router"
import store from "./store"
import './directives/index'          //全局指令
import './components/register.js'   //全局组件

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import vueAxios from "vue-axios"
import axios from "axios"
Vue.use(vueAxios,axios)


// import './static/Ueditor/ueditor.config.js'
// import './static/Ueditor/ueditor.all.min.js'
// import './static/Ueditor/lang/zh-cn/zh-cn.js'
// import './static/Ueditor/ueditor.parse.min.js'


//路由拦截
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
  }else{
    if(sessionStorage.getItem('userId')){
      next()
    }else{
      next('/login')
    }
  }
    
})


new Vue({
  el:"#root",
  router,
  store,
  template:"<app />",
  components: {
      app: resolve => require(['./components/app.vue'], resolve)
  }
})