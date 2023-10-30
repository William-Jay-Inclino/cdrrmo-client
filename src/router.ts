import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/users',
        name: 'user.route',
        component: () => import('./views/User.view.vue')
    },
    {
      path: '/dispatch',
      name: 'dispatch.route',
      component: () => import('./views/Dispatch.view.vue')
    },
    {
      path: '/teams',
      name: 'teams.route',
      component: () => import('./views/Team.view.vue')
    },
    {
      path: '/teams/members/:id',
      name: 'members.route',
      component: () => import('./views/TeamMembers.view.vue')
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