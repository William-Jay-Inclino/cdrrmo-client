import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from './common/constants'

const routes = [
    {
        path: '/',
        name: routeNames.dashboard,
        component: () => import('./dashboard/Dashboard.vue')
    },
    {
        path: '/users',
        name: routeNames.users,
        component: () => import('./user/User.view.vue')
    },
    {
        path: '/users/form',
        name: routeNames.userForm,
        component: () => import('./user/UserForm.view.vue')
    },
    {
        path: '/dispatch',
        name: routeNames.dispatch,
        component: () => import('./dispatch/Dispatch.view.vue')
    },
    {
        path: '/dispatch/form',
        name: routeNames.dispatchForm,
        component: () => import('./dispatch/DispatchForm.view.vue')
    },
    {
        path: '/teams',
        name: routeNames.teams,
        component: () => import('./team/Team.view.vue')
    },
    {
        path: '/teams/members/:id',
        name: routeNames.teamMembers,
        component: () => import('./team/TeamMembers.view.vue')
    },
    {
        path: '/csos',
        name: routeNames.csos,
        component: () => import('./cso/Cso.view.vue')
    },
    {
        path: '/pos',
        name: routeNames.pos,
        component: () => import('./po/Po.view.vue')
    },
    {
        path: '/barts',
        name: routeNames.barts,
        component: () => import('./bart/Bart.view.vue')
    },
    {
        path: '/national-agencies',
        name: routeNames.nationalAgencies,
        component: () => import('./na/Na.view.vue')
    },
    {
        path: '/emergencies',
        name: routeNames.emergencies,
        component: () => import('./emergency/Emergency.view.vue')
    },
    {
        path: '/training-skills',
        name: routeNames.trainingSkills,
        component: () => import('./training_skill/TrainingSkill.vue')
    },
    {
        path: '/training-skills/form',
        name: routeNames.trainingSkillsForm,
        component: () => import('./training_skill/TrainingSkillForm.vue')
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