<template>
  <div>
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

    <img id='bgimg' src="../assets/new.png"/>


    <div class="prize">

      <img :src="prize"/>

    </div>

    <div class="buttonWrapper" v-if='this.isSubscibe == 1'>
      <button class="detailS" v-if="this.type == 2" @click="goDetail">查看详情</button>
      <button class="getPrize" v-if="this.type == 2" @click="goPrize">领取</button>
      <button class="myPrize" v-if="this.type == 2 || this.type == 3" @click="goBaiBaoXiang">我的奖品</button>
      <button class="detailL" v-if="this.type >= 3" @click="goDetail">查看详情</button>
    </div>

    <QRCode v-if="this.isSubscibe == 0"/>
    <div class="footer" v-if="this.isSubscibe == 1">
      <span @click="feedback">意见反馈</span>
      <span>|</span>
      <span @click="rule">活动规则</span>
      <span>|</span>
      <span @click="flowerUsage">小红花用途</span>
    </div>
    <van-actionsheet v-model="showFeedBack" :actions="actionFeedBack">

      <div>

      <textarea rows="8" cols="45" placeholder="请留下您的宝贵意见和建议，我们将努力改进~" v-model="comment">

      </textarea>
        <textarea rows="3" cols="45" placeholder="请留下您的邮箱或者微信号，以使我们回复你~" v-model="contact">

      </textarea>
        <van-button type="default" plain size="large" v-if='this.contact == "" || this.comment == "" '>提交</van-button>
        <van-button type="primary" size="large" v-if='this.contact != "" && this.comment != "" ' @click="sendComment">
          提交
        </van-button>
      </div>
    </van-actionsheet>
    <van-actionsheet v-model="showRule" :actions="actionRule">
      <p>这是活动规则这是活动规则这是活动规则这是活动规则这是活动规
        则这是活动规则这是活动规则这是活动规则这是活动规则这是活动规则
        这是活动规则这是活动规则这是活动规则这是活动规则这是活动规则这
        是活动规则这是活动规则这是活动规则这是活动规则这是活动规则这是活动规则</p>
    </van-actionsheet>
    <van-actionsheet v-model="showFlowerUsage" :actions="actionFlower">
      <p>什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花
        什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花
        什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花
        什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花
        什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花什么是小红花</p>
    </van-actionsheet>

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
        url: 'http://bs.tianaishijie.com/userService',
        prizeUrl: 'http://oss.tianaishijie.com/',
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

      goBaiBaoXiang () {
        this.$router.push({
          path: '/prizeList',
        })
      },
      goPrize () {
        this.$router.push({
          path: '/setMessage',
          query:{
            saveRecordId: this.recordId
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
        // console.log("godetail")
        let str = {
          id: this.id,
          supplierName: this.supplierName,
          price: this.price,
          img: this.prize,
          prizeName: this.prizeName,

          goPrizeName: this.goPrizeName,
          goPrizePrice: this.goPrizePrice,
          goPrizeImg: this.goPrizeImg,
          goSupName: this.goSupName,
          goSupImg: this.goSupImg,
          goSupAddress: this.goSupAddress,
          goSupTel: this.goSupTel,
          goSupMobile: this.goSupMobile,
          goSupDetail: this.goSupDetail,
          saveRecordId: this.recordId
        }
        console.log(str)
        this.$router.push({
          name: 'detailpage',
          params: str
        })
      },
      getPrize (areaId) {
        this.$axios({
          method: 'get',
          url: this.url + '/draw/' + areaId,
        })
          .then((res) => {
            this.prize = this.prizeUrl + res.data.data.imgName
            this.type = res.data.data.type
            this.id = res.data.data.id
            this.supplierName = res.data.data.supplierName
            console.log('request suppliername__' + res.data.data.supplierName)
            this.price = res.data.data.price
            this.prizeName = res.data.data.name

            this.goPrizeName = res.data.data.name
            this.goPrizePrice = res.data.data.price
            this.goPrizeImg = this.prizeUrl + res.data.data.imgName
            this.goSupName = res.data.data.supplier.name
            this.goSupImg = this.prizeUrl + res.data.data.supplier.imgName
            this.goSupAddress = res.data.data.supplier.address
            this.goSupTel = res.data.data.supplier.telephone
            this.goSupMobile = res.data.data.supplier.mobilePhone
            this.goSupDetail = res.data.data.details
            this.recordId = res.data.data.recordId
            console.log("this.recordId----"+this.recordId)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    async created () {
      let params = this.$parent.getParams()
      let areaid = params.areaId
      alert(areaid)
      this.getPrize(areaid)
      this.isSubscibe = await this.$parent.subscibe()
      console.log(JSON.stringify(this.userInfo))
    }
  }
</script>

<style scoped>
  #userwrapper {
    width: 100vw;
    height: 75px;
    line-height: 75px;
    position: absolute;
    top: 0;
    z-index: 10;
    background: white;
    display: flex;
    justify-content: center;
  }

  .left, .right {
    width: 100vw;
    height: 75px;
    line-height: 75px;
    display: inline-block;
  }

  .user-pic, .user-name, .flower-number, .x-symble, .flower {
    display: inline-block;
    vertical-align: middle;
  }

  .flower-number, .x-symble, .flower {

  }

  .user-pic {
    width: 11vw;
    border-radius: 50%;
  }

  .flower {
    width: 5vw;
  }

  .button {
    position: absolute;
    z-index: 999;
  }

  textarea {
    display: block;
    margin: 0 auto;
    background: rgb(242, 242, 242);
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

  .logo {

    width: 9vw;

    vertical-align: middle;

  }

  .logoWrapper {

    position: fixed;

    top: 10px;

    left: 10px;

  }

  .logoWrapper span {

    color: white;

    font-size: 14px;

  }

  .prize {

    width: 60%;

    height: 70%;

    position: absolute;

    left: 50%;

    top: 45%;

    transform: translate(-50%, -50%);

    display: flex;

    justify-content: center;

    align-items: center;

  }

  .prize img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    z-index: 999;

  }

  #bgimg {
    position: absolute;
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
