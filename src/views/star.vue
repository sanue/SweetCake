<template>
  <div>
    <n-header></n-header>
    <div class="content-mid">
      <br>
      <h3>五星产品</h3>
      <label class="line"></label>
      <div class="container">
        <div class="mid-popular">
          <div class="col-md-3 item-grid simpleCart_shelfItem" v-for="(item,key) in starLists">
            <div class=" mid-pop">
              <div class="pro-img">
                <span class="collectionTimes">收藏次数:{{item.collectionTimes}}</span>
                <img v-lazy="'/static/images/'+item.proImg" class="img-responsive" alt="">
                <div class="zoom-icon">
                  <router-link tag="div" :to="'/proDetails?proId='+item.proId" class="zoom-icon">
                    <i class="glyphicon glyphicon-menu-right icon"></i>
                  </router-link>
                </div>
              </div>
              <div class="mid-1">
                <div class="women">
                  <div class="women-top">
                    <span>{{item.proName}}</span>
                    <h6><a href="javascript:void(0)">{{item.proIntro}}</a></h6>
                  </div>
                  <div class="img item_add">
                    <a href="javascript:void(0)" @click="addList(item.proId)"><img src="/static/images/cartW.png" alt="加入购物车" width="24" height="24"/></a>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="mid-2">
                  <p ><label>¥{{item.before}}</label><em class="item_price">¥{{item.price}}</em></p>
                  <div class="block">
                    <div class="starbox small ghosting">
                      <div class="positioner">
                        <div class="stars">
                          <div class="colorbar" :style="{width:item.proStar*20+'%'}"></div>
                          <div class="star_holder">
                            <div class="star star-0"></div>
                            <div class="star star-1"></div>
                            <div class="star star-2"></div>
                            <div class="star star-3"></div>
                            <div class="star star-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="clearfix"></div>
                </div>

              </div>
            </div>
          </div>

          <div class="clearfix"></div>
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
        starLists:[]
      }
    },
    components:{
      nHeader,
      nFooter
    },
    mounted(){
      this.getStarLists(100);
    },
    methods:{
      getStarLists(num) {
        let params = {
          limitNum : num
        }
        axios.get('/goods/getStarLists',{
          params:params
        }).then((response)=>{
          if(response.data.status=="0"){
            this.starLists = response.data.result.list;
            console.log( this.starLists);
          }else{
            alert("获取最新数据失败")
          }
        })

      }
    }
  }
</script>

<style>

</style>
