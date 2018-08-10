<template>
  <div id="wrapper">
  
    <div class="logoWrapper">
  
      <img src="../assets/logo.png" class="logo" />
  
      <span>天</span>
  
      <span>爱</span>
  
      <span>视</span>
  
      <span>界</span>
  
      <span>—</span>

    </div>
  
    <div class="prize">
  
      <img :src="prize" />
  
    </div>

    <QRCode />
  </div>
</template>

<script>

import QRCode from "./qrCode" 

  export default {
  
    name: 'Subscribe',
  
    components: {
      QRCode,
    },
  
    data() {
  
      return {
        url:"http://bs.tianaishijie.com/userService",
        prizeUrl:"http://oss.tianaishijie.com/",
        prize:null,
        state:this.codeRegExp("state"),
      }
  
    },

    methods:{
         codeRegExp(key){
      var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)")
        var r = window.location.search.substr(1).match(reg)
        if(r!=null)
         return  unescape(r[2]); 
        return null
    },
      setPrize(){
          this.$axios({
            method:"get",
            url:this.url + "/draw/" + this.state,
          })
          .then((res)=>{ 
            this.prize = this.prizeUrl + res.data.data.imgName
            alert(this.prize)
          })
          .catch((err)=>{ alert(err) })
        }
    },
    created(){
      this.setPrize()
    }
  }
</script>

<style scoped>
  #wrapper {}
  
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

    font-size:14px;
  
  }
  
  
  
  .prize {
  
    width: 100%;
  
    
  
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
    width: 60%;

  
  }
</style>