<template>
  <div id="wrapper">

    <img :src="this.goPrizeImg" class="prizeImg">
    <div>
      <h3 class="prizeName">{{this.goPrizeName}}</h3>
    </div>
    <div class="supData" @click="goSupPage">
      <div>
        <img :src="this.supplier.imgName" class="supImg">
      </div>
      <div class="contentWrapper">
        <span class="supName">{{this.supplier.name}}</span>
        <div class="contactWrapper">
          <span class="address">地址:</span>
          <span>{{this.supplier.address}}</span>
        </div>
        <div class="contactWrapper">
          <span class="contact">联系电话:</span>
          <span>{{this.supplier.telephone}}</span>
          <span>{{this.supplier.mobilePhone}}</span>
        </div>
        <img :src="this.supplier.qrcode" class="qrCode">
      </div>
    </div>
    <div class="detail">详情</div>
    <div v-html="this.supplier.description" class="detailImg"></div>
  </div>
</template>

<script>
  export default {
    name:"SupplierPage",
    data(){
      return{
        supplier:{}
      }
    },
    methods:{

    },
    created(){
        this.supplier= this.$route.params.data;
        this.supplier.qrcode= "http://oss.tianaishijie.com/"+this.supplier.qrcode;
    }
  }

</script>

<style scoped>
  #wrapper{
    margin:0;
    padding:0;
  }

  .address,.contact{
    color:gray;
  }
  .supImg{
    width:100%;
  }
  .contactWrapper{
    width:60%;
  }
  .contentWrapper{
    font-size:12px;
    text-align: left;
  }
  .supName{
    display:block;
    font-weight:bold;
    font-size:14px;
    margin-bottom: 5px;
  }
  .prizeName{
    text-align: left;
    margin:0;
    padding-left: 20px;
    font-size:16px;
    margin-bottom: 5px;
  }

  .detail{
    width:100vw;
    height:40px;
    background:rgb(242,242,242);
    color:gray;
    font-size:14px;
    line-height:40px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .detailImg{
    width:100%;
  }
  .detailImg  *{
    max-width:100%;
  }

  .qrCode{
    width:20%;
    /*float: right;*/
  }


</style>
