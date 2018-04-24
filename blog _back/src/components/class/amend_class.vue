<template>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <template v-if='state'>
            <h3>一级分类管理</h3>
            <el-form-item label="一级中文类名" prop='cnname'>
                <el-input type="text" v-model="ruleForm.cnname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="一级英文类名" prop='enname'>
                <el-input type="text" v-model="ruleForm.enname" auto-complete="off"></el-input>
            </el-form-item>
        </template>
        <template v-else>
            <h3>二级分类管理</h3>
            <el-form-item label="二级中文类名" prop='cnname'>
                <el-input type="text" v-model="ruleForm.cnname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="二级英文类名" prop='enname'>
                <el-input type="text" v-model="ruleForm.enname" auto-complete="off"></el-input>
            </el-form-item>
        </template>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
            state: true,
            ruleForm: {

            }
        }
    },
    created() {
        //    console.log(this.$route.query.state)
        this.state = this.$route.query.state
        if (this.state == 'one') {
            this.state = true
            const data = JSON.parse(sessionStorage.getItem('oneClass'))
            
            Object.entries(data).forEach(function(i) {
                this.$set(this.ruleForm, i[0], i[1])
            }, this);
            this.ruleForm.oldenname = data.enname
        }else{
            this.state = false
            const data = JSON.parse(sessionStorage.getItem('twoClass'))

            Object.entries(data).forEach(function(i) {
                this.$set(this.ruleForm, i[0], i[1])
            }, this);
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //修改一级
                    if(this.state){
                        this.axios.post('/api/back/amendClassOne', this.ruleForm).then((data) => {
                        if (data.data.code =='2062') {
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: data.data.msg
                            })
                        } else {
                            this.$message({
                                showClose: true,
                                type: 'error',
                                message: data.data.msg
                            })
                        }
                    })
                    }else{
                         //修改二级
                         this.axios.post('/api/back/amendClassTwo', this.ruleForm).then((data) => {
                        if (data.data.code =='2071') {
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: data.data.msg
                            })
                        } else {
                            this.$message({
                                showClose: true,
                                type: 'error',
                                message: data.data.msg
                            })
                        }
                    })
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
