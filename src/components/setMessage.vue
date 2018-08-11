<template>
  <div id="wrapper">
    <van-nav-bar title="领取信息"/>

    <van-tabs v-model="active" @click="selectTitle">
      <van-tab v-bind:disabled="isDisabledCase" v-for="index in navArr" :title="index.name"></van-tab>
    </van-tabs>

    <!-- 快递 -->
    <section id="express" v-show="showExpress">
      <van-cell-group>
        <van-field v-model="formData.receiverName" v-bind:disabled="isDisabledCase" placeholder="收件人名称"/>
        <van-field v-model="formData.mobile" v-bind:disabled="isDisabledCase" placeholder="手机号码"/>
        <van-field v-model="formData.postcode" v-bind:disabled="isDisabledCase" placeholder="邮编地址"/>
        <van-field v-model="formData.address" v-bind:disabled="isDisabledCase" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"/>
        <van-field v-model="formData.babySex" v-bind:disabled="isDisabledCase" placeholder="孩子性别（选填）" readonly
                   @click="select"/>
        <van-field v-model="formData.babyAge" v-bind:disabled="isDisabledCase" placeholder="孩子年龄（选填）" readonly
                   @click="showSelectAge"/>
      </van-cell-group>

      <!--<van-button type="primary" size="large" disabled v-show="hideComfirmButton">确认</van-button>-->
      <van-button type="primary" v-bind:disabled="isDisabledCase" v-if="this.isDisabledCase === true" size="large">
        如需修改请联系客服.
      </van-button>
      <van-button type="primary" v-bind:disabled="isDisabledCase" v-if="this.isDisabledCase === false" size="large"
                  @click="express">确定
      </van-button>
    </section>

    <section id="takeBySelf" v-show="showTakeBySelf">
      <van-field v-model="formData.receiverName" v-bind:disabled="isDisabledCase" placeholder="姓名"/>
      <van-field v-model="formData.mobile" v-bind:disabled="isDisabledCase" placeholder="手机号码"/>
      <van-field v-model="formData.region" v-bind:disabled="isDisabledCase" readonly placeholder="选择地址"
                 @click="regionOnClick"/>
      <van-field v-model="formData.supplierName"  @click="supplierShow=true" readonly placeholder="选择自提点"/>
      <!-- 自提 -->
      <van-field v-model="formData.babySex" v-bind:disabled="isDisabledCase"  readonly placeholder="孩子性别（选填）" readonly
                 @click="select"/>
      <van-field v-model="formData.babyAge" v-bind:disabled="isDisabledCase" readonly placeholder="孩子年龄（选填）" readonly
                 @click="showSelectAge"/>

      <van-picker :columns="regionColumns" @change="regionOnChange" v-bind:loading="regionColumns.load"
                  ref="regionPicker" show-toolbar="true" @confirm="regionConfirm" @cancel="regionCancel"
                  v-show="regionColumnsShow"/>

      <!--      <van-actionsheet v-model="genderShow" :actions="getGender"/>
            <van-picker :columns="columns" @change="onChange" v-show='showAge'/>-->

      <!--<van-button type="primary" size="large" disabled v-show="hideComfirmButton">确认</van-button>-->
      <van-button type="primary" v-bind:disabled="isDisabledCase" v-if="this.isDisabledCase === true" size="large">
        如需修改请联系客服.
      </van-button>
      <van-button type="primary" v-bind:disabled="isDisabledCase" v-if="this.isDisabledCase === false" size="large"
                  @click="takeBySelf">确定
      </van-button>

      <van-actionsheet v-model="supplierShow" :actions="supplierColumns" @select="supplierOnClick"/>
    </section>
    <van-actionsheet v-model="genderShow" :actions="getGender"/>

    <van-picker :columns="columns" @change="babyAgeOnChange" v-show='showAge' show-toolbar @confirm="babyAgeConfirm"/>

  </div>
</template>

