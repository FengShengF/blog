<template>

    <div class="classmain">
        <el-tab
          :data='formData'
          border
          style='width:800px'>
          <el-table-column
            label='标题'
            width='180'>
          <template scope="scope">

              <span style ='margin-left:0px'>{{scope.row.article_name}}</span>
          </template>
        </el-table-column>
          <el-table-column
            label='作者'
            width='180'>
           <template scope="scope">

              <span style ='margin-left:0px'>{{scope.row.editer}}</span>
          </template> 
          </el-table-column>
          <el-table-column
            label='时间'
            width='180'>
            <template scope="scope">

              <span style ='margin-left:0px'>{{scope.row.time}}</span>
          </template> 
          </el-table-column>
        <el-table-column label="操作">
            <template scope='scope'>
                <el-button
                   size='small'
                   @click='handleEdit(scope,$index,scope.row)'>编辑</el-button>
                <el-button
                   size='small'
                   type='danger'
                   @click='handleDelete(scope,$index,scope.row)'>删除</el-button>
            </template>
        </el-table-column>
        </el-tab>
    <el-pagination
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
        :current-page='nowPage'
        :page-sizes="[2,5,10,15]"
        :page-size='everyrows'
        layout='total,sizes,prev,pager,next,jumper'
        :total='this.olddata.length'>
    </el-pagination>
    <el-dialog
    title="提示"
    :vieible.sync='dialogvisible'
    size='tiny'
    :before-close='handleClose'>
    <span>这是一段信息</span>
    <span slot='footer' class='dialog-footer'>
        <el-button @click='dialogVisible=false'>取消</el-button>
        <el-button type='primary' @click='handleOK'>确定</el-button>
    </span>
</el-dialog>
    </div>
</template>
<script>
    export default{
        name:'add_article',
        data(){
            return {
                olddata:[],
                formData:[],
                everyrows:5,
                nowPage:1,
                dialogVisible:false,
                id:''
            }
        },
        created(){
            this.getInitData()
        },
        methods:{
            getInitData(){
                this.axios.get('/api/back/article/getArticleList')
                .then((data)=>{
                    console.log(data)
                    if(data.data.code=='1221'){
                        console.log(data.data.data)
                        this.olddata=data.data.data
                        this.formData=this.olddata.slice(0,this.everyrows)
                    }
                })
            },
            dbclick(row){
                this.$router.push({name:'api_list_detail',params:{data:row}})
            },
            handleEdit(index,row){
                this.$router.push({path:'/back/amend_article',query:{id:row.id}})
            },
            handleSizeChange(val){条
                console.log('每页${val}')
                this.everyrows=val
                this.formData=this.olddata.slice((this.nowPage-1)*this.everyrows,this.everyrows*this.nowPage)
            },
            handleCurrentChange(val){
                this.nowPage=val
                this.formData=this.olddata.slice((val-10*this.everyrows,this.everyrows*val))
                console.log(this.everyrows)
                console.log('当前页:${val}')
            },
            handleDelete(index,row){
                console.log(index,row)
                this.dialogVisible=true
                this.id=row.id
                this.enname_one=row.enname_one
                this.twoId=row.twoId
                console.log(row)
            },
            handleOK(){
                this.axios.post('/api/back/deleteArticle',{twoId:this.twoId,enname_one:this.enname_one,id:this.id})
                .then((data)=>{
                    if(data.data.code=='3041'){
                        this.$message({
                            showClose:true,
                            message:'删除成功',
                            type:'success'
                        })
                        this.getInitData()
                    }else{
                        this.$message({showClose:true,
                        message:'删除失败',
                        type:'error'
                    })
                 }
                })
            }
        }
    }
</script>