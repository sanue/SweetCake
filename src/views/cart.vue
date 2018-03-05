<template>
  <div>
    <n-header></n-header>
    <div class="container">
      <div class="check-out">
        <div class="bs-example4">
          <div class="table-responsive">
            <div class="table-heading simpleCart_shelfItem">
                <div class="title">
                  <h4><!--<input type="checkbox" class="chks"/>--></h4>
                  <h4>商品信息</h4>
                  <h4>单价</h4>
                  <h4>数量</h4>
                  <h4>金额</h4>
                  <h4>操作</h4>
                </div>
              <ul class="cartList">
                <li v-for="(item,key) in currentCartList">
                 <div class="item">
                    <!-- <input type="checkbox" class="chks"/>-->
                  </div>
                  <div class="item1 item">
                    <img  v-bind:src="'/static/images/'+item.proImg" alt="商品图片" title="商品图片"/>
                    <div class="proInfo">
                      <div class="item-name">{{item.proName}}</div>
                      <div class="itemIntro"><p>{{item.proIntro}} </p></div>
                    </div>

                  </div>
                  <div class="item">
                    <span class="linethough">￥{{item.before}}</span>  <span >￥{{item.price}}</span>
                  </div>
                  <div class="item item-amount ">
                    <a href="javascript:void(0)" id="minus" @click="minus(item)">-</a>
                    <a href="javascript:void(0)" id="plus" @click="plus(item)">+</a>
                    <span class="item-proNum"><input type="text" v-bind:value="item.proNum" ></span>
                  </div>
                  <div class="item">
                    <span class="item-price">
                      ￥{{item.price*item.proNum}}
                    </span>
                  </div>
                  <div class="item">
                    <a href="javascript:void(0)" @click="deleteCartItem(item)">删除</a>
                  </div>
                </li>
              </ul>
              <div class="totalPrice">
                总价:￥{{totalPrice}}
              </div>
            </div>



          </div>
        </div>
        <div class="produced">

            <router-link tag="a" to="/orderList" class="hvr-skew-backward">
              生成订单
            </router-link>


        </div>
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
        userId:'',
        currentCartList:[],
        totalPrice:0
      }
    },
    components:{
      nHeader,
      nFooter
    },
    mounted(){
      this.getUserId();


    },
    methods:{
      getUserId(){
        axios.post('/users/getCurrentUser').then((response)=>{
          console.log(response.data);
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
      plus(item){
        let currentItem;
        this.currentCartList.forEach((val)=>{
          if(val.proId ==item.proId ){
            val.proNum++;
            currentItem = val;
            this.dealProNum(val.proId,val.proNum);
          }
        });

      },
      minus(item){
        let currentItem;
        this.currentCartList.forEach((val)=>{
          if(val.proId ==item.proId&&val.proNum>0 ){
            val.proNum--;
            currentItem = val;
            this.dealProNum(val.proId,val.proNum);
          }
        });

      },
      dealProNum(proId,proNum){
        axios.post('/users/changeProNum',{
          proNum:proNum,
          proId:proId
        }).then((response)=>{
          console.log(response);
          this.getCartLists();
        })
      },
      getTotalPrice(){
        this.totalPrice = 0;
        this.currentCartList.forEach((item)=>{
          this.totalPrice += parseInt(item.price*item.proNum)
        })
      },
      deleteCartItem(item){
        let proId = item.proId;
        let newCartList = [];

        axios.post('/users/deleteCartItem',{
          proId:proId
        }).then((response)=>{
            if(response.status == 200){
              alert('删除成功');
              this.getCartLists();
            }
        });

      }

    }
  }
</script>

<style>

</style>
