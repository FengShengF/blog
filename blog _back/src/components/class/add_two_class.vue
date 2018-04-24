<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

            <h3>一级分类列名</h3>
            <el-form-item label="一级中文分类">
                <el-select v-model="ruleForm.value" placeholder="请选择">
                    <el-option v-for="(item,index) in ruleForm.oneClass" :key="item.id" :label="item.cnname" :value="item.cnname">
                    </el-option>
                </el-select>
            </el-form-item>

            <h3>二级分类列名</h3>
            <el-form-item label="二级中文类名" prop='cnname_two' :rules="[
                                        { required: true, message: '不能为空'},
                                        ]">
                <el-input type="age" v-model="ruleForm.cnname_two" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="二级英文类名" prop='enname_two'>
                <el-input type="age" v-model="ruleForm.enname_two" auto-complete="off"></el-input>
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
        var validateEnname_two = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('不能为空'));
            } else if (!/^[a-zA-Z]{4,10}$/.test(value)) {
                callback(new Error('您输入的格式不对'))
            } else {
                callback()
            }
        }
        return {
            rules: {
                cnname_two: [{ trigger: 'blur' }],
                enname_two: [{ validator: validateEnname_two, trigger: 'blur' }]
            },
            ruleForm: {
                oneClass: [],
                cnname_two: '',
                enname_two: '',
                oneId: '',
                value: ''
            }
        }
    },
    created() {
        this.axios.get('/api/back/getOneClass').then((data) => {
            if (data.data.code === '2021') {
                this.ruleForm.oneClass = data.data.data
            }
        })

    },
    methods: {
        submitForm(formName) {
            this.ruleForm.oneClass.forEach((data) => {
                if (data.cnname == this.ruleForm.value) {
                    this.ruleForm.oneId = data.id
                }
            })
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   
                    this.axios.post('/api/back/insertTwoClass', this.ruleForm).then((data) => {
                        console.log('sss')
                        if (data.data.code == '2011') {
                            console.log('chenggong')
                            this.$message({
                                showClose: true,
                                type: 'success',
                                message: data.data.msg
                            })
                        } else {
                            console.log('shibai')
                            this.$message({
                                showClose: true,
                                type: 'error',
                                message: data.data.msg
                            })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

