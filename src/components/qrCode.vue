<template>
   <div id="wrapper">
      <div class="frame">
        <div class="frameContent">
          <img class="qrCode-img" src="../assets/qrcode.jpg"  alt="qrcode.jpg" />
          <span class="qrCode-word">进入<span class="hightLine-word">【百宝箱】</span>领取奖品吧</span>
        </div>
        <img class="frame-img" src="../assets/frame.png"  alt="frame.png" />
      </div>
   </div>
</template>

<script>
 export default {
  name: 'QRCode',
  data () {
    return {


    }
  }
 }

</script>

<style scoped>
#wrapper{
    width:100%;
    position:absolute;
    top:80%;
    left:0;
    right:0;

}

.frame-img{
    width:92%;
}

.frame{
  position:relative;
}

.frameContent{
    width:100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.qrCode-img{
   width:18%;
}

.qrCode-word{
    display:inline-block;
    vertical-align:top;
    font-size:15px;
    margin-left:3%;
    height:70px;
    line-height:70px;
}

.hightLine-word{
    color:rgb(255,83,33);
    font-weight:bold;
}
/*屏幕大于指定尺寸改变字体大小*/
@media only screen and (min-width: 767px){
    .qrCode-word{
      font-size:30px;
      height:150px;
      line-height:150px;
 }
}

@media only screen and (min-width: 1023px){
    .qrCode-word{
      font-size:40px;
      height:200px;
      line-height:200px;
 }
}

</style>
