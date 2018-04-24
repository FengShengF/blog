<template>
    <div style="width: 100%">
        <el-table :data="tableDate5" style="width: 80%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-table :data="props.row.twoClass" style="width: 100%">
                        <el-table-column label="中文名称" prop="cnname">
                        </el-table-column>
                        <el-table-column label="英文名称" prop="enname">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="中文名称" prop="oneClass.cnname">
            </el-table-column>
            <el-table-column label="英文名称" prop="oneClass.enname">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row,'one')">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,'one')">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <span>你确定要删除</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog> -->
    </div>
</template>

<style>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>

<script>
export default {
    created() {
        this.axios.get('/api/back/Class').then((data) => {
            if (data.data.code === '2031') {
                this.tableDate5 = this.initDate(data.data.data)
            }
        })

    },
    methods: {
        //     handleClose(done) {
        //     this.$confirm('确认关闭？')
        //       .then(_ => {
        //         done();
        //       })
        //       .catch(_ => {});
        //   },
        //数据处理
        initDate(data) {
            return data.oneData.map(i => {
                let obj = {
                    oneClass: i,
                    twoClass: []
                };
                data.twoData.forEach(j => {
                    if (j.parent_id == i.id) {
                        obj.twoClass.push(j);
                    }
                });
                return obj;
            });
        },
        handleEdit(index, data, state) {
            //根据one判断是遍编辑一级还是二级
            // console.log(data)
            if (state == "one") {
                sessionStorage.setItem("oneClass", JSON.stringify(data.oneClass));
                this.$router.push({ path: "/back/amend_class", query: { state: 'one' } });
            } else {
                sessionStorage.setItem("info", JSON.stringify(data));
                this.$router.push({ path: "/back/amend_class" });
            }
        },
        handleDelete(index, data, state) {
            this.dialogVisible = true
            if (state == "one") {
                let { enname, id } = data.oneClass;
                this.axios
                    .post("/api/back/deleteClassOne", { id, enname_one: enname })
                    .then(data => {
                        switch (data.data.code) {
                            case "2041":
                                {
                                    this.$message({
                                        message: "恭喜你，删除成功",
                                        type: "success"
                                    });
                                    this.$router.go(0)
                                }
                                break;
                            default: {
                                this.$message({
                                    message: data.data.msg,
                                    type: "error"
                                });
                            }
                        }
                        this.$router.go(0);
                    });
            } else {
                //删除二级
                let { enname, id, parent_id } = data;
                this.axios.post("/api/back/deleteClassTwo", {
                    oneId: id, twoId: parent_id, enname_one: enname
                }).then(data => {
                    console.log(data)
                    if (data.data.code) {
                        this.$message({
                            message: "恭喜你，删除成功",
                            type: "success"
                        });
                        this.$router.go(0)
                    } else {
                        this.$message({
                            message: data.data.msg,
                            type: "error"
                        });
                    }
                    this.$router.go(0); 
                })
            }
        }
    },
    data() {
        return {
            tableDate5: [],
            dialogVisible: false
        }
    }
}
</script>


