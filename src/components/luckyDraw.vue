<template>
  <div id="wrapper">
    <img id='bgimg' src="../assets/new.png"/>
    <div id="userwrapper" v-if="this.isSubscibe == 1">
      <div class="left">
        <img class="user-pic" :src="this.userInfo.headImgUrl" alt="user.png"/>
        <span class="user-name">{{this.userInfo.nickname}}</span>
        <!--<img class="user-pic" src='../assets/user.png'  alt="user.png" />-->
        <!--<span class="user-name">用户名</span>-->
      </div>
      <div class="right">
        <img class="flower" src="../assets/flower.png" alt="flower.png"/>
        <span class="x-symble">x</span>
        <!--<span class="flower-number">x</span>-->
        <span class="flower-number">{{this.userInfo.flower}}</span>
      </div>
    </div>

    <div class="footer" v-if="this.isSubscibe == 1">
      <span @click="feedback">意见反馈</span>
      <span>|</span>
      <span @click="rule">活动规则</span>
      <span>|</span>
      <span @click="flowerUsage">小红花用途</span>
    </div>


    <div v-show="showPage">
      <div class="nativePrize">
        <img :src="imgUrl + prize.imgName" v-if="this.prize.type != 3"/>
      </div>
      <div class="couponPrize">
        <div id="couponBox" v-if="this.prize.type == 3">
          <img :src="imgUrl + prize.imgName" id="couponImg"/>
          <div id="couponBoxTextArea">
            <h3 id="supplierName">{{ this.prize.supplier.name}}</h3>
            <h5 id="prizeName">{{ this.prize.name}}</h5>
          </div>
          <img :src="imgUrl + prize.couponTemplateImgUri" id="couponTemplateImg"/>
        </div>
      </div>

      <div class="buttonWrapper" v-if='this.isSubscibe == 1'>
        <button class="detailS" v-if="this.prize.type == 2" @click="goDetail">查看详情</button>
        <button class="getPrize" v-if="this.prize.type == 2" @click="goPrize">领取</button>
        <button class="myPrize" v-if="this.prize.type == 2 || this.prize.type == 3" @click="goPrizeList">我的奖品</button>
        <button class="detailL" v-if="this.prize.type >= 3" @click="goDetail">查看详情</button>
      </div>

      <QRCode class="qrCode" v-if="this.isSubscibe == 0"/>


    </div>
    <van-actionsheet v-model="showFeedBack" :actions="actionFeedBack">
      <div>
      <textarea rows="8" cols="45" placeholder="请留下您的宝贵意见和建议，我们将努力改进~" v-model="comment" class="textInput one">
      </textarea>
        <textarea rows="3" cols="45" placeholder="请留下您的邮箱或者微信号，以使我们回复你~" v-model="contact" class="textInput twi">
      </textarea>
        <van-button type="default" plain size="large" v-if='this.contact == "" || this.comment == "" '>提交</van-button>
        <van-button type="primary" size="large" v-if='this.contact != "" && this.comment != "" ' @click="sendComment">
          提交
        </van-button>
      </div>
    </van-actionsheet>
    <van-actionsheet v-model="showRule" :actions="actionRule" class="rule">
      <p>全城找“爱”互娱触码活动规则：</p>
      <p> 1.每个微信每天有一次抽奖机会。</p>
      <p> 2.参与者可百分百中奖，奖品包括优质实物产品、精选体验服务及电子奖品三类。</p>
      <p> 3.获奖用户可进入官微“百宝箱”查阅奖品信息和领取奖品。</p>
      <p> 4.广州浚雷智能科技有限公司拥有活动的最终解释权。</p>
    </van-actionsheet>
    <van-actionsheet v-model="showFlowerUsage" :actions="actionFlower" class="flowerRule">
      <p>小红花可以兑换实物、优惠券、抽奖次数等。</p>
      <p>（程序猿小哥哥正在紧张的开发ing）</p>
    </van-actionsheet>
    <div id="smileFace" v-show="showSmileFace">
      <img src="../assets/smile.png" class="smile">
      <div class="buttonWrapper">
        <button @click="goPrizeList" v-if="this.isSubscibe == 1">我的奖品</button>
        <QRCode class="qrCode" v-if="this.isSubscibe == 0"/>
      </div>
    </div>

  </div>
</template>

