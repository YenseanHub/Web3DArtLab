import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import RoadMapView from '../views/RoadMapView.vue'
// import MarkdownView from '../views/Markdown/MarkdownView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/roadmap',
      name: 'roadMap',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RoadMapView.vue')
    },
    {
      path: '/markdown/:query',
      name: 'markdown',
      component: () => import('../views/Markdown/MarkdownView.vue')
    }, 
    {//在地址为空时，直接跳转
      path:'/sapling',
      redirect:'/sapling/index'
    },
    {
      path: '/sapling/:saplingId',
      name: 'sapling',
      component: () => import('../views/SaplingView.vue')
    },
    {//在地址为空时，直接跳转
      path:'/tree',
      redirect:'/tree/index'
    },
    {
      path: '/tree/:treeId',
      name: 'tree',
      component: () => import('../views/TreeView.vue')
    },
    {
      path: '/forest',
      name: 'forest',
      component: () => import('../views/InConstructionView.vue')
    }
  ]
})

export default router
