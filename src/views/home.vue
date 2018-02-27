<template>
  <div>
    <n-header></n-header>
    <div class="banner">
      <div class="container">
        <section class="rw-wrapper">
          <h1 class="rw-sentence">
            <span>Happy & Sweet</span>
            <!--<div class="rw-words rw-words-1">-->
            <!--<span>Beautiful Designs</span>-->
            <!--<span>2Beautiful Designs</span>-->
            <!--<span> 3Beautiful Designs</span>-->
            <!--<span>4Beautiful Designs</span>-->
            <!--<span>5Beautiful Designs</span>-->
            <!--<span>6Beautiful Designs</span>-->
            <!--</div>-->
            <br><br>
            <div class="rw-words rw-words-2">
              <span>我们享受美食</span>
              <span>我们把握生活</span>
              <span>让甜蜜在嘴里化开</span>
              <span>让欣喜在心里分享</span>
              <span>这是我们的目标</span>
              <span>也是我们存在的意义</span>
            </div>
          </h1>
        </section>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div class="content-top">
          <div class="col-md-12 col-md">
            <div class="col-2">
              <span>hot！</span>
              <h2><a href="/pro">流转的灵魂磁场</a></h2>
              <p> 炽热的爱伴随着香浓的蛋糕，迷人的香味释放而出 只有相似的灵魂彼此靠近 才能散发出这如此能量...</p>
              <a href="/pro" class="buy-now">现在就去购买 ~</a>
              <br>
            </div>
            <div class="col-1">
              <a href="single.html" class="b-link-stroke b-animate-go  thickbox">
                <img src="/static/images/cakeBanner.jpg" class="img-responsive" alt="">
                <div class="b-wrapper1 long-img"><p class="b-animate b-from-right    b-delay03 ">Lorem ipsum</p>
                  <label class="b-animate b-from-right    b-delay03 "></label>
                  <h3 class="b-animate b-from-left    b-delay03 ">Trendy</h3></div>
              </a>

              <!---<a href="single.html"><img src="/static/images/pi.jpg" class="img-responsive" alt=""></a>-->
            </div>

          </div>
          <div class="col-md-6 col-md">
            <div class="col-3">
              <a href="single.html"><img src="/static/images/pi1.jpg" class="img-responsive" alt="">
                <div class="col-pic">
                  <p>Lorem Ipsum</p>
                  <label></label>
                  <h5>For Men</h5>
                </div>
              </a>
            </div>
            <div class="col-3">
              <a href="single.html"><img src="/static/images/pi2.jpg" class="img-responsive" alt="">
                <div class="col-pic">
                  <p>Lorem Ipsum</p>
                  <label></label>
                  <h5>For Kids</h5>
                </div>
              </a>
            </div>
            <div class="col-3">
              <a href="single.html"><img src="/static/images/pi3.jpg" class="img-responsive" alt="">
                <div class="col-pic">
                  <p>Lorem Ipsum</p>
                  <label></label>
                  <h5>For Women</h5>
                </div>
              </a>
            </div>
          </div>
          <div class="col-md-6 col-md">
            <div class="col-3">
              <a href="single.html"><img src="/static/images/pi1.jpg" class="img-responsive" alt="">
                <div class="col-pic">
                  <p>Lorem Ipsum</p>
                  <label></label>
                  <h5>For Men</h5>
                </div>
              </a>
            </div>
            <div class="col-3">
              <a href="single.html"><img src="/static/images/pi2.jpg" class="img-responsive" alt="">
                <div class="col-pic">
                  <p>Lorem Ipsum</p>
                  <label></label>
                  <h5>For Kids</h5>
                </div>
              </a>
            </div>
            <div class="col-3">
              <a href="single.html"><img src="/static/images/pi3.jpg" class="img-responsive" alt="">
                <div class="col-pic">
                  <p>Lorem Ipsum</p>
                  <label></label>
                  <h5>For Women</h5>
                </div>
              </a>
            </div>
          </div>
          <div class="clearfix"></div>

        </div>

        <div class="col-2 col-md-12 col-md">
          <span>new！</span>
          <h2><a href="single.html">找寻心中的美味</a></h2>
          <p> 我的能力就是让一切变得有趣，让舌尖带来的璀璨点燃心中的甜蜜 ..</p>
          <div class="content-mid">
            <h4>最新产品</h4>
            <label class="line"></label>
            <div class="mid-popular">
              <div class="col-md-3 item-grid simpleCart_shelfItem" v-for="(item,key) in hotLists">
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
    name: "home",
    data() {
      return {
        hotLists: [],
      }
    },
    components: {
      nHeader,
      nFooter
    },
    mounted(){
      this.getHotLists(8);
    },
    methods: {
      getHotLists(num) {
        let params = {
          limitNum : num
        }
        axios.get('/goods/getHotLists',{
          params:params
        }).then((response)=>{
            if(response.data.status=="0"){
              this.hotLists = response.data.result.list;
              console.log( this.hotLists);
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
