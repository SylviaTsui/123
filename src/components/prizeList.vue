<template>
   <div id="wrapper">
        <div class="card" v-for="item in prizeData">
            <div class="left">
                <span class="getTime">获奖时间:</span>
                <span class="time">{{item.createTime}}</span>
            </div>
             <div class="right">
                <button class="status" v-if="item.type >= 4" >已入账</button>
                <button class="status" v-if="item.type == 2 && item.status == 1" >领取信息</button>
                <button class="status" v-if="item.type == 2 && item.status == 0" @click="takePrize(item.id)">领取</button>
                <button class="status" v-if="item.type == 3 && item.status == 1" >已使用</button>
                <button class="status" v-if="item.type == 3 && item.status == 0" >未使用</button>
             </div>
            <div class="prize-content">
                <img class="prizeImg" :src="item.prizeImg"  />
                <span class="prize-name">{{item.prizeName}}</span>
            </div>
            <div class="button-wrapper"  v-if="item.type == 2 && item.status == 0">
              <router-link :to="{name:'detailpage',params:{key:item.details}}"><button class="detail">奖品详情</button></router-link>
              <button class="take">领取信息</button>
            </div>
            <div class="button-wrapper"  v-if="item.type == 2 && item.status == 1">
               <router-link :to="{name:'detailpage',params:{key:item.details}}"><button class="detail">奖品详情</button></router-link>
               <button class="take">领取</button>
            </div>
            <div class="button-wrapper"  v-if="item.type == 3 && item.status == 0">
               <router-link :to="{name:'detailpage',params:{key:item.details}}"><button class="detail">优惠券详情</button></router-link>
               <button class="alreadyTake">使用</button>
            </div>
            <div class="button-wrapper"  v-if="item.type == 3 && item.status == 1">
               <router-link :to="{name:'detailpage',params:{key:item.details}}"><button class="detail">优惠券详情</button></router-link>
               <button class="take">使用</button>
            </div>
    </div>
   </div>
</template>

<script>
  export default {
  name: 'PrizeList',
  data () {
    return {
      prizeData:[],
      details:null,
      hostname:null,
      pathname:null,
      url:"http://bs.tianaishijie.com/userService",
      prizeNum:null,
      prizeId:null
    }
   },
   methods:{
       takePrize(rid){
        //    for(let i=0;i<this.prizeData.length;i++){
        //        let prizeId = this.prizeData[i].id;
        //    }
           this.$router.push({
               path:"/setMessage",
               query:{
                 id:rid

               }
           })
       },
       getData(){
         this.$axios({
         method:"get",
         url:this.url + "/prize/0/0"
       })
        .then((res)=>{
            this.prizeNum = res.data.data.length;
            for(let i=0;i<this.prizeNum;i++){
                let prize = {
                            //  "createTime":null,
                            //  "prizeImg":null,
                            //  "prizeName":null,
                            //  "type":null,
                            //  "status":null,
                            //  "details":null,
                            //  "prizeId":null
                            };
                prize.createTime= res.data.data[i].createTime;
                prize.prizeName= res.data.data[i].prize.name;
                prize.type = res.data.data[i].prize.type;
                prize.status = res.data.data[i].status;
                prize.details = res.data.data[i].prize.details;
                prize.id = res.data.data[i].id;
                prize.prizeImg = "http://oss.tianaishijie.com" + res.data.data[i].prize.imgName;
                this.prizeData.push(prize)
                this.details = this.prizeData[i].details;

            }
       })
        .catch((err)=>{
         if(err.response.status == 403 && err.response.data.errorCode == "2000"){
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx917c5ed5ceba6da4&redirect_uri=http://"+this.hostname+this.pathname+"&response_type=code&scope=snsapi_userinfo&state=70e8507652884ee3b8eb7769e0317d76201807112044#wechat_redirect",
            console.log(this.$cookies.get("USER_TOKEN"))
         }
       })
      }
    },

    created(){
       this.hostname = window.location.hostname;
       this.pathname = window.location.pathname;
       this.getData();
    }
   }
</script>

<style scoped>
#wrapper{

}

.card{
    width:92%;
    /* height:120px; */
    height:18vh;
    background:white;
    border-radius:10px;
    position:relative;
    box-shadow:1px 4px 17px 0px rgba(50, 50, 50, .2);
    margin:0 auto;
    margin-top:10px;
    margin-bottom:10px;
}

.left,.right{
    display:inline-block;
    margin-top:10px;
    margin-bottom:10px;
}

.left{
    position:absolute;
    left:15px;
}

.right{
    position:absolute;
    right:15px;
}

.prize-content{
    margin-top:50px;
}

.button-wrapper{
    position:absolute;
    right:15px;
    bottom:10px;

}


button{
    width:80px;
    height:25px;
    line-height:20px;
    border:1px solid;
    border-radius:45px;
    background:white;
    font-size:12px;
}

.getTime,.status{
    color:rgb(184,184,184);
}

.detail{
    color:rgb(222,98,100);
}

.take{
   color:rgb(133,204,174);
}

.alreadyTake{
    color:rgb(175,175,175);
}



.prizeImg{
    width:20vw;
    position:absolute;

    left:15px;
    bottom:1%;
    border-radius:5px;
}

.prize-name{
   position:absolute;
   left:31%;
   bottom:50%;
}

@media only screen and (min-width: 767px){
   .card{
       height:220px;
       margin-top:30px;
   }

   .prizeImg{
       width:20vw;
       position:absolute;
       top:55px;
       left:15px;
       bottom:10px;
       border-radius:5px;
   }

   .left,.right{
       margin-top:15px;
   }

   .getTime,.status,.time{
    font-size:23px;
}
   button{
       width:170px;
       height:50px;
       font-size:23px;
   }

   .prize-name{
       font-size:30px;
       position:absolute;
       top:53px;
       left:220px;
   }

   .detail{
       margin-right:10px;
   }
}

@media only screen and (min-width: 1023px){
    .card{
       height:280px;
       margin-top:30px;
   }

   .prizeImg{
       width:20vw;
       position:absolute;
       top:65px;
       left:15px;
       bottom:10px;
       border-radius:5px;
   }

   .left,.right{
       margin-top:15px;
   }

   .getTime,.status,.time{
    font-size:30px;
}
   button{
       width:200px;
       height:60px;
       font-size:30px;
   }

   .prize-name{
       font-size:30px;
       position:absolute;
       top:60px;
       left:280px;
   }

   .detail{
       margin-right:10px;
   }
}

</style>
