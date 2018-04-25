<template>
    <div>2222222加载中......</div>
</template>
<script>
import {mapActions} from 'veux'
export default {
   created(){
     this.axios.get('/api/front/mn').then((data)=>{
          this.moni_A(data)
          this.$router.push('/index2')
     })
   },
   methods:{
     ...mapActions([
         'moni_A'
     ])
   }
}
</script>
