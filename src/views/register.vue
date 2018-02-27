<template>
  <div>
    <n-header></n-header>
    <!--register-->
    <div class="container">
      <div class="login">
        <form>
          <div class="col-md-6 login-do">
            <div class="login-mail">
              <input type="text" placeholder="请输入姓名" required v-model="registerName">
              <i class="glyphicon glyphicon-user"></i>
            </div>
            <div class="login-mail">
              <input type="text" placeholder="请输入手机号" required v-model="telephoneNum">
              <i class="glyphicon glyphicon-phone"></i>
            </div>
            <div class="login-mail">
              <input type="password" placeholder="请输入密码" required v-model="registerPwd">
              <i class="glyphicon glyphicon-lock"></i>
            </div>
            <a class="news-letter " href="#">
              <label class="checkbox1"><input type="checkbox" name="checkbox"><i> </i>忘记密码</label>
            </a>
            <label class="hvr-skew-backward">
              <a href="javascript:void(0)" @click="reg">注册</a>
            </label>

          </div>
          <div class="col-md-6 login-right">
            <h3>Completely Free Account</h3>

            <p>Pellentesque neque leo, dictum sit amet accumsan non, dignissim ac mauris. Mauris rhoncus, lectus
              tincidunt tempus aliquam, odio
              libero tincidunt metus, sed euismod elit enim ut mi. Nulla porttitor et dolor sed condimentum.
              Praesent porttitor lorem dui, in pulvinar enim rhoncus vitae. Curabitur tincidunt, turpis ac
              lobortis hendrerit, ex elit vestibulum est, at faucibus erat ligula non neque.</p>
            <a href="login.html" class="hvr-skew-backward">Login</a>

          </div>

          <div class="clearfix"></div>
        </form>
      </div>

    </div>
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
          registerName:'',
          registerPwd:'',
          telephoneNum:''
      }
    },
    components:{
      nHeader,
      nFooter
    },
    methods:{
      reg(){
        axios.post('/users/reg',{
            userName:this.registerName,
            userPwd:this.registerPwd,
             telephoneNum:this.telephoneNum
        }).then((response)=>{
          console.log("response:"+response);
        });
      }
    }
  }
</script>

<style>

</style>
