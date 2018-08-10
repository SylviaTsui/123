<template>
  <div id="wrapper">
    <van-cell-group>
      <van-field v-model="Province" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="City" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="Region" />
    </van-cell-group>


<van-radio-group v-model="radio">
  <van-cell-group>
    <van-cell title="单选框 1" clickable @click="radio = '1'">
      <van-radio name="1" />
    </van-cell>
    <van-cell title="单选框 2" clickable @click="radio = '2'">
      <van-radio name="2" />
    </van-cell>
  </van-cell-group>
</van-radio-group>
  </div>
</template>

<script>


export default {
  data() {
    return {
      url:"http://bs.tianaishijie.com/userService",

      areaId:[],
      area:[],
      Province:"广东省",
      City:"广州市",
      Region:"海珠区",
      radio:"请选择区域"

    }
  },
  methods:{
    getProvince(){
      this.$axios({
      method:"get",
      url:this.url + "/area/parent/0"
    })
    .then((res)=>{

      alert(JSON.stringify(res))
    for(let i=0;i<res.data.data.length;i++){
       this.area.push(res.data.data[i].name)
       this.areaId.push(res.data.data[i].id)

      }
          this.$axios({
              method:"get",
              url:this.url + "/area/parent/" + this.areaId[1]
            })
            .then((res)=>{
              alert(JSON.stringify(res))
              for(let i=0;i<res.data.data.length;i++){
               this.area.push(res.data.data[i].name)
               this.areaId.push(res.data.data[i].id)

              }

                    this.$axios({
                      method:"get",
                      url:this.url + "/area/parent/" + this.areaId[2]
                    })
                    .then((res)=>{
                      alert(JSON.stringify(res))
                      for(let i=0;i<res.data.data.length;i++){
                        this.area.push(res.data.data[i].name)
                        this.areaId.push(res.data.data[i].id)

                        this.$axios({
                          method: 'get',
                          url: this.url + '/area/parent/' + this.areaId[3]
                        })
                          .then((res) => {
                            alert(JSON.stringify(res))
                             for(let i=0;i<res.data.data.length;i++){
                               this.area.push(res.data.data[i].name)
                               this.areaId.push(res.data.data[i].id)
                              }
                              alert("这是省ID——"+this.areaId)
                              alert("这是省名字——"+this.area)

                             //TODO




                     })
                    .catch((err)=>{
                      alert(err)
                    })
                       }
                     })
                    .catch((err)=>{
                      alert(err)
                    })
                    })
                    .catch((err)=>{
                      alert(err)
                    })
                    })
                    .catch((err)=>{
                      alert(err)
                    })

            .catch((err)=>{
              alert(err)
            })
    },
  },

  created(){

    // this.getProvince();
  }
}
</script>

<style scope>
.wrapper{

}



</style>
