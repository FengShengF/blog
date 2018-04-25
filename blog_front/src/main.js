
import Vue from "vue"
import router from "./router"
import store from "./store"

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//axios
import vueAxios from "vue-axios"
import axios from "axios"
Vue.use(vueAxios,axios)



new Vue({
  el:"#root",
  store,
  router,
  template:"<app />",
  components: {
      app: resolve => require(['./components/app.vue'], resolve)
  }
})