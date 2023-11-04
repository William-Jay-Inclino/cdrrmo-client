import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from '@/helpers/constants'

const routes = [
    {
        path: '/users',
        name: routeNames.users,
        component: () => import('@/views/User/User.view.vue')
    },
    {
        path: '/users/form',
        name: routeNames.userForm,
        component: () => import('@/views/User/UserForm.view.vue')
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
    },
    {
        path: '/csos',
        name: routeNames.csos,
        component: () => import('@/views/Cso/Cso.view.vue')
    },
    {
        path: '/pos',
        name: routeNames.pos,
        component: () => import('@/views/Po/Po.view.vue')
    },
    {
        path: '/barts',
        name: routeNames.barts,
        component: () => import('@/views/Bart/Bart.view.vue')
    },
    {
        path: '/national-agencies',
        name: routeNames.nationalAgencies,
        component: () => import('@/views/Na/Na.view.vue')
    },
    {
        path: '/emergencies',
        name: routeNames.emergencies,
        component: () => import('@/views/Emergency/Emergency.view.vue')
    },
    {
        path: '/training-skills',
        name: routeNames.trainingSkills,
        component: () => import('@/views/TrainingSkill/TrainingSkill.vue')
    },
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