<template>
  <div class="load">
    <ul id="from">
      <li><h4 id="pleaselogin">个人博客</h4></li>
      <li> <input type="text" id="user" v-model.lazy="username.value"  placeholder="请输入用户名" v-focus="username" @blur="change(username)"></li>
      <li><input type="password" id="psw" v-model.lazy="password.value" placeholder="请输入密码" v-focus="password" @blur="change(password)"></li>
      <el-button type="success" id="log" @click="submit">登陆</el-button>
    </ul>
</div>
</template>
<script>
import '../css/login.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
			username:{
				value:"",
				reg:/^[a-zA-Z]{4,12}$/,
				msg:"您输入的用户名格式不对",
				state:false
			},
			password:{
				value:"",
				reg:/^[a-zA-Z0-9]{6,12}$/,
				msg:"您输入的密码格式不对",
				request:true,
				state:false
			}
    }
  },
  methods:{
    change(data){
			data.state=true
		},
    submit(){
		if(this.username.value&&this.password.value){
			this.axios.post("/api/back/user/login",{
				username:this.username.value,
				password:this.password.value
			}).then((data)=>{
				switch(data.data.code){
					case "1001":{
							this.$message({
							message: '恭喜你，登录成功',
							type: 'success'
						});
						sessionStorage.setItem("userId",data.data.data.id)
						sessionStorage.setItem("userName",data.data.data.name)
						this.$router.push("/back/main")
					} break;
					default:{
						this.$message({
							message: data.data.msg,
							type: 'error'
						});
					}
				}
			})
		}else{
			alert("填写")
		}
    }
  }

}
</script>