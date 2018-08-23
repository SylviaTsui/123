<template>
  <div>
    <img src="../assets/baibaoxiang.png" class="baibaoxiang"/>
    <div ref="prizeListWrapper" id="wrapper" @scroll="lazyLoadPage">
      <div>
        <img src="../assets/baibaoxiang-logo.png" class="baibaoxiangLogo"/>
        <div id="itemBox" class="card" v-for="item in prizeData">
          <div class="left">
            <span class="getTime">获奖时间:</span>
            <span class="time">{{item.createTime}}</span>
          </div>
          <div class="right">
            <span class="status" v-if="item.type >= 4">已入账</span>
            <span class="status" v-if="item.type === 2 && item.status === 0">未领取</span>
            <span class="status"
                  v-if="item.type === 2 && item.status === 1 && item.deliverInfo.sentStatus === 0">未配送</span>
            <span class="status"
                  v-if="item.type === 2 && item.status === 1 && item.deliverInfo.sentStatus === 1">已配送</span>
            <span class="status" v-if="item.type === 3 && item.status === 0">未使用</span>
            <span class="status" v-if="item.type === 3 && item.status === 1">已使用</span>

          </div>
          <div class="prize-content">
            <img class="prizeImg" :src="item.prizeImg"/>
            <span class="prize-name">{{item.prizeName}}</span>
          </div>
          <div class="button-wrapper" v-if="item.type == 2 && item.status == 0">
            <button class="detail" @click="goDetailPage(item)">奖品详情</button>
            <button class="take" @click="takePrize(item.id)">领取</button>
          </div>
          <div class="button-wrapper" v-if="item.type == 2 && item.status == 1">
            <button class="detail" @click="goDetailPage(item)">奖品详情</button>
            <button class="take" @click="goSentMsg(item.deliverInfo)">领取信息</button>
          </div>
          <div class="button-wrapper" v-if="item.type == 3 && item.status == 0">
            <router-link :to="{name:'detailpage',params:{key:item.details}}">
              <button class="detail" @click="goDetailPage(item)">优惠券详情</button>
            </router-link>
            <button class="take">使用</button>
          </div>
          <div class="button-wrapper" v-if="item.type == 3 && item.status == 1">
            <router-link :to="{name:'detailpage',params:{key:item.details}}">
              <button class="detail" @click="goDetailPage(item)">优惠券详情</button>
            </router-link>
            <button class="alreadyTake">使用</button>
          </div>
        </div>
        <div id='loadMore'>
          <h3 ref="loadMoreText">加载更多.....</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PrizeList',
    data () {
      return {
        prizeData: [],
        details: null,
        hostname: null,
        pathname: null,
        url: 'http://bs.tianaishijie.com/userService',
        prizeId: null,
        //快递
        sentStatus: null,
        deliverType: null,
        name: '',
        mobileNumber: '',
        address: '',
        //自提
        supplierId: null,
        supplier: '',
        id: null,
        page: 1,
        lazyLoadActive: true
      }
    },
    methods: {
      goDetailPage (item) {
        let prizeDto = {}
        prizeDto.prizeImg = item.prizeImg
        prizeDto.supplierId = item.supplierId
        prizeDto.details = item.details
        prizeDto.price = item.price
        prizeDto.prizeName = item.prizeName
        console.log('goDetailPage入参:' + JSON.stringify(prizeDto))
        this.$router.push({
          name: 'detailpage',
          params: {data: prizeDto}
        })
      },
      goSentMsg (deliverInfo) {
        console.log('goSentMsg 入参:' + JSON.stringify(deliverInfo))
        this.$router.push({
          name: 'setMessage',
          params: {
            data: deliverInfo
          }
        })
      },
      takePrize (rid) {
        this.$router.push({
          path: '/setMessage',
          query: {
            saveRecordId: rid
          }
        })
      },
      initData () {
        this.$axios({
          method: 'get',
          url: this.url + '/prize/0/4'
        })
          .then((res) => {
            for (let i = 0; i < res.data.data.length; i++) {
              let p = res.data.data[i]
              let prize = {}
              prize.createTime = p.createTime
              prize.prizeName = p.prize.name
              prize.type = p.prize.type
              prize.status = p.status
              prize.details = p.prize.details
              prize.id = p.id
              prize.price = p.prize.price
              prize.supplierId = p.prize.supplierId
              prize.prizeImg = 'http://oss.tianaishijie.com/' + p.prize.imgName

              /***********************快递信息*******************/
              if ('deliverType' in p) {
                prize.deliverInfo = {}
                prize.deliverInfo.type = p.deliverType
                prize.deliverInfo.sentStatus = p.sentStatus
                if ('sentStatus' in prize.deliverInfo) {
                  if (prize.deliverInfo.type === 1) {
                    prize.deliverInfo.expressNumber = p.expressNumber
                    prize.deliverInfo.address = p.address
                    prize.deliverInfo.postcode = p.postcode
                  } else if (prize.deliverInfo.type === 2) {
                    prize.deliverInfo.supplierId = p.supplierId
                  }
                  prize.deliverInfo.mobileNumber = p.mobileNumber
                  prize.deliverInfo.receiverName = p.receiverName
                  prize.deliverInfo.babySex = p.babySex
                  prize.deliverInfo.babyAge = p.babyAge
                }
              }
              /***********************快递信息*******************/

              this.prizeData.push(prize)
              this.details = this.prizeData[i].details

              this.id = p.id
              this.sentStatus = p.sentStatus
              this.deliverType = p.deliverType
              this.name = p.receiverName
              this.mobileNumber = p.mobileNumber
              this.address = p.address
            }
          })
          .catch((err) => {
            if (err.response.status == 403 && err.response.data.errorCode == '2000') {
              window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx917c5ed5ceba6da4&redirect_uri=http://' + this.hostname + this.pathname + '&response_type=code&scope=snsapi_userinfo&state=70e8507652884ee3b8eb7769e0317d76201807112044#wechat_redirect',
                console.log(this.$cookies.get('USER_TOKEN'))
            }
          })
      },
      lazyLoadPage (el) {
        let scrollTop = this.$refs.prizeListWrapper.scrollTop
        let clientHeight = this.$refs.prizeListWrapper.clientHeight
        let scrollHeight = this.$refs.prizeListWrapper.scrollHeight
        if ((scrollHeight - 5) <= (scrollTop + clientHeight)) {
          if (this.lazyLoadActive) {
            let prePrizeDatasLength = this.prizeData.length
            this.$axios({
              method: 'get',
              url: this.url + '/prize/' + (++this.page) + '/4'
            })
              .then((res) => {
                console.log('page: ' + this.page + '  newDataLength:  ' + res.data.data.length)
                for (let i = 0; i < res.data.data.length; i++) {
                  let p = res.data.data[i]
                  let prize = {}
                  prize.createTime = p.createTime
                  prize.prizeName = p.prize.name
                  prize.type = p.prize.type
                  prize.status = p.status
                  prize.details = p.prize.details
                  prize.id = p.id
                  prize.price = p.prize.price
                  prize.supplierId = p.prize.supplierId
                  prize.prizeImg = 'http://oss.tianaishijie.com/' + p.prize.imgName

                  /***********************快递信息*******************/
                  if ('deliverType' in p) {
                    prize.deliverInfo = {}
                    prize.deliverInfo.type = p.deliverType
                    prize.deliverInfo.sentStatus = p.sentStatus
                    if ('sentStatus' in prize.deliverInfo) {
                      if (prize.deliverInfo.type === 1) {
                        prize.deliverInfo.expressNumber = p.expressNumber
                        prize.deliverInfo.address = p.address
                        prize.deliverInfo.postcode = p.postcode
                      } else if (prize.deliverInfo.type === 2) {
                        prize.deliverInfo.supplierId = p.supplierId
                      }
                      prize.deliverInfo.mobileNumber = p.mobileNumber
                      prize.deliverInfo.receiverName = p.receiverName
                      prize.deliverInfo.babySex = p.babySex
                      prize.deliverInfo.babyAge = p.babyAge
                    }
                  }
                  /***********************快递信息*******************/

                  this.prizeData.push(prize)
                  this.details = this.prizeData[i].details

                  this.id = p.id
                  this.sentStatus = p.sentStatus
                  this.deliverType = p.deliverType
                  this.name = p.receiverName
                  this.mobileNumber = p.mobileNumber
                  this.address = p.address
                }
                if (this.prizeData.length - prePrizeDatasLength < 4) {
                  console.log(this.prizeData.length, prePrizeDatasLength)
                  this.$refs.loadMoreText.innerHTML = '已经到底啦!'
                  this.lazyLoadActive = false
                }
              }).catch((err) => {
              console.log('分页信息加载异常: ' + err)
              this.$refs.loadMoreText.innerHTML = '网络异常!'
              this.page--
            })
          }
        }
      }
    },

    created () {
      this.hostname = window.location.hostname
      this.pathname = window.location.pathname
      this.initData()
    },
    mounted () {
      this.page = 1
    }
  }
