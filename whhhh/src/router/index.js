import vueRouter from "vue-router"

import Vue from "vue"
Vue.use(vueRouter)


let Login=resolve => require(['@/components/login.vue'], resolve)
let backMain=resolve => require(['@/components/main/main.vue'], resolve)
let back=resolve => require(['@/components/main/index.vue'], resolve)
let oneClass=resolve => require(['@/components/main/addoneclass.vue'], resolve)
let twoclass=resolve => require(['@/components/main/addtwoclass.vue'], resolve)
let classlist=resolve => require(['@/components/main/classlist.vue'], resolve)
let addarticle=resolve => require(['@/components/main/addarticle.vue'], resolve)
let articlelist=resolve => require(['@/components/main/articlelist.vue'], resolve)
let apiadd=resolve => require(['@/components/main/apiadd.vue'], resolve)
let apilist=resolve => require(['@/components/main/apilist.vue'], resolve)
let sendemail=resolve => require(['@/components/main/sendemail.vue'], resolve)
let amend_class=resolve => require(['@/components/main/amend_class.vue'], resolve)
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
      component:back,
      children:[
        {
          path:"main",
          component:backMain
        },
        {
          path:"addoneclass",
          component:oneClass
        },
        {
          path:"addtwoclass",
          component:twoclass
        },
        {
          path:"classlist",
          component:classlist
        },
        {
          path:"addarticle",
          component:addarticle
        },
        {
          path:"articlelist",
          component:articlelist
        },
        {
          path:"apiadd",
          component:apiadd
        },
        {
          path:"apilist",
          component:articlelist
        },
        {
          path:"sendemail",
          component:sendemail
        },
        {
          path:"amend_class",
          component:amend_class
        }
      ]
     }
   ]
})