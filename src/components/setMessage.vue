<template>
  <div id="wrapper">

    <van-nav-bar title="领取信息"/>


    <van-tabs v-model="active" @click="selectTitle">

      <van-tab v-for="index in navArr" :title="index.name"></van-tab>


    </van-tabs>


    <!-- 快递 -->

    <section id="express" v-show="showExpress">

      <van-cell-group>

        <van-field v-model="username" placeholder="用户名" />


        <van-field v-model="cellphone" placeholder="手机号码" />

        <van-field v-model="postCode" placeholder="邮编地址" />

        <van-field v-model="address" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"/>


        <van-field v-model="gender" placeholder="孩子性别（选填）" @click="select"/>


        <van-field v-model="age" placeholder="孩子年龄（选填）" @click="selectAge"/>


      </van-cell-group>


      <van-actionsheet v-model="show" :actions="getGender"/>

      <van-picker :columns="columns" @change="onChange" v-show='showAge'/>


      <!--<van-button type="primary" size="large" disabled v-show="hideComfirmButton">确认</van-button>-->

      <van-button type="primary" size="large"  @click="express">确认</van-button>

    </section>


    <section id="takeBySelf" v-show="showTakeBySelf">

      <van-cell-group>

        <van-field v-model="nameSelf" placeholder="姓名" />


        <van-field v-model="cellphoneSelf" placeholder="手机号码" />


        <van-field v-model="region" placeholder="所在地区" @click='showRegion' />


        <van-field v-model="spot" placeholder="自提点名称" />


        <van-field v-model="addressSelf" placeholder="详细地址" />


      </van-cell-group>

      <ChildData/>


      <van-actionsheet v-model="show" :actions="getGender"/>

      <van-picker :columns="columns" @change="onChange" v-show='showAge'/>

      <van-picker :columns="cityColumns" @change="citySelect" v-show="showCityColums"/>


      <!--<van-button type="primary" size="large" disabled v-show="hideComfirmButton">确认</van-button>-->

      <van-button type="primary" size="large" v-show="showComfirmButton" @click="takeBySelf">确认</van-button>

    </section>


  </div>
</template>

