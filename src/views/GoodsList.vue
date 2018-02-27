<template>

  <div>
    <n-header></n-header>
    <!-- menu -->
    <div class="banner-top">
      <div class="container">
        <h1>Products</h1>
        <em></em>
        <h2><a href="index.html">Home</a><label>/</label>Products</h2>
      </div>
    </div>
    <div class="product">
      <div class="container">
        <div class="col-md-3 product-bottom">
          <!--categories-->
          <div class=" rsidebar span_1_of_left">
            <h4 class="cate">甜品分类</h4>
            <ul class="menu-drop">
              <li class="item1"><a href="javascript:void(0)" @click="getKind('1')">港式甜品 </a></li>
              <li class="item2"><a href="javascript:void(0)" @click="getKind('2')">台式甜品 </a></li>
              <li class="item3"><a href="javascript:void(0)" @click="getKind('3')">广府糖水</a></li>
              <li class="item3"><a href="javascript:void(0)" @click="getKind('4')">日式甜品</a></li>
            </ul>
          </div>
          <section class="sky-form">
            <h4 class="cate">价格</h4>
            <div class="row row1 scroll-pane">
              <div class="col col-4">
                <label class="checkbox"><input type="radio" name="radio" @click="sortGoodsByPrice"><i></i>
                  All
                </label>
                <label class="checkbox" v-for="(item,key) in priceFilter">
                  <input type="radio" name="radio" @click="setPriceFilter(item)">
                  <i></i>
                  {{item.startPrice}}元 - {{item.endPrice}}元
                </label>

              </div>
            </div>
          </section>


        </div>
        <div class="col-md-9">
          <div class="mid-popular">
            <div class="sortBy">
              <h5>排序:</h5>
              <ul>
                <li @click="sortGoodsByPrice">价格↑↓</li>
                <li @click="sortGoodsByTimes">最受欢迎↑↓</li>
                <li @click="sortGoodsByStars">只看五星</li>
              </ul>
            </div>
            <div class="proLists">
              <div class="col-md-4 item-grid1 simpleCart_shelfItem" v-for="(item,keys) in goodsList" id="filter"
                   v-bind:class="{'filterby-show':filterBy}">
                <div class=" mid-pop">
                  <div class="pro-img">
                    <span class="collectionTimes">收藏次数:{{item.collectionTimes}}</span>
                    <img v-lazy="'/static/images/'+item.proImg" class="img-responsive" alt="">
                    <router-link tag="div" :to="'/proDetails?proId='+item.proId" class="zoom-icon">
                      <i class="glyphicon glyphicon-menu-right icon"></i>
                    </router-link>
                  </div>
                  <div class="mid-1">
                    <div class="women">
                      <div class="women-top">
                        <span>{{item.proName}}</span>
                        <h6><a href="javascript:void(0)">{{item.proIntro}}</a></h6>
                      </div>
                      <div class="img item_add">
                        <a href="javascript:void(0)" @click="addList(item.proId)"><img src="/static/images/cartW.png"
                                                                                       alt="加入购物车" width="24"
                                                                                       height="24"/></a>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="mid-2">
                      <p><label>¥{{item.before}}</label><em class="item_price">¥{{item.price}}</em></p>
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
            </div>
            <div class="clearfix"></div>
            <div v-infinite-scroll="loadMore" v-if="loading" infinite-scroll-disabled="busy"
                 infinite-scroll-distance="10" class="loading">
              加载中...
            </div>

          </div>

        </div>

        <div class="clearfix"></div>

      </div>

    </div>
    <n-modal v-bind:mdShow="mdShow">
      <p slot="title">
        请先登录
      </p>
      <div slot="infomation">
        登录后才可以加入购物车哦！
      </div>
      <div slot="MyBtn">
        <button class="btn btn-1 btn-default">
          <router-link tag="span" :to="'/login'">去登录</router-link>

        </button>
        <button class="btn btn-1 btn-default" @click="mdShow=false">取消</button>
      </div>

    </n-modal>
    <!-- //menu -->
    <n-footer></n-footer>
  </div>
</template>

