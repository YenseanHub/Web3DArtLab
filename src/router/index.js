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
    {
      path: '/examples/:exampleId',
      name: 'examples',
      component: () => import('../views/ExampleView.vue')
    }
  ]
})

export default router
