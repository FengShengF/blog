<template>
  <div class="article">
    <h3>添加文章</h3>
    <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="article_name">
        <el-input type="text" v-model='ruleForm.article_name' auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="一级类名" prop="oneId">
        <el-select placeholder='请选择' v-model='ruleForm.oneId' @change='changeClassOne'>
          <el-option v-for='item in oneClass' :key="item.id" :label='item.cnname' :value='item.id'>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级类名" prop="twoId">
        <el-select placeholder='请选择' v-model="ruleForm.twoId" :clearable='true'>
          <el-option v-for="item in twoClass" :key="item.id" :label="item.cnname" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示" prop="art_show">
        <el-radio class="radio" v-model="ruleForm.art_show" label="1">是</el-radio>
        <el-radio class="radio" v-model="ruleForm.art_show" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="是否推荐" prop="recommend">
        <el-radio class="radio" v-model="ruleForm.recommend" label="1">是</el-radio>
        <el-radio class="radio" v-model="ruleForm.recommend" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="作者" prop="editer">
        <el-input type="text" v-model="ruleForm.editer" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label='导读' prop="">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.daodu" :autosize="{ minRows:2, maxRows:10 }">
        </el-input>
      </el-form-item>
      <el-form-item label="时间" prop="times">
        <el-time-picker v-model="ruleForm.time" type="datetime" placeholder="选择时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" @change="(data){

        }",
        >
        </el-time-picker>
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
      <el-form-item label="内容" prop="">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatetime = (rule, value, callback) => {
      if(this.timedata === ''){
        callback(new Error('请选择时间'))
      }else{
        callback();
      }
    }
    return {
      oneClass: [],
      twoClass: [],
      olddata: [],
      editer: null,
      ruleForm: {
        article_name: '',
        oneId: '',
        twoId: '',
        editer: '',
        content: '',
        time: '',
        daodu: '',
        recommend: '0',
        art_show: '0',
        enname_one: ''
      },
      rules2: {
        article_name: [{
          required: true,
          message: '请输入文章名称',
          trigger: 'blur'
        }],
        oneId: [{
          required: true,
          message: '请输入一级分类',
          trigger: 'blur'
        }],
        twoId: [{
          required: true,
          message: '请输入二级分类',
          trigger: 'blur'
        }],
        editer: [{
          required: true,
          message: '请输入作者',
          trigger: 'blur'
        }],
        times: [{
          required: true,
          message: '请选择时间',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.axios.get('/api/back/article/class').then((data)=>{
      this.olddata=data.data.data
      console.log(data)
      this.oneClass=data.data.data.oneData
      this.ruleForm.oneId=this.oneClass[0].id
      this.ruleForm.enname_one=this.oneClass[0].enname_one
      // this.twoClass=data.data.data[1]
      this.selectClassTwo()
    })
  },
  mounted() {
    this.editer=UE.getEditor('editor');
    console.log(this)
  },
  methods: {
    changefn(data){

    },
    selectClassTwo() {
      this.twoClass=[]
      this.olddata.twoData.forEach(function(i){
        if(i.parent_id==this.ruleForm.oneId){
          this.twoClass.push(i)
        }
      },this)
    },
    changeClassOne(item) {
      this.olddata.oneData.forEach(function(i){
        if(i.id==item){
          this.ruleForm.enname_one=i.enname
        }
      },this)
      this.selectClassTwo()
    },
    submitForm(formName){
      this.$refs[formName].validate((valid)=>{
        if(valid&&this.editer.getContent() !=''){
          this.ruleForm.content=this.editer.getContent()
          console.log(this.ruleForm)
          this.axios.post('/api/back/article/insert',this.ruleForm).then((data)=>{
            if(data.data.code=='1213'){
              this.$message({
                type:'success',
                message: '恭喜'
              })
              setTimeout(()=>{
                this.$router.go(0)
              }, 1000);
            }else{
              this.$message({
                type:'error',
                message: '失败'
              })
            }
          })
        }else{
          console.log('error submit!')
          return false;
        }
      })
    }
  },
  destroyed() {
    this.editer.destroy()
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