<script>
  import '@/assets/css/bootstrap.css'
  import '@/assets/css/style.css'
  import '@/assets/css/style4.css'
  import '@/assets/css/jstarbox.css'
  import '@/assets/css/form.css'
  import nHeader from '@/components/header'
  import nFooter from '@/components/footer'
  import nModal from '@/components/modal'
  import axios from 'axios'

  export default {
    data() {
      return {
        goodsList: [],
        priceFilter: [
          {
            startPrice: '0',
            endPrice: '200',
            level: 1
          },
          {
            startPrice: '200.00',
            endPrice: '400',
            level: 2
          },
          {
            startPrice: '400.00',
            endPrice: '600',
            level: 3
          },
          {
            startPrice: '600.00',
            endPrice: '800',
            level: 4
          }
        ],
        filterBy: false,
        page: 1,
        pageSize: 6,
        busy: true,
        loading: true,
        //排序条件
        sortPriceFlag: true,
        sortHotFlag: true,
        sortString: "price",
        //价格分区筛选
        priceLevel: 'All',
        //全局模态框
        mdShow: false
      }
    },
    components: {
      nHeader,
      nFooter,
      nModal
    },
    mounted() {
      this.getGoodsList();
    },
    methods: {
      getGoodsList(flag, stringWords) {
        if (stringWords == "times") {
          this.sortString = "times";
          var param = {
            page: this.page,
            pageSize: this.pageSize,
            sortByTimes: this.sortHotFlag ? 1 : -1
          }
        } else if (stringWords == "star") {
          this.sortString = "star";
          var param = {
            page: this.page,
            pageSize: this.pageSize,
            sortByStar: "proStar"
          }
        } else if (stringWords == "priceLevel") {
          this.sortString = "priceLevel";
          var param = {
            page: this.page,
            pageSize: this.pageSize,
            priceLevel: this.priceLevel
          }
        } else if (stringWords == '1' || stringWords == '2' || stringWords == '3' || stringWords == '4') {
          this.sortString = stringWords;
          var param = {
            page: this.page,
            pageSize: this.pageSize,
            getCategories: stringWords
          }
        } else {
          this.sortString = "price";
          var param = {
            page: this.page,
            pageSize: this.pageSize,
            sortByPrice: this.sortPriceFlag ? 1 : -1
          }
        }
        axios.get("/goods/lists", {
          params: param
        }).then((response) => {
          let res = response.data;
          if (res.status = "0") {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list);
              if (res.result.count < param.pageSize) {
                this.loading = false;
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.goodsList = res.result.list;
              this.busy = false;
            }


          } else {
            this.goodsList = []
          }
        })
      },
      setPriceFilter(item) {
        this.priceLevel = item.level;
        this.page = 1;
        this.getGoodsList(false, "priceLevel");
      },
      //价格升降
      sortGoodsByPrice() {
        this.sortPriceFlag = !this.sortPriceFlag;
        this.page = 1;
        this.getGoodsList(false, "price");
      },
      //收藏次数
      sortGoodsByTimes() {
        this.sortHotFlag = !this.sortHotFlag;
        this.page = 1;
        this.getGoodsList(false, "times");
      },
      //五星甜品
      sortGoodsByStars() {
        this.page = 1;
        this.getGoodsList(false, "star");
      },
      getKind(num) {
        this.page = 1;
        this.getGoodsList(false, num);
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          switch (this.sortString) {
            case "price":
              this.getGoodsList(true);
              break;
            case "times":
              this.getGoodsList(true, "times");
              break;
            case "star":
              this.getGoodsList(true, "star");
              break;
            case "priceLevel":
              this.getGoodsList(true, "priceLevel");
              break;
            case "1":
              this.getGoodsList(true, "1");
              break;
            case "2":
              this.getGoodsList(true, "2");
              break;
            case "3":
              this.getGoodsList(true, "3");
              break;
            case "4":
              this.getGoodsList(true, "4");
              break;

          }

        }, 500);
      },
      addList(proId) {
        axios.post('/goods/addCart', {
          proId: proId
        }).then((res) => {
          if (res.data.status == "0") {
            var r=confirm("加入当前用户的购物车成功，是否查看购物车？")
            if (r==true)
            {
              this.$router.push({ path: '/cart' })
            }
            else
            {

            }
          } else {

            this.mdShow = true;
            // this.$router.push({ path: '/login' })
          }
        })
      },

    }
  }
</script>

<style>

</style>
