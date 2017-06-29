import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detalhe from '@/components/Detalhe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/detalhe',
      name: 'Detalhe',
      component: Detalhe
    }
  ]
})
