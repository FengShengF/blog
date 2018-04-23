<template>
  <el-menu default-active="2" class="el-menu-vertical-demo self" >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>文章操作</template>
          <el-menu-item index="1-1"><router-link to="/back/addarticle">添加文章</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/back/articlelist">文章列表</router-link></el-menu-item>
      </el-submenu>

      <el-submenu index="2">
       <template slot="title"><i class="el-icon-setting"></i>分类操作</template>
       <el-menu-item index="2-1"><router-link to="/back/addoneclass">添加一级分类</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/back/addtwoclass">添加二级分类</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/back/classlist">分类列表</router-link></el-menu-item>
      </el-submenu>

       <el-submenu index="3">
       <template slot="title"><i class="el-icon-setting"></i>接口操作</template>
       <el-menu-item index="3-1"><router-link to="/back/apiadd">添加接口</router-link></el-menu-item>
          <el-menu-item index="3-2"><router-link :to='{path:"/back/apilist",query:{type:"font"}}'>前台接口</router-link></el-menu-item>
          <el-menu-item index="3-3"><router-link :to='{path:"/back/apilist",query:{type:"back"}}'>后台接口</router-link></el-menu-item>
      </el-submenu>

      <el-submenu index="4">
       <template slot="title"><i class="el-icon-setting"></i>留言板</template>
       <el-menu-item index="4-1"><router-link to="/back/sendemail">留言</router-link></el-menu-item>
      </el-submenu>
    </el-menu>
</template>
<script>
export default {
  name: 'asides',
  data () {
    return {
        
    }
  }
}
</script>
<style scoped>
  .self{
    width: 200px;
  }
</style>