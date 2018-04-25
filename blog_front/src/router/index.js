import vueRouter from "vue-router"

import vue from 'vue'
vue.use(vueRouter)


import Index from '../components/Index.vue'
import Loading from '../components/loading.vue'

import Index2 from '../components/Index2.vue'
import Loading2 from '../components/loading2.vue'
import indexLast from '../components/indexLast.vue'

export default new vueRouter({
     routes:[
         {
             path:'/',
             redirect:'/loading'
         },
        {
            path:'/index',
            component:Index
        },
        {
            path:'/loading',
            component:Loading
        },


        {
            path:'/index2',
            redirect:'/loading2'
        },
        {
            path:'/indexLast',
            component:indexLast
        },
        {
            path:'/loading2',
            component:Loading2
        }
     ]
})