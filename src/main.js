// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import "babel-polyfill"
import { Field,Tab, Tabs,Picker, Actionsheet, Button, NavBar,Icon,Area,Cell,CellGroup,Toast, RadioGroup, Radio} from 'vant';

Vue.use(Field)
   .use(Tab).use(Tabs)
   .use(Picker)
   .use(Actionsheet)
   .use(Button)
   .use(NavBar)
   .use(Icon)
   .use(Area)
   .use(Cell).use(CellGroup)
   .use(Toast)
   .use(RadioGroup)
   .use(Radio)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cookies = VueCookies
axios.defaults.withCredentials=true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
