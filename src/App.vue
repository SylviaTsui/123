<template>
  <div ref="app" id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {

    name: 'App',
    data () {
      return {
        'url': 'http://bs.tianaishijie.com/userService',
        'state': null,
        'isSubscribe': null,
        'params': {},
      }
    },
    methods: {
      getQuery (key, str) {
        var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
        if (str == null) {
          str = window.location.search
        }
        var r = str.substr(1).match(reg)
        if (r != null) {
          return unescape(r[2])
        }
        return null
      },
      async getToken (state) {
        let redirectUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx917c5ed5ceba6da4&redirect_uri=http://tianaishijie.com&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(state) + '#wechat_redirect'
        let codeT = this.getQuery('code')
        console.log('codeT__' + codeT)
        if (codeT == null || codeT == '') {
          window.location.href = redirectUri
        }
        await this.$axios.get(this.url + '/user/weChatLogin', {
          params: {
            code: codeT
          }
        })
          .then((res) => {
            this.$cookies.set('USER_TOKEN', res.data.data.token, null, '/', 'tianaishijie.com')
            this.$cookies.set('USER_INFO', JSON.stringify(res.data.data.userInfo), null, '/', 'tianaishijie.com')
            console.log('userInfo: ' + JSON.stringify(this.getUserInfo()))
            //  alert("这是token_" + this.$cookies.get("USER_TOKEN"))
          })
          .catch((err) => {
            window.location.href = redirectUri
          })
      },
      getUserInfo () {
        return JSON.parse(this.$cookies.get('USER_INFO'))
      },
      getParams () {
        return this.params
      },
      async subscibe () {
        await this.$axios.get(this.url + '/user/getSubscriberUserInfo')
          .then((res) => {
            this.isSubscribe = res.data.data.subscribe
          })
          .catch((err) => {
            this.isSubscribe = 2
          })
        return this.isSubscribe
      }
    },
    async created () {
      let state = this.getQuery('state')
      let uri = this.getQuery('uri', this.getQuery('state'))
      let areaId = this.getQuery('areaid', this.getQuery('state'))
      console.log('code:' + this.getQuery('code'))
      console.log('state:' + state)
      console.log('uri:' + uri)
      let userToken = this.$cookies.get('USER_TOKEN')
      if (userToken == null || userToken == '') {
        await this.getToken(state)
      }
      console.log(this.$route.query)
      this.params = {
        'areaId': areaId
      }
      history.replaceState(null, '', '/')
      this.$router.push({
        path: uri
      })
    },
    mounted () {
      // this.$refs.app.style.height = document.body.clientHeight
      // this.$refs.app.style.width = document.body.clientWidth
    }
  }
</script>

<style>
  body {
    position: fixed;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  #app {
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: hidden;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #app>div{
    position: fixed;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  li {
    list-style: none;
  }
</style>
