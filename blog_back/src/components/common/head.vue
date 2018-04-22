<template>
   <div>
    <h3>个人博客后台管理系统</h3>
    <p>用户姓名：{{username}}</p>
   </div>
</template>
<script>
export default {
  name: 'heads',
  data () {
    return {
        username:""
    }
  },
    mounted(){
      console.log(sessionStorage.getItem("userName"))
      this.username=sessionStorage.getItem("userName")
    }
}
</script>
<style scoped>
  div{
    height: 50px;
    background: #5F9EA0;
    overflow: hidden;
    line-height:50px;
    padding:0 20px;
    color: #fff;
  }
  div h3{
    float: left;
    font-weight: normal;
  }
  div p{
    float: right
  }
</style>
