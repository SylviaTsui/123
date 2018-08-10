<template>
  <div id="wrapper">

    <img :src="this.goPrizeImg" class="prizeImg">
    <img src="../assets/prize/handWashing.png" class="prizeImg">
    <div>
       <h3 class="prizeName">{{this.goPrizeName}}</h3>
      <h3>礼品名</h3>
       <span>价格：</span>
       <span>{{this.goPrizePrice}}</span>
      <span>100</span>
    </div>
    <div class="supData">
      <div>
       <img :src="this.goSupImg" class="supImg">
       <img src="../assets/prize/one.png" class="supImg">
      </div>
      <div class="contentWrapper">
         <span>{{this.goSupName}}</span>
         <span class="supName">供应商名称</span>
         <span>地址</span>
         <span>{{this.goSupAddress}}</span>
         <span>什么街道什么路</span>
         <span>联系电话</span>
         <span>{{this.goSupTel}}</span>
         <span>{{this.goSupMobile}}</span>
         <span>253416515</span>
         <span>253412651521</span>
      </div>
    </div>
    <div v-html="goSupDetail"></div>
  </div>
</template>

<script>
  export default {
  name: 'DetailPage',
  data () {
    return {
        url:"http://bs.tianaishijie.com/userService",
        test:null,
        // supplierName:this.$route.params.supplierName,
        // price:this.$route.params.price,
        // img:this.$route.params.img,
        // prizeName:this.$route.params.prizeName

      // prizeName:this.$route.params.prizeName,
        // prizePrice:this.$route.params.prizePrice,
        // PrizeImg:this.$route.params.PrizeImg,
        // supName :this.$route.params.supName,
        // supImg :this.$route.params.supImg,
        // adress :this.$route.params.adress,
        // tel :this.$route.params.tel,
        // mobile :this.$route.params.mobile,
        // detail :this.$route.params.detail,



      goPrizeName:this.$route.params.goPrizeName,
      goPrizePrice:this.$route.params.goPrizePrice,
      goPrizeImg:this.$route.params.goPrizeImg,
      goSupName:this.$route.params.goSupName,
      goSupImg:this.$route.params.goSupImg,
      goSupAddress: this.$route.params.goSupAddress,
      goSupTel:this.$route.params.goSupTel,
      goSupMobile:this.$route.params.goSupMobile,
      goSupDetail:this.$route.params.goSupDetail,
     }
  },
  methods:{

   },
   mounted(){
      console.log(this.$route.params)
   }
  }
</script>

<style scoped>
  #wrapper{
    margin:0;
    padding:0;
  }
.prizeImg{
  width:100vw;
}

  .supImg{
    width:20%;
    border-radius:5px;
    position:absolute;
    left:0;
  }

  .supData{
    border:1px solid;
    height:15vh;
  }
.contentWrapper{
  width:80vw;
  position:absolute;
  right:0;
  text-align: left;
}
  .supName{

  }
  .prizeName{

  }
</style>
