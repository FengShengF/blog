<template>
    <div>
        <Header :dataList='dataList'></Header>
    </div>
</template>
<script>

import Header from './Header.vue'
import axios from 'axios'

export default {
    data(){
        return{
            dataList:[]
        }
    },
    beforeRouteEnter:(to,from,next)=>{
        axios.get('/api/front/getClass').then((data)=>{
            sessionStorage.setItem('list',JSON.stringify(data.data.data))
        })
        next()
    },
    created(){
            this.dataList = JSON.parse(sessionStorage.getItem('list'))
    },
    components:{
        Header
    }
}
</script>

