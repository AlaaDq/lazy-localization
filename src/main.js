import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// import i18n from './i18n'
import {i18n} from './i18nCustom'


if(i18n.locale=='ar')
document.querySelector('html').setAttribute('dir', 'rtl')
if(i18n.locale=='en')
document.querySelector('html').setAttribute('dir', 'ltr')


// neccery for third way of load trans
import(/* webpackChunkName: "lang-[request]" */ `@/locales/ar`).then(msgs => {
  i18n.setLocaleMessage('ar', msgs.default)
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
