import vueRouter from "vue-router"

import Vue from "vue"
Vue.use(vueRouter)

import Login from '../components/login.vue'
import BackIndex from '../components/main/index.vue'
import add_one_class from '../components/class/add_one_class.vue'
import add_two_class from '../components/class/add_two_class.vue'
import class_list from '../components/class/do_list.vue'
import amend_class from '../components/class/amend_class.vue'

import add_article from '../components/article/addarticle.vue'
import article_list from '../components/article/articlelist.vue'

import api_list from '../components/Interface/api_list.vue'
import amend_list from '../components/Interface/amend_list.vue'


export default new vueRouter({
   routes:[
     {
       path:"/",
       component:Login,
       redirect: "/login"
     },
     {
      path:"/login",
      component:Login
     },
    {
      path:"/back",
      component:BackIndex,
      children:[
        {
          path:'add_one_class',
          component:add_one_class
        },
        {
          path:'add_two_class',
          component:add_two_class
        },
        {
          path:'class_list',
          component:class_list
        },
        {
          path:'add_article',
          component:add_article
        },
        {
          path:'api_list',
          component:api_list
        },
        {
          path:'amend_list',
          component:amend_list
        },{
          path:'article_list',
          component:article_list
        }
      ]
     }
   ]
})