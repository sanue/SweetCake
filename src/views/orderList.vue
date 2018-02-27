<template>
  <div>
    <n-header>  </n-header>
    <div class="container">
      <div class="bs-example" data-example-id="contextual-table">
        <table class="table">
          <thead>
          <tr>
            <th>
            数量
            </th>
            <th>商品信息</th>
            <th>商品介绍</th>
            <th>单价</th>
            <th>数量</th>
            <th>金额</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(item,key) in currentCartList">
            <th>{{key}}</th>
            <td scope="row">{{item.proName}}</td>
            <td>{{item.proIntro}}</td>
            <td>{{item.price}}元</td>
            <td>{{item.proNum}}份</td>
            <td>{{item.price*item.proNum}}元</td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>

    <n-footer></n-footer>
  </div>
</template>

<script>
  import nHeader from './../components/header'
  import nFooter from './../components/footer'
  import axios from 'axios'
    export default {
      components:{
        nHeader,
        nFooter,
      },
      data(){
        return{
          currentCartList:[],
          totalPrice :0
        }

      },
      mounted(){
        this.getUserId();
      },
      methods:{
        getUserId(){
          axios.post('/users/getCurrentUser').then((response)=>{
            if(response.data.status=="0"){
              let userInfo = response.data.result.userInfo;
              this.userId = userInfo.userId;
              this.getCartLists();
            }else{
              this.$router.push({path:'/login'});
            }
          });
        },
        getCartLists(){
          let param = {
            userId:this.userId
          }
          axios.get('/users/currentCarts',{
            params:param
          }).then((response)=>{
            let res = response.data;
            this.currentCartList = res.result.list[0].cartList;

            this.getTotalPrice();
          })
        },
        getTotalPrice(){
          this.totalPrice = 0;
          this.currentCartList.forEach((item)=>{
            this.totalPrice += parseInt(item.price*item.proNum)
          })
        },
      }
    }
</script>

<style>

</style>