<script>
  import QRCode from './qrCode'

  export default {
    name: 'LuckyDraw',
    components: {
      QRCode,
    },
    data () {

      return {
        showPrize: true,
        showCoupon: false,
        url: 'http://bs.tianaishijie.com/userService',
        imgUrl: 'http://oss.tianaishijie.com/',
        isSubscibe: null,
        id: null,
        prizeName: '',
        prizePrice: null,
        PrizeImg: null,
        supName: '',
        supImg: null,
        adress: '',
        tel: null,
        mobile: null,
        detail: null,
        showRule: false,
        showFlowerUsage: false,
        showFeedBack: false,
        comment: '',
        contact: '',
        userInfo: this.$parent.getUserInfo(),
        recordId: null,
        supQRCode: null,
        showPage: true,
        showSmileFace: false,
        prize: {},
        actionRule: [
          {
            name: '活动规则',
          }
        ],
        actionFlower: [
          {
            name: '什么是小红花',
          }
        ],
        actionFeedBack: [
          {
            name: '意见反馈',
          }
        ]
      }
    },

    methods: {
      goPrizeList () {
        this.$router.push({
          path: '/prizeList'
        })
      },
      goBaiBaoXiang () {
        this.$router.push({
          path: '/prizeList',
        })
      },
      goPrize () {
        this.$router.push({
          path: '/setMessage',
          query: {
            saveRecordId: this.prize.recordId
          }
        })
      },

      sendComment () {
        console.log(this.comment)
        console.log(this.contact)
        this.$axios({
          url: this.url + '/feedback',
          method: 'post',
          data: {
            'feedback': this.comment,
            'contact': this.contact
          }
        })
          .then((res) => {
            console.log(res)
            this.comment = ''
            this.contact = ''
            this.$toast('提交成功')
            this.showFeedBack = false
          })
          .catch((err) => {
            console.log(err)
          })
      },
      feedback () {
        this.showFeedBack = true
      },
      rule () {
        this.showRule = true
      },
      flowerUsage () {
        this.showFlowerUsage = true
      },

      goDetail () {
        let prizeDto = {}
        prizeDto.prizeImg = this.imgUrl + this.prize.imgName
        prizeDto.supplierId = this.prize.supplier.id
        prizeDto.details = this.prize.details
        prizeDto.price = this.prize.price
        prizeDto.prizeName = this.prize.prizeName
        console.log('goDetail 入参:' + JSON.stringify(prizeDto))
        this.$router.push({
          name: 'detailpage',
          params: {data: prizeDto}
        })
      },
      getPrize (areaId) {
        this.$axios({
          method: 'get',
          url: this.url + '/draw/' + areaId,
        })
          .then((res) => {
            this.prize = res.data.data
            console.log('this.recordId----' + prize.recordId)
          })
          .catch((err) => {
            if (err.response.status == 403) {
              this.showSmileFace = true
              this.showPage = false
              this.$toast('您今天已抽奖')
            }
          })
      }
    },
    async created () {
      let params = this.$parent.getParams()
      let areaid = params.areaId
      // alert(areaid)
      this.getPrize(areaid)
      this.isSubscibe = await this.$parent.subscibe()
      console.log(JSON.stringify(this.userInfo))
    }
  }
</script>

