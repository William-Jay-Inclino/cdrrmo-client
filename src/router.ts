import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from './common/constants'

const routes = [

    // ================ dashboard route ================ 
    {
        path: '/',
        name: routeNames.dashboard,
        component: () => import('./dashboard/Dashboard.vue')
    },

    // ================ user route ================ 
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

    // ================ dispatch route ================ 
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

    // ================ team route ================ 
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

    // ================ cso route ================ 
    {
        path: '/csos',
        name: routeNames.csos,
        component: () => import('./cso/Cso.view.vue')
    },

    // ================ po route ================ 
    {
        path: '/pos',
        name: routeNames.pos,
        component: () => import('./po/Po.view.vue')
    },
    {
        path: '/pos/form',
        name: routeNames.posForm,
        component: () => import('./po/PoForm.view.vue')
    },

    // ================ bart route ================ 
    {
        path: '/barts',
        name: routeNames.barts,
        component: () => import('./bart/Bart.view.vue')
    },
    {
        path: '/barts/form',
        name: routeNames.bartsForm,
        component: () => import('./bart/BartForm.view.vue')
    },

    // ================ na route ================ 
    {
        path: '/national-agencies',
        name: routeNames.nationalAgencies,
        component: () => import('./na/Na.view.vue')
    },

    // ================ emergency route ================ 
    {
        path: '/emergencies',
        name: routeNames.emergencies,
        component: () => import('./emergency/Emergency.view.vue')
    },

    // ================ training skill route ================ 
    {
        path: '/training-skills',
        name: routeNames.trainingSkills,
        component: () => import('./training_skill/TrainingSkill.view.vue')
    },
    {
        path: '/training-skills/form',
        name: routeNames.trainingSkillsForm,
        component: () => import('./training_skill/TrainingSkillForm.view.vue')
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