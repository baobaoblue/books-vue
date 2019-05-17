import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/add',
      name:'Add',
      component:()=> import('../components/Add'),
      meta:{title:'添加'}
    },
    {
      path:'/home',
      name:'Home',
      meta:{keepAlive:true,title:'首页'},
      component:()=> import('../components/Home')
    },
    {
      path:'/cart',
      name:'Cart',
      component:()=> import('../components/Cart'),
      meta:{title:'购物车'}
    },
    {
      path:'/detail/:bid',
      name:'detail',
      component:()=> import('../components/Detail'),
      meta:{title:'详情'}
    },
    {
      path:'/list',
      name:'List',
      component:()=> import('../components/List'),
      meta:{title:'列表'}
    },
    {
      path:'*',
      redirect:'/home'
    }
  ]
})
