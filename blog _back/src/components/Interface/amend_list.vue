<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="接口地址" prop="url">
                <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="qh">
                <el-input v-model="ruleForm.qh"></el-input>
            </el-form-item>
            <el-form-item label="请求类型" prop="type">
                <el-input v-model="ruleForm.type"></el-input>
            </el-form-item>
            <el-form-item label="请求参数" prop="desc">
                <el-input type="textarea" v-model="ruleForm.sendparams"></el-input>
            </el-form-item>
            <el-form-item label="响应数据" prop="desc">
                <el-input type="textarea" v-model="ruleForm.getparams"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {}
        }
    },
    methods: {
        resetForm(ruleForm){
            console.log(this.ruleForm)
            this.axios.post('/api/ariticle/amendTitle',this.ruleForm).then((data)=>{
                console.log(data)
                switch (data.data.code) {
                            case "2081":
                                {
                                    this.$message({
                                        message: "恭喜你，删除成功",
                                        type: "success"
                                    });
                                    // this.$router.go(0)
                                }
                                break;
                            default: {
                                this.$message({
                                    message: data.data.msg,
                                    type: "error"
                                });
                            }
                        }
            })
        }
    },
    created() {
        const data = JSON.parse(sessionStorage.getItem('List'))
        Object.entries(data).forEach(function(i) {
            this.$set(this.ruleForm, i[0], i[1])
        }, this);
        this.ruleForm = data
        if (this.ruleForm.backorfont == 'back') {
            this.ruleForm.qh = '后台接口'
        } else {
            this.ruleForm.qh = '前台接口'
        }
        // console.log(this.ruleForm)
    }
}
</script>
<style>

</style>


