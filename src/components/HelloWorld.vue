<template>
  <div class="hello">
    <h7>{{ msg }}</h7>
    <h7>{{subscribe}}</h7>
    <button @click="test">发送code</button>
    <button @click="subscribt">获取用户信息</button>
    <button @click="luckyDraw">抽奖</button>
    <button @click="prize">奖品列表</button>
    <button @click="address">获取地址</button>
    <button @click="feedback">反馈</button>
    <button @click="parentId">父区域</button>
    <button @click="areaId">区域ID</button>
    <button @click="supplierId">供应商ID</button>
    <button @click="xunhuan">测试for循环</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      url:"http://bs.tianaishijie.com",
      subscribe:"subcribe"

    }
  },
  methods:{
    xunhuan(){
      var i = 0
      for(i=0;i<5;i++){
             alert(i)
      }
    },
    test2(name){
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
        var r = window.location.search.substr(1).match(reg)
        if(r!=null)return  unescape(r[2]); return null
    },

    test(){
      var name = this.test2("code")
      this.$axios.get(this.url+"/userService/user/getUserInfoByCode",{
        params:{
          code:name
        }
      })
      .then((res)=>{
        console.log(res);
        this.msg = res;
        alert(res.data.data.userInfo.flower)
        this.$cookies.set('USER_TOKEN',res.data.data.token,null,'/','tianaishijie.com');
        console.log(this.$cookies.get("USER_TOKEN"))
      })
      .catch((error)=>{
        console.log(error.response.status)
       })
    },
    subscribt(){
      console.log(this.$cookies.get("USER_TOKEN"))
    this.$axios({
      method:"get",
      url:this.url+"/userService/user/getUserInfo"
    })
    .then((res)=>{
      this.subscribe ="这里是一个subscribe___" + res.data.data.subscribe
      console.log(res)
      alert(JSON.stringify(res))
      alert(this.subscribe)
    })
    .catch((err)=>{
       console.log(err)
       this.subscribe = err
    })
   },
   luckyDraw(){
     var state = this.test2("state")
     this.$axios({
       method:"get",
       url:this.url + "/userService/draw/" + state
     })
     .then((res)=>{
       alert(JSON.stringify(res.data))
     })
     .catch((err)=>{
       alert(err)
     })
   },
   prize(){
      this.$axios({
        method:"get",
        url:this.url + "/userService/prize/00/1",
      })
      .then((res)=>{
        alert(JSON.stringify(res.data))
      })
      .catch((err)=>{
        alert(err)
      })
   },
   address(){
      this.$axios({
        method:"get",
        url:this.url + "/userService/address"
      })
      .then((res)=>{
         alert(JSON.stringify(res.data))
      })
      .catch((err)=>{
        alert(err)
      })
   },
   feedback(){
     this.$axios({
       method:"post",
       url:this.url + "/userService/feedback",
       data:{
         "contact":"123456",
         "feedback":"content"
       }
     })
     .then((res)=>{
       alert(JSON.stringify(res.data))
     })
     .catch((err)=>{
       alert(err)
     })
   },
   parentId(){
     this.$axios({
       method:"get",
       url:this.url + "/userService/area/parent/6b6b747aa96544e2877a5c7206915fb6201807112047"
     })
     .then((res)=>{
       alert(JSON.stringify(res.data))
     })
     .catch((err)=>{
       alert(err)
     })
   },
   areaId(){
     this.$axios({
       method:"get",
       url:this.url + "/userService/supplier/area/a2d51a5da4a94285bf69bcd44fd2be5d201807260838"
     })
     .then((res)=>{
       alert(JSON.stringify(res.data))
     })
     .catch((err)=>{
       alert(err)
     })
   },
   supplierId(){
     this.$axios({
       method:"get",
       url:this.url + "/userService/supplier/f20db2fe7ab14e67a3918af82ebe0ef5201807260851"
     })
     .then((res)=>{
       alert(JSON.stringify(res.data))
     })
     .catch((err)=>{
       alert(err)
     })
   }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
