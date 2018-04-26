import Vue from "vue"
var focus={
  componentUpdated(el,binding){
    var {value,msg,reg,request,state}=binding.value
    let clearP=()=>{
      let $p=el.parentNode.getElementsByTagName("p")[0]
      if($p!=undefined){
        el.parentNode.removeChild($p)
      }
    }
    let testNull=()=>{
      if(value!=""&&value!=undefined&&value!=null){
        testHandle()
      }else{
        testRequest()
      }
    }
    let testRequest=()=>{
      if(request){
        clearP()
        let $p=document.createElement("p")
        $p.setAttribute("class","p")
        $p.innerHTML="此项不能为空"
        el.parentNode.appendChild($p)
      }else{
        clearP()
      }
    }
    let testHandle=()=>{
      clearP()
      if(!reg.test(value)){
        let $p=document.createElement("p")
        $p.setAttribute("class","p")
        $p.innerHTML=msg
        el.parentNode.appendChild($p)
      }
    }
    if(state){
      testNull()
    }


  }
}

Vue.directive("focus",focus)