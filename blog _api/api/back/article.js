var express = require('express');
var router = express.Router();
var hasOwnProperty = require('has-own-property-x');  //支持hasOwnProperty
var Unique = require("../common/Unique")
var CreatTime = require("../common/creatTime")
var {
  sqlHandle,  //修改和增加操作
  readHandle,  //读取操作
  searchHandle,  //检测有无某条数据，有为false
  searchHandleNormal,  //检测有无某条数据，有为true
  query             // //基本操作
} = require("../../config/db_connect")

//获取一二级文章
router.get("/getArticleList", (req, res, next) => {
  var getOneClass = `select * from one_class`
  var getTwoClass = `select * from two_class`

  async function sqlAllHandle() {
    let oneData = await readHandle(getOneClass);
    let twoData = await readHandle(getTwoClass);
    let data = { oneData, twoData }
    return {
      code: "6031",
      msg: "获取数据成功",
      data
    }
  }
  sqlAllHandle().then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send({
      code: "6032",
      msg: "获取数据失败"
    })
  })
})

// 插入文章
router.post('/insert',(req,res,next)=>{
    var sql = `insert into ${req.body.enname_one}(id,oneId,twoId,article_name,editer,content,time,visitors,daodu,imgsrc,recommend,art_show) values('${Unique()}','${req.body.oneId}','${req.body.twoId}','${req.body.article_name}','${req.body.editer}','${req.body.content}','${req.body.time}',0,'${req.body.daodu}','${req.body.imgsrc}','${req.body.recommend}','${req.body.art_show}')`
    console.log(sql)

    var updateArticalNum=`update two_class set article_num+1 where id='${req.body.twoId}'`

    const asyncInsertArticle=async function(){
        await sqlHandle(sql)
        await sqlHandle(updateArticalNum)
        return 
    }
    asyncInsertArticle().then((data)=>{
        res.send({
            code: '3011',
            msg: '插入成功'
        })
    }).catch((err)=>{
        res.send({
            code: '3012',
            msg: '插入失败'
        })
    })
})

//获取列表详情
router.get("/getList", (req, res, next) => {
  var getList = `select * from apiList`
  async function readHandles() {
    let data = await readHandle(getList);
    return {
      code: "2021",
      msg: "获取数据成功",
      data
    }
  }
  readHandles().then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send({
      code: "2022",
      msg: "获取数据失败"
    })
  })

}),

  //删除接口
  router.post('/deleteList', (req, res, next) => {
    let { id } = req.body
    if (id) {
      let selectList = `delete from apiList where id='${id}'`
      query(selectList).then((data) => {
        res.send({
          code: "3001",
          msg: "删除数据成功",
        })
      }).catch((err) => {
        res.send({
          code: "3002",
          msg: "删除数据失败"
        })
      })
    }
  })

//修改接口
router.post("/amendTitle", (req, res, next) => {
  // console.log(req.body)
  let { title, url, type, sendparams, getparams, backorfont, time,id } = req.body

  if (title, url, type, sendparams, getparams, backorfont, time) {
    let amendTitle = `update apiList set title='${title}',url='${url},type='${type},sendparams='${sendparams},getparams='${getparams},backorfont='${backorfont},time='${time} where id='${id}'`
    
    sqlHandle(amendTitle).then((data) => {
      res.send({
        code: "2081",
        msg: "数据修改成功"
      })
    }).catch((err) => {
      res.send({
        code: "2082",
        msg: "数据修改失败"
      })
    })

  }
})



module.exports = router