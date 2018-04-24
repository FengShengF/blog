<template>
  <div id="class_list">
    <el-table :data="tableDate" style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-table :data="props.row.twoClass" style="width: 100%">
            <el-table-column label="中文名称" prop="enname">
            </el-table-column>
            <el-table-column label="英文名称" prop="cnname">
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
      <el-table-column label="中文名称" prop="one_Class.enname">
      </el-table-column>
      <el-table-column label="英文名称" prop="one_Class.cnname">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row,'one')">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,'one')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title='提示' :visible.sync='dialogVisible' size='tiny' :before-close='handleClose'>
      <span>您是否确定删除{{dialogMsg}}分类？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type='primary' @click="handleOk">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableDate: [],
      dialogVisible: false,
      state: '',
      dialogMsg: '',
      enname: ''
    };
  },
  methods: {
    initDate(data) {
      return data.oneData.map(i => {
        let obj = {
          one_Class: i,
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
      if (state == "one") {
        sessionStorage.setItem("info", JSON.stringify(data.one_Class));
        this.$router.push({ path: "/back/amend_class", query: { state } });
      } else {
        sessionStorage.setItem("info", JSON.stringify(data));
        this.$router.push({ path: "/back/amend_class" });
      }
    },
    handleDelete(index, data, state) {
      this.dialogVisible = true
      this.state = state
      if (state == "one") {
        let { enname, id } = data.one_Class;
        this.axios.post("/api/back/class/deleteClassOne", { id, enname_one: enname })
          .then(data => {
            switch (data.data.code) {
              case "2041":
                {
                  this.$message({
                    message: "恭喜你，删除成功",
                    type: "success"
                  });
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
      }else {
        let { enname, id, parent_id } = data;
        this.axios.post("/api/back/class/deleteClassTwo", {
          oneId: parent_id, twoId: id, enname_one: enname
        }).then(data => {
          this.$router.go(0);
        })
      }
    },
    handleOk() {
      if (this.state == 'one') {
        this.axios.post('/api/back/class/deleteClassOne', { id: this.oneId, enname_one: this.one_enname }).then((data) => {
          if (data.data.code == '1141') {
            this.$message({
              showClose: true,
              message: '恭喜你，删除成功',
              type: 'success'
            })
            this.$router.go(0)
          } else {
            this.$message({
              showClose: true,
              message: '删除失败',
              type: 'error'
            })
          }
        })
      } else {
        this.axios.post('/api/back/class/deleteClassTwo', { oneId: this.oneId, twoId: this.twoId, enname_one: this.one_enname }).then((data) => {

          if (data.data.code == '1143') {
            this.$message({
              showClose: true
            })
          }
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
  },
  created() {
    this.axios.get("/api/back/class/Class").then(data => {
      this.tableDate = this.initDate(data.data.data);
    });
  }
};
</script>
<style>
#class_list {
  width: 70%;
}

tbody {
  width: 100%;
  /* background: red; */
}
</style>
