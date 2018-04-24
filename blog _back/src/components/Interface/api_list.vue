<template>
    <div style="width: 80%">
        <el-table :data="list" style="width: 80%">
            <el-table-column label="标题" prop="title">
            </el-table-column>
            <el-table-column label="前后端分类" prop="backorfont">
            </el-table-column>
            <el-table-column label="时间" prop="time">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row,'one')">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[5]" :page-size="5" layout="sizes, prev, pager, next" :total="20">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [],
            type:'',
            ruleFrom: {

            },
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleEdit(index,row){
             sessionStorage.setItem("List", JSON.stringify(row));
             this.$router.push({ path: "/back/amend_list"});
        },
        
        handleDelete(index,row){
            this.axios.post('/api/ariticle/deleteList',{id:row.id}).then((data)=>{
                if (data.data.code) {
                        this.$message({
                            message: "恭喜你，删除成功",
                            type: "success"
                        });
                        // this.$router.go(0)
                    } else {
                        this.$message({
                            message: data.data.msg,
                            type: "error"
                        });
                    }
            })
        }
    },
    created() {
        this.type = this.$route.query.type
        this.axios.get('/api/ariticle/getList').then((data) => {
            data.data.data.forEach((item)=>{
                if(item.backorfont == this.type){
                    this.list.push(item)
                }
            })
        })
    }
}
</script>
<style>

</style>



