<template>
<div>
  <n-header :currentUserName="userName"></n-header>
  <!--login-->
  <div class="container">
    <div class="login">

      <form>
        <div class="col-md-6 login-do">
          <div class="login-mail">
            <input type="text" placeholder="请输入用户名:" required v-model="userName" >
            <i class="glyphicon glyphicon-envelope"></i>
          </div>
          <div class="login-mail">
            <input type="password" placeholder="请输入密码:" required v-model="userPwd">
            <i class="glyphicon glyphicon-lock"></i>
          </div>
          <div class="error">
            <span v-show="userNameFalse">用户名输入不正确</span>
            <span v-show="userPwdFalse">密码输入不正确</span>
          </div>
          <a class="news-letter " href="#">
            <label class="checkbox1"><input type="checkbox" name="checkbox"><i> </i>忘记密码</label>
          </a>
          <label class="hvr-skew-backward">
            <a href="javascript:void(0)" @click="login">登陆</a>
          </label>
        </div>
        <div class="col-md-6 login-right">
          <h3>Completely Free Account</h3>

          <p>Pellentesque neque leo, dictum sit amet accumsan non, dignissim ac mauris. Mauris rhoncus, lectus
            tincidunt tempus aliquam, odio
            libero tincidunt metus, sed euismod elit enim ut mi. Nulla porttitor et dolor sed condimentum.
            Praesent porttitor lorem dui, in pulvinar enim rhoncus vitae. Curabitur tincidunt, turpis ac
            lobortis hendrerit, ex elit vestibulum est, at faucibus erat ligula non neque.</p>
          <a href="register.html" class=" hvr-skew-backward">Register</a>

        </div>

        <div class="clearfix"></div>
      </form>
    </div>

  </div>

  <!--//login-->
  <n-footer></n-footer>
</div>
</template>

<script>

  import nHeader from '@/components/header'
  import nFooter from '@/components/footer'
  import axios from 'axios'
  export default {
    data(){
      return{
          userName:'',
          userPwd:'',
          userNameFalse:false,
          userPwdFalse:false

      }
    },
    components:{
      nHeader,
      nFooter
    },
    methods:{
      login(){
        axios.post("users/loginIn",{
          userName:this.userName,
          userPwd:this.userPwd
        }).then((response)=>{

          let res = response.data;
          if(res.status == "0"){
            this.userNameFalse = false;
            this.userName = this.userName;
            this.$router.push({ path: '/home' })
          }else{
             this.userNameFalse = true;
          }
        })
      }
    }
  }
</script>

<style>

</style>
