
<template>
   <div id="wrapper">
     <div class="left">
     <img class="user-pic" :src="headImgUrl"  alt="user.png" />
     <span class="user-name">{{userName}}</span>
     </div>
     <div class="right">
     <img class="flower" src="../assets/flower.png"  alt="flower.png" />
     <span class="x-symble">x</span>
     <span class="flower-number">{{flowerNumber}}</span>
     </div>
   </div>
</template>

<script>
import global from '../App'

 export default {
  name: 'userData',
  data () {
    return {
    userName:"用户名",
    flowerNumber:"4",
    url:"http://bs.tianaishijie.com/userService",
    headImgUrl:""
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
  },
  created(){

  }
 }
</script>


<style scoped>
#wrapper{
    width:100%;
    height:10vh;
    line-height:10vh;
}

.left,.right,.user-pic,.user-name,.flower,.x-symble,.flower-number{
    display:inline-block;
    vertical-align:middle;
}

.left{
  position:absolute;
  left:20px;
}

.right{
  position:absolute;
  right:20px;
}

.user-pic{
    width:12vw;
}

.flower{
    width:5vw;
}

/*屏幕大于指定尺寸改变字体大小*/
@media only screen and (min-width: 767px){
    #wrapper{
      font-size:25px;
      margin-top:10px;
 }

 .left{
  position:absolute;
  left:30px;
}

.right{
  position:absolute;
  right:30px;
}
}

@media only screen and (min-width: 1023px){
    #wrapper{
      font-size:35px;
      margin-top:13px;
 }

 .left{
  position:absolute;
  left:40px;
}

.right{
  position:absolute;
  right:40px;
}
}
</style>