</script>

<style scoped>

  #wrapper {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .baibaoxiangLogo {
    position: relative;
    width: 64%;
    display: flex;
    margin: 0 auto;
    z-index: 999;
  }

  .baibaoxiang {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 0;
  }

  .card {
    width: 92%;
    /* height:120px; */
    height: 18vh;
    background: white;
    border-radius: 10px;
    position: relative;
    box-shadow: 1px 4px 17px 0px rgba(50, 50, 50, .2);
    margin: 0 auto;
    margin-top: -40px;
  }

  .card:first-child {
    margin-top: -20px;
  }

  .left, .right {
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .left {
    position: absolute;
    left: 15px;
    font-size: 12px;
  }

  .right {
    position: absolute;
    right: 15px;
    font-size: 12px;
  }

  .prize-content {
    margin-top: 50px;
  }

  .button-wrapper {
    position: absolute;
    right: 15px;
    bottom: 10px;

  }

  button {
    width: 80px;
    height: 25px;
    line-height: 20px;
    border: 1px solid;
    border-radius: 45px;
    background: white;
    font-size: 12px;
  }

  .getTime, .status {
    color: rgb(184, 184, 184);
  }

  .detail {
    color: rgb(222, 98, 100);
  }

  .take {
    color: rgb(133, 204, 174);
  }

  .alreadyTake {
    color: rgb(175, 175, 175);
  }

  .prizeImg {
    width: 20vw;
    position: absolute;

    left: 15px;
    bottom: 1%;
    border-radius: 5px;
  }

  .prize-name {
    position: absolute;
    left: 31%;
    bottom: 50%;
    font-size: 12px;
  }

  #loadMore {
    position: relative;
    color: #666666;
    z-index: 999;
  }

  @media only screen and (min-width: 767px) {
    .card {
      height: 220px;
      margin-top: 30px;
    }

    .prizeImg {
      width: 20vw;
      position: absolute;
      top: 55px;
      left: 15px;
      bottom: 10px;
      border-radius: 5px;
    }

    .left, .right {
      margin-top: 15px;
    }

    .getTime, .status, .time {
      font-size: 23px;
    }

    button {
      width: 170px;
      height: 50px;
      font-size: 23px;
    }

    .prize-name {
      font-size: 30px;
      position: absolute;
      top: 53px;
      left: 220px;
    }

    .detail {
      margin-right: 10px;
    }
  }

  @media only screen and (min-width: 1023px) {
    .card {
      height: 280px;
      margin-top: 30px;
    }

    .prizeImg {
      width: 20vw;
      position: absolute;
      top: 65px;
      left: 15px;
      bottom: 10px;
      border-radius: 5px;
    }

    .left, .right {
      margin-top: 15px;
    }

    .getTime, .status, .time {
      font-size: 30px;
    }

    button {
      width: 200px;
      height: 60px;
      font-size: 30px;
    }

    .prize-name {
      font-size: 30px;
      position: absolute;
      top: 60px;
      left: 280px;
    }

    .detail {
      margin-right: 10px;
    }
  }

</style>
