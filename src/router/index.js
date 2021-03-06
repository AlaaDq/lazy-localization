import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {i18n,loadLanguageAsync} from '/src/i18nCustom'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
// mergeLocaleMessage

router.beforeEach((to, from, next) => {
  if(to.path=="/test")
  {
   const file= to.path.substring(1)//or use route name 
    //check if the file already exist in store register by getters includes
    // register the new merged in store (i18n.locale,file) 
    // `@/locales/${i18n.locale}/${to.path}.json`
    // `@/locales/${file}.json`
    //or axios to backend api get json file
    const currentLang =i18n.locale;
    
    //  import current lang trans file of the page
    // import(`@/locales/${currentLang}/${file}.json`).then((msgs)=>{
    //   i18n.mergeLocaleMessage(i18n.locale,msgs.default || msgs)
    //   next()
    // })

    // or import both ar en trans files of the page
    // use promise all to improve preformance
    // this way need ar lang to be init in main js first app boot 
    import(`@/locales/ar/${file}.json`).then((msgs)=>{
    
      i18n.mergeLocaleMessage('ar',msgs.default || msgs)

      import(`@/locales/en/${file}.json`).then((msgs)=>{
        i18n.mergeLocaleMessage('en',msgs.default || msgs)
        next()
      })
      
    })
    
  
  }
  else{
    next()
  }
})