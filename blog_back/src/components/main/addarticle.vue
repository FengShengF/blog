<template>
  <div class="article">
    <h3>添加文章</h3>
    <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm2">
      <el-form-item label="文章标题" prop="cnname_one" :rules="[{required:true,message:'不能为空'}]">
        <el-input type="text" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="一级类名" prop="cnname_one" :rules="[{required:true,message:'不能为空'}]">
        <el-select placeholder='请选择'>
          <el-option v-for='item in options' :key="item.id" :label='item.cnname' :value='item.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级类名" prop="cnname_one" :rules="[{required:true,message:'不能为空'}]">
        <el-select placeholder='请选择'>
          <el-option>
          </el-option>
        </el-select>
      </el-form-item>
      <p>
        是否显示
        <el-radio v-model="radio" label="2">是</el-radio>
        <el-radio v-model="radio" label="1">否</el-radio>
      </p>
      <p>
        是否推荐
        <el-radio v-model="radio" label="2">是</el-radio>
        <el-radio v-model="radio" label="1">否</el-radio>
      </p>
      <el-form-item label="作者" prop="cnname_one" :rules="[{required:true,message:'不能为空'}]">
        <el-input type="text" auto-complete="off"></el-input>
      </el-form-item>
      <p>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </p>
      <el-form-item label="时间" prop="cnname_one">
        <el-time-select v-model="value1" :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }" placeholder="选择时间">
        </el-time-select>
      </el-form-item>
      <el-form-item label="缩略图" prop="cnname_one">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1',
      textarea: '',
      value1: '',
      ruleForm2: {
        enname_two: '',
        cnname_two: '',
        oneId: ''
      },
      options: []
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/api/back/class/getOneClass', this.ruleForm2).then((data) => {
            console.log(data)
            if (data.data.code == '2021') {
              this.$message({
                showClose: true,
                message: '恭喜你,提交成功',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: '获取失败',
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!')
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
      this.axios.get('/api/back/class/getOneClass').then((data)=>{
          this.options=data.data.data
          console.log(data.data.data)
      })
  }
}
</script>
<style>
.article {
  margin: 20px 40px;
}

p {
  margin: 30px;
}
</style>
