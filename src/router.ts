import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from '@/config'

const routes = [
    {
        path: '/users',
        name: routeNames.users,
        component: () => import('@/views/User/User.view.vue')
    },
    {
      path: '/dispatch',
      name: routeNames.dispatch,
      component: () => import('@/views/Dispatch/Dispatch.view.vue')
    },
    {
      path: '/dispatch/form',
      name: routeNames.dispatchForm,
      component: () => import('@/views/Dispatch/DispatchForm.view.vue')
    },
    {
      path: '/teams',
      name: routeNames.teams,
      component: () => import('@/views/Team/Team.view.vue')
    },
    {
      path: '/teams/members/:id',
      name: routeNames.teamMembers,
      component: () => import('@/views/Team/TeamMembers.view.vue')
    }
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router