<style scoped>
  .one {
    margin-bottom: 10px;
  }

  .rule, .flowerRule {
    text-align: left;
    font-size: 14px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .flowerRule {
    text-align: center;
    font-size: 14px;
    padding-right: 10px;
    padding-left: 10px;
  }

  .textInput {
    display: block;
    margin: 0 auto;
    background: rgb(242, 242, 242);
    border: none;
    width: 95%;
    margin-bottom: 10px;
  }

  #userwrapper {
    width: 100vw;
    height: 60px;
    line-height: 60px;
    position: absolute;
    top: 0;
    z-index: 999;
    background: white;
    display: flex;
    justify-content: center;
  }

  .left, .right {
    width: 100vw;
    height: 60px;
    line-height: 60px;
    display: inline-block;
  }

  .left {
    text-align: left;
    padding-left: 20px;
  }

  .right {
    text-align: right;
    padding-right: 20px;
  }

  .user-pic, .user-name, .flower-number, .x-symble, .flower {
    display: inline-block;
    vertical-align: middle;
  }

  .user-pic {
    width: 11vw;
    border-radius: 50%;

  }

  .flower {
    width: 5vw;
  }

  .buttonWrapper {
    width: 100%;
    position: fixed;
    top: 77%;
  }

  .buttonWrapper button {
    color: white;
    font-weight: bold;
    margin-top: 10px;
  }

  .detailS, .getPrize {
    width: 34.5vw;
    height: 5vh;
    line-height: 5vh;
    border-radius: 45px;
    border: none;
    background: linear-gradient(rgb(254, 168, 111), rgb(244, 91, 67));
  }

  #smileFace button {
    width: 60vw;
    height: 6vh;
    line-height: 5vh;
    border-radius: 45px;
    border: none;
    background: linear-gradient(rgb(254, 168, 111), rgb(244, 91, 67));
  }

  .myPrize, .detailL {
    width: 70vw;
    height: 5vh;
    line-height: 5vh;
    display: block;
    border-radius: 45px;
    border: none;
    background: linear-gradient(rgb(254, 168, 111), rgb(244, 91, 67));
    margin: 0 auto;
    vertical-align: middle;
  }

  .logoWrapper span {

    color: white;

    font-size: 14px;

  }

  .couponPrize {

    width: 90%;

    height: 70%;

    position: absolute;

    left: 50%;

    top: 45%;

    transform: translate(-50%, -50%);

    display: flex;

    justify-content: space-between;

  }

  .nativePrize {

    width: 90%;

    height: 70%;

    position: absolute;

    left: 50%;

    top: 45%;

    transform: translate(-50%, -50%);

    display: flex;

    justify-content: center;

    align-items: center;


  }

  .nativePrize img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    z-index: 999;
    animation: myfirst 1s;
    -webkit-animation: myfirst 1s; /* Safari 与 Chrome */
  }

  .smile {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -30%);
  }

  #couponBoxTextArea {
    position: absolute;
    left: 30%;
    top: 21%;
    width: 45%;
    margin: 0;
  }

  #couponBoxTextArea * {
    margin: 0;
  }

  #couponBoxTextArea #prizeName {
    color: #d31d2c;
  }

  #couponImg {
    position: absolute;
    left: 11%;
    top: 15%;
    width: 18%;
    border-radius: 50%;
    border: 3px outset #f56448;
    margin: 0;
  }

  #couponTemplateImg {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120%;
    transform: translate(-54%, -50%);
    z-index: -1;
  }

  #couponBox {
    position: absolute;
    width: 98%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  #bgimg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 0;
  }

  .footer {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 98%;
    transform: translate(-50%, -98%);
    font-size: 12px;
  }

  @keyframes myfirst {
    0% {
      width: 10%;
      transform: translate(0, -60%);
    }
    45% {
      width: 30%;
      transform: translate(0, 0);
    }
    65% {
      width: 50%;
      transform: translate(0, -70%);
    }
    75% {
      width: 50%;
      transform: translate(0, -40%);
    }
    90% {
      width: 70%;
      transform: translate(0, -60%);
    }
    100% {
      width: 100%;
      transform: translate(0, 0);
    }
  }

  @-webkit-keyframes myfirst /* Safari 与 Chrome */
  {
    0% {
      width: 10%;
      transform: translate(0, -60%);
    }
    45% {
      width: 30%;
      transform: translate(0, 0);
    }
    65% {
      width: 50%;
      transform: translate(0, -70%);
    }
    75% {
      width: 50%;
      transform: translate(0, -40%);
    }
    90% {
      width: 70%;
      transform: translate(0, -60%);
    }
    100% {
      width: 100%;
      transform: translate(0, 0);
    }
  }

  /*!*屏幕大于指定尺寸改变字体大小*!*/
  /*@media only screen and (min-width: 767px){*/
  /*#wrapper{*/
  /*font-size:25px;*/
  /*margin-top:10px;*/
  /*}*/

  /*.left{*/
  /*position:absolute;*/
  /*left:30px;*/
  /*}*/

  /*.right{*/
  /*position:absolute;*/
  /*right:30px;*/
  /*}*/
  /*}*/

  /*@media only screen and (min-width: 1023px){*/
  /*#wrapper{*/
  /*font-size:35px;*/
  /*margin-top:13px;*/
  /*}*/

  /*.left{*/
  /*position:absolute;*/
  /*left:40px;*/
  /*}*/

  /*.right{*/
  /*position:absolute;*/
  /*right:40px;*/
  /*}*/
  /*}*/
</style>