<script>
  const tempC = {}
  export default {
    name: 'messageExpress',
    data () {
      return {
        regionColumnsShow: false,
        isDisabledCase: false,
        url: 'http://bs.tianaishijie.com/userService',
        active: 2,
        formData: {},
        supplierShow: false,
        deliverType: '',
        cellphoneSelf: '',
        postCode: '',
        genderShow: false,
        supplierId: null,
        showAge: false,
        showComfirmButton: false,
        hideComfirmButton: true,
        showExpress: true,
        showTakeBySelf: false,
        showCityColums: false,
        sentMethod: null,
        deliverInfo: null,
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
        supplierColumns: [],
        regionColumns: [
          {
            values: [],
            className: 'column1',
            defaultIndex: 1
          },
          {
            values: [],
            className: 'column2',
            defaultIndex: 2
          },
          {
            values: [],
            className: 'column3',
            defaultIndex: 3
          },
          {
            values: [],
            className: 'column4',
            defaultIndex: 4
          }
        ],

      }
    },
    methods: {
      babySexConverter (sex) {
        if (sex == '男') {
          return 1
        } else if (sex == '女') {
          return 2
        } else if (sex == 1) {
          return '男'
        } else if (sex == 2) {
          return '女'
        }
        return ''
      },
      babyAgeConverter (age) {
        if (age === '0-2岁') {
          return 25
        } else if (age === '3-5岁') {
          return 26
        } else if (age === '6-12岁') {
          return 27
        } else if (age === '13岁以上') {
          return 28
        } else if (age === 25) {
          return '0-2岁'
        } else if (age === 26) {
          return '3-5岁'
        } else if (age === 27) {
          return '6-12岁'
        } else if (age === 28) {
          return '13岁以上'
        }
      },
      express () {
        if (!this.fill(1)) {
          return
        }
        this.$axios({
          method: 'put',
          url: this.url + '/address/prizeRecord/deliverInfo',
          data: {
            'id': this.$route.query.saveRecordId,        //奖品记录id
            'deliverType': 1, //类型：Number  必有字段  备注：类型 1快递地址 2自提地址
            'address': this.formData.address,
            'mobileNumber': this.formData.mobile,
            'receiverName': this.formData.receiverName,
            'babySex': this.babySexConverter(this.formData.babySex),
            'babyAge': this.babyAgeConverter(this.formData.babyAge),
            'postcode': this.formData.postcode,
          }
        })
          .then((res) => {
            // alert('保存成功!')
            this.$toast('保存成功')
            if (res.status == 204) {
              this.$router.push({
                path: '/prizeList'
              })
            }
          })
          .catch((err) => {
            alert('保存失败!')
            console.log('保存领取信息失败:' + err.data)
          })
      },
      takeBySelf () {
        if (!this.fill(2)) {
          return
        }
        this.$axios({
          method: 'put',
          url: this.url + '/address/prizeRecord/deliverInfo',
          data: {
            'id': this.$route.query.saveRecordId,
            'deliverType': 2,
            'mobileNumber': this.formData.mobile,
            'receiverName': this.formData.receiverName,
            'supplierId': this.formData.supplierId,
            'babySex': this.babySexConverter(this.formData.babySex),
            'babyAge': this.babyAgeConverter(this.formData.babyAge)
          }
        })
          .then((res) => {
            if (res.status == 204) {
              this.$toast('保存成功！')
              this.$router.push({
                path: '/prizeList'
              })
            }
          })
          .catch((err) => {
            alert('保存失败!')
            console.log(err.response.status)
          })
      },
      supplierOnClick (item) {
        this.formData.supplierId = item.id
        this.formData.supplierName = item.name
        console.log('formData.supplier id: ' + this.formData.supplierId + '    formData.supplier Name: ' + this.formData.supplierName)
        this.supplierShow = false
      },
      onClick (item) {
        this.formData.babySex = item.name
        this.genderShow = false
      },
      select (item) {
        this.genderShow = true
        if (this.genderShow) {
          this.showAge = false
        }
      },
      showSelectAge () {
        this.showAge = true
      },
      babyAgeOnChange (picker, value, index) {

      },
      babyAgeConfirm (value, index) {
        this.formData.babyAge = value
        this.showAge = false
      },
      fill (deliverType) {
        if (deliverType === 1) {
          let p = this.formData.postcode
          if (/^[0-9]{6}$/.test(p) == false) {
            this.$toast('请输入6位数字邮政编号')
            return false
          }
        } else if (deliverType === 2) {
          //TODO:自提 信息校验

        } else {
          console.log('未知deliverType:' + deliverType)
          return false;
        }
        if (/^1[34578]\d{9}$/.test(this.formData.mobile) == false) {
          this.$toast('请输入11位数字手机号码!')
          return false
        }
        if (this.formData.receiverName == '' && this.formData.mobile == '' && this.formData.address == '') {
          // this.showComfirmButton = true
          // this.hideComfirmButton = false
          return false
        }
        return true
      },
      selectTitle (item) {
        console.log(this.sentMethod)
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
      async loadAreaInfo (areaId) {
        let areaData = {}
        await this.$axios({
          method: 'get',
          url: this.url + '/area/parent/' + areaId,
        }).then((res) => {
          areaData = res.data.data
        }).catch((err) => {
          console.log('地区信息加载失败: ' + err)
        })
        return areaData
      },
      async regionConfirm (values, indexs) {
        this.regionColumnsShow = false
        this.formData.region ="";

        for (let i = 0; i < values.length; i++) {
          this.formData.region += values
        }

        let supplierData = []
        await this.$axios({
          method: 'get',
          url: this.url + '/supplier/area/' + this.regionColumns.columns[3].areaIds[indexs[3]],
        }).then((res) => {
          supplierData = res.data.data
        }).catch((err) => {
          console.log('供应商信息加载失败: ' + err)
        })
        this.supplierColumns = []
        this.supplierColumns.push({name: '请选择自提点', disabled: true})
        for (let i = 0; i < supplierData.length; i++) {
          this.supplierColumns.push({
            name: supplierData[i].area,
            id: supplierData[i].id,
            callback: this.supplierOnClick
          })
        }
      },
      regionOnClick (values, indexs) {
        this.regionColumnsShow = true
      },
      regionCancel (values, indexs) {
        this.regionColumnsShow = false
      },
      async regionOnChange (picker, values) {
        this.regionColumns.load = true
        console.log('currentIndexs:   ' + this.regionColumns.currentIndex)
        console.log('regionOnChange  picker: ' + picker + '    values: ' + values)
        console.log('currentIndexs:   ' + JSON.stringify(this.regionColumns.columns))
        let indexes = this.$refs.regionPicker.getIndexes()
        let currentIndex = this.regionColumns.currentIndex
        for (let i = 0; i < indexes.length - 1; i++) {
          if (indexes[i] !== currentIndex[i]) {
            let loadAreas = await this.loadAreaInfo(this.regionColumns.columns[i].areaIds[indexes[i]])
            this.regionColumns.columns[i + 1].areaNames = []
            this.regionColumns.columns[i + 1].areaIds = []
            for (let j = 0; j < loadAreas.length; j++) {
              this.regionColumns.columns[i + 1].areaNames.push(loadAreas[j].name)
              this.regionColumns.columns[i + 1].areaIds.push(loadAreas[j].id)
            }
            this.$refs.regionPicker.setColumnValues(i + 1, this.regionColumns.columns[i + 1].areaNames)
            this.regionColumns.currentIndex = indexes
            break
          }
        }
        this.regionColumns.load = false
        console.log('indexes:  ' + indexes)
      },
      async regionInit () {
        this.formData.region = ''
        this.regionColumns.load = true
        this.regionColumns.currentIndex = [0, 0, 0, 0]
        this.regionColumns.columns = []
        for (let i = 0; i < 4; i++) {
          this.regionColumns.columns[i] = {}
          this.regionColumns.columns[i].areaNames = []
          this.regionColumns.columns[i].areaIds = []
        }
        //加载地区信息
        let province = await this.loadAreaInfo(0)
        let city = await this.loadAreaInfo(province[0].id)
        let area = await this.loadAreaInfo(city[0].id)
        let region = await this.loadAreaInfo(area[0].id)
        for (let i = 0; i < province.length; i++) {
          this.regionColumns.columns[0].areaNames.push(province[i].name)
          this.regionColumns.columns[0].areaIds.push(province[i].id)
        }
        for (let i = 0; i < city.length; i++) {
          this.regionColumns.columns[1].areaNames.push(city[i].name)
          this.regionColumns.columns[1].areaIds.push(city[i].id)
        }
        for (let i = 0; i < area.length; i++) {
          this.regionColumns.columns[2].areaNames.push(area[i].name)
          this.regionColumns.columns[2].areaIds.push(area[i].id)
        }
        for (let i = 0; i < region.length; i++) {
          this.regionColumns.columns[3].areaNames.push(region[i].name)
          this.regionColumns.columns[3].areaIds.push(region[i].id)
        }
        for (let i = 0; i < this.regionColumns.columns.length; i++) {
          this.$refs.regionPicker.setColumnValues(i, this.regionColumns.columns[i].areaNames)
        }
        this.regionColumns.load = false
        this.regionColumnsShow = false
      }
    },

    async created () {
      console.log('setMessage入参: ' + JSON.stringify(this.$route.params.data))
      this.deliverInfo = this.$route.params.data;
      console.log('setMessage入参: ' + JSON.stringify(this.deliverInfo))

      if (this.deliverInfo != null) {
        this.isDisabledCase = true
        //判断快递还是自提
        if (this.deliverInfo.type === 2) {
          this.showExpress = false
          this.showTakeBySelf = true
          this.formData.receiverName = this.deliverInfo.receiverName
          this.formData.mobile = this.deliverInfo.mobileNumber
          await this.$axios({
            method: 'get',
            url: this.url + '/supplier/' + this.deliverInfo.supplierId,
          }).then((res) => {
            this.formData.supplierName = res.data.data.area
            this.formData.region = res.data.data.address
            console.log("formData.supplierName:   "+this.formData.supplierName+"  formData.region:"+this.formData.region)
          }).catch((err) => {
            console.log('供应商信息加载失败: ' + err)
          })
        } else if (this.deliverInfo.type === 1) {
          this.showExpress = true
          this.showTakeBySelf = false
          this.formData.receiverName = this.deliverInfo.receiverName
          this.formData.mobile = this.deliverInfo.mobileNumber
          this.formData.postcode = this.deliverInfo.postcode
          this.formData.address = this.deliverInfo.address
          console.log('快递类型---username:' + this.formData.receiverName + '  cellphone:' + this.formData.mobile + '  postCode:' + this.formData.postcode + '  address:' + this.formData.address)
        }
        this.formData.babySex = this.babySexConverter(this.deliverInfo.babySex)
        //TODO:转换
        this.formData.babyAge = this.babyAgeConverter(this.deliverInfo.babyAge)
      }
      //地区信息初始化
      this.regionInit()
    }
  }
</script>

<style scoped>

  .region {
    text-align: left;
    color: rgb(169, 169, 169);
  }

  #wrapper {

    height: 100%;

    background: rgb(242, 242, 242);

  }
</style>
