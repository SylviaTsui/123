import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import QRCode from '@/components/qrCode'
import UserData from '@/components/userData'
import PrizeList from '@/components/prizeList'
import DetailPage from '@/components/detailPage'
import SetMessage from '@/components/setMessage'
import Test from '@/components/test'
import LuckyDraw from '@/components/luckyDraw'
import LetterPrize from '@/components/letterPrize'
import Subscribe from '@/components/subscribe'
import SupplierPage from '@/components/supplierPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/qrcode',
      name: 'QRCode',
      component: QRCode
    },
    {
      path: '/userdata',
      name: 'UserData',
      component: UserData
    },
    {
      path: '/prizeList',
      name: 'PrizeList',
      component: PrizeList
    },
    {
      path: '/detailpage',
      name: 'detailpage',
      component: DetailPage
    },
    {
      path: '/setMessage',
      name: 'setMessage',
      component: SetMessage
    },
    {
      path: '/helloworld',
      name: 'helloworld',
      component:HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component:Test
    },
    {
      path: '/letterPrize',
      name: 'letterPrize',
      component:LetterPrize
    },
    {
      path: '/luckyDraw',
      name: 'LuckyDraw',
      component:LuckyDraw
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component:Subscribe
    },
    {
      path: '/supplierPage',
      name: 'supplierPage',
      component:SupplierPage
    }
  ]
})
