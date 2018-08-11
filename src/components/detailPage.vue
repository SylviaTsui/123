<template>
  <div id="wrapper">
    <img :src="this.prizeDto.prizeImg" class="prizeImg">
    <div>
      <h3 class="prizeName">{{this.prizeDto.prizeName}}</h3>
      <div class="priceWrapper">
        <span class="lable">价值:</span>
        <span>{{this.prizeDto.price}}</span>
      </div>
    </div>

    <div class="supData" @click="goSupPage">
      <img src="../assets/arrow.png" class="arrow">
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
      </div>
    </div>
    <div class="detail">详情</div>
    <div v-html="prizeDto.details" class="details"></div>
    <div id="emptySpace"></div>
  </div>
</template>

<script>
  export default {
    name: 'DetailPage',
    data () {
      return {
        url: 'http://bs.tianaishijie.com/userService/',
        imgUrl: 'http://oss.tianaishijie.com/',
        prizeDto: {},
        supplier: {}
      }
    },
    methods: {
      goSupPage () {
        console.log("goSupPage 入参: "+JSON.stringify(this.supplier));
        this.$router.push({
          name: 'supplierPage',
          params: {data:this.supplier}
        });
      }
    },
    created () {
      this.prizeDto = this.$route.params.data;
      console.log("入参:"+JSON.stringify(this.prizeDto));
      this.$axios({
        method: 'get',
        url: this.url + '/supplier/' + this.prizeDto.supplierId
      })
        .then((res) => {
          this.supplier = res.data.data
          this.supplier.imgName = this.imgUrl + this.supplier.imgName
        })
        .catch((err) => {
          console.log('获取供应商信息错误: ' + err)
        })
    }
  }
</script>

<style scoped>
  #wrapper {
    margin: 0;
    padding: 0;
  }

  .prizeImg {
    width: 100vw;
  }

  .priceWrapper {
    text-align: left;
    margin-bottom: 20px;
    padding-left: 20px;
    font-size: 10px;
    color: red;
  }

  .lable {
    color: gray;
  }

  .address, .contact {
    color: gray;
  }

  .supImg {
    width: 20%;
    border-radius: 5px;
    position: absolute;
    left: 20px;
    /*margin-right: 5px;*/
  }

  .supData {
    height: 13vh;
    position: relative;
    border-top: 1px solid rgb(242, 242, 242);
    padding-top: 10px;
    padding-right: 50px;
  }

  .contentWrapper {
    font-size: 12px;
    width: 75vw;
    position: absolute;
    right: 0;
    text-align: left;
    padding-left: 20px;

  }

  .supName {
    display: block;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .prizeName {
    text-align: left;
    margin: 0;
    padding-left: 20px;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .supData {
    padding-left: 20px;
  }

  .detail {
    width: 100vw;
    height: 40px;
    background: rgb(242, 242, 242);
    color: gray;
    font-size: 14px;
    line-height: 40px;
    margin-bottom: 20px;
  }

  .details {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .details *{
    max-width: 100vw;
  }
  #emptySpace{
    height: 100px;
    width: 100%;
  }

  .arrow {
    width: 15px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