<script>
  import ChildData from './childData'

  export default {

    name: 'messageExpress',

    components: {

      ChildData,

    },

    data () {

      return {

        url: 'http://bs.tianaishijie.com/userService',

        active: 2,
        rid: null,
        username: '',

        cellphone: '',

        address: '',
        gender: null,
        age: null,

        nameSelf: '',
        deliverType: '',

        cellphoneSelf: '',
        postCode: '',

        addressSelf: '',

        show: false,
        supplierId: null,

        genderSelf: null,

        ageSelf: null,

        showAge: false,

        showComfirmButton: false,

        hideComfirmButton: true,

        showExpress: true,

        showTakeBySelf: false,
        showCityColums: false,
        sentMethod: null,

        navArr: [{

          name: '快递（到付）'

        },

          {

            name: '自提'

          },

        ],

        getGender: [{

          name: '请选择孩子性别',

          callback: this.select

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

        columns: ['0-2岁', '3-5岁', '6-12岁', '13岁以上'],

      }

    },

    methods: {
      // checkPhone(e){
      //   if(/^1[34578]\d{9}$/.test(e)==false){
      //     this.$toast('请输入11位数字手机号码');
      //   }
      // },
      express () {

        this.fill();
        if (this.gender == '男') {
          this.gender = 1
        } else if (this.gender == '女') {
          this.gender = 2
        }

        if (this.genderSelf == '男') {
          this.genderSelf = 1
        } else if (this.genderSelf == '女') {
          this.genderSelf = 2
        }

        let age
        if (this.age == '0-2岁') {
          age = 25
        } else if (this.age == '3-5岁') {
          age = 26
        } else if (this.age == '6-12岁') {
          age = 27
        } else {
          age = 28
        }
        this.$axios({
          method: 'put',
          url: this.url + '/address/prizeRecord/deliverInfo',
          data: {
            'id': this.rid,        //奖品记录id
            'deliverType': 1, //类型：Number  必有字段  备注：类型 1快递地址 2自提地址
            'address': this.address,
            'mobileNumber': this.cellphone,
            'receiverName': this.username,
            'babySex': this.gender,
            'babyAge': age,
            'postcode': this.postCode,
          }
        })
          .then((res) => {
            alert(res)
          })
          .catch((err) => {
            alert(err.data)
          })
      },
      takeBySelf () {
        this.fillCellPhone ();
        if (this.gender == '男') {
          this.gender = 1
        } else if (this.gender == '女') {
          this.gender = 2
        }

        if (this.genderSelf == '男') {
          this.genderSelf = 1
        } else if (this.genderSelf == '女') {
          this.genderSelf = 2
        }
        let age
        if (this.age == '0-2岁') {
          age = 25
        } else if (this.age == '3-5岁') {
          age = 26
        } else if (this.age == '6-12岁') {
          age = 27
        } else {
          age = 28
        }
        this.$axios({
          method: 'put',
          url: this.url + '/address/prizeRecord/deliverInfo',
          data: {
            'id': this.rid,        //奖品记录id
            'deliverType': 2, //类型：Number  必有字段  备注：类型 1快递地址 2自提地址
            'address': this.addressSelf,
            'supplierId': this.supplierId,
            'mobileNumber': this.cellphoneSelf,
            'receiverName': this.nameSelf,
            'babySex': this.genderSelf,
            'babyAge': this.ageSelf
          }
        })
          .then((res) => {
            alert(res)
          })
          .catch((err) => {
            alert(err.data)
          })
      },

      showRegion () {
        this.showCityColums = true
      },
      citySelect (picker, values) {

        this.region.push(picker.getColumnValue(0, citys[values[0]]))

        this.region.push(picker.getColumnValue(1, citys[values[0]]))

        this.region.push(picker.getColumnValue(2, citys[values[0]]))

        this.region.push(picker.getColumnValue(3, citys[values[0]]))

        this.showCityColums = false

        if (this.region.length > 4) {

          this.region = []

          this.region.push(picker.getColumnValue(0, citys[values[0]]))

          this.region.push(picker.getColumnValue(1, citys[values[0]]))

          this.region.push(picker.getColumnValue(2, citys[values[0]]))

          this.region.push(picker.getColumnValue(3, citys[values[0]]))

          console.log(this.region)

        }

      },

      onClick (item) {

        this.gender = item.name

        this.show = false

      },

      select (item) {


        // this.gender = item.name;

        this.show = true

        if (this.show) {

          this.showAge = false

        }

      },

      selectAge (item) {
        this.age = item.name
        this.showAge = true

        if (this.showAge) {

          this.show = false

        }

      },

      onChange (picker, value, index) {

        this.age = value

        this.showAge = false

      },

      fillCellPhone () {
        let e = this.cellphone;
        if(/^1[34578]\d{9}$/.test(e)==false){
          this.$toast('请输入11位数字手机号码');
          this.cellphoneSelf = null
        }

        if (this.username != '' && this.cellphone != '' && this.address != '') {

          this.showComfirmButton = true

          this.hideComfirmButton = false

        } else {

          this.showComfirmButton = false

          this.hideComfirmButton = true

        }


      },

      fill () {
        let e = this.cellphone;
          if(/^1[34578]\d{9}$/.test(e)==false){
            this.$toast('请输入11位数字手机号码或6位数字邮政编号');
            this.cellphone = null
          }
        let p = this.postCode;
        if(/^[0-9]{6}$/.test(p)==false){
            this.$toast('请输入11位数字手机号码或6位数字邮政编号');
          this.postCode = null
        }

        if (this.username != '' && this.cellphone != '' && this.address != '') {

          this.showComfirmButton = true

          this.hideComfirmButton = false

        } else {

          this.showComfirmButton = false

          this.hideComfirmButton = true

        }

      },

      selectTitle (item) {
        alert(this.sentMethod)
        if (item == 0) {
          this.deliverType = 1

          this.showExpress = true

          this.showTakeBySelf = false

        } else if (item == 1) {
          this.deliverType = 2
          this.showExpress = false

          this.showTakeBySelf = true

        }

      },

      selectSelf (item) {

        this.genderSelf = item.name

        this.show = true

        if (this.show) {

          this.showAge = false

        }

      },

      selectAgeSelf (item) {

        if (item.name == '0-2岁') {
          this.ageSelf = 25
        } else if (item.name == '3-5岁') {
          this.ageSelf = 26
        } else if (item.name == '6-12岁') {
          this.ageSelf = 27
        } else {
          this.ageSelf = 28
        }

        // this.ageSelf = item.name;

        this.showAge = true

        if (this.showAge) {

          this.show = false

        }

      }
    },

    created () {
      // alert(this.$route.query.id);

      // alert(this.$route.query.deliverType);
      this.rid = this.$route.query.saveRecordId;
      console.log("saveRecordId-----"+this.$route.query.saveRecordId);
    }
  }
</script>

<style scoped>
  #wrapper {

    height: 100%;

    background: rgb(242, 242, 242);

  }
</style>
