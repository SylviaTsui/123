<template>
   <div id="wrapper">

<!-- 自提 -->
  <van-field
    v-model="genderSelf"
    placeholder="孩子性别（选填）"
    @click="selectSelf"
  />

 <van-field
    v-model="ageSelf"
    placeholder="孩子年龄（选填）"
    @click="selectAgeSelf"
  />

</van-cell-group>

<van-actionsheet v-model="show" :actions="getGender" />
<van-picker :columns="columns" @change="onChange" v-show='showAge'/>

</section>
  </div>
</template>

<script>
export default {
  name: 'childData',
  data () {
    return {
      show: false,
      showAge:false,
      genderSelf:null,
      ageSelf:null,
      showComfirmButton:false,
      hideComfirmButton:true,
      showExpress:true,
      showTakeBySelf:false,
      navArr:[
        {
          name:"快递（到付）"
        },
        {
          name:"自提"
        },

      ],
      getGender: [
        {
          name: '请选择孩子性别',
          callback:this.select

        },
        {
          name: '男',
          callback: this.onClick
        },
        {
          name: '女',
          callback: this.onClick
        },
      ],
      columns: ['0-2岁', '3-5岁', '6-12岁', '13岁以上']
    }
   },
   methods:{
    onClick(item) {
      this.genderSelf = item.name;
      this.show = false;
    },
    onChange(picker, value, index) {
      this.ageSelf = value;
      this.showAge = false;
    },
    fill(){
      if(this.nameSelf != "" && this.cellphoneSelf != "" && this.region != "" && this.spot != "" && this.addressSelf != ""){
         this.showComfirmButton = true;
         this.hideComfirmButton = false;
      }else{
        this.showComfirmButton = false;
         this.hideComfirmButton = true;
      }
    },
    selectTitle(item){
       if(item == 0){
         this.showExpress = true;
         this.showTakeBySelf = false;
       }else if(item == 1){
         this.showExpress = false;
         this.showTakeBySelf = true;
       }
    },
    selectSelf(item){
      this.genderSelf = item.name;
      this.show = true;
      if(this.show){
        this.showAge = false;
      }
    },
    selectAgeSelf(item){
      this.ageSelf = item.name;
      this.showAge = true;
      if(this.showAge){
        this.show = false;
      }
    }

   }
  }

</script>

<style scoped>
</style>