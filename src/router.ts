import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from './common/constants'

const routes = [

    {
        path: '/',
        name: routeNames.login,
        component: () => import('./Login.vue')
    },

    // ================ dashboard route ================ 
    {
        path: '/dashboard',
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
        path: '/teams/form',
        name: routeNames.teamsForm,
        component: () => import('./team/TeamForm.view.vue')
    },
    {
        path: '/teams/manage',
        name: routeNames.teamManage,
        component: () => import('./team/TeamManage.view.vue')
    },

    // ================ cso route ================ 
    {
        path: '/csos',
        name: routeNames.csos,
        component: () => import('./cso/Cso.view.vue')
    },
    {
        path: '/csos/form',
        name: routeNames.csosForm,
        component: () => import('./cso/CsoForm.view.vue')
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
    {
        path: '/national-agencies/form',
        name: routeNames.nationalAgenciesForm,
        component: () => import('./na/NaForm.view.vue')
    },

    // ================ emergency route ================ 
    {
        path: '/emergencies',
        name: routeNames.emergencies,
        component: () => import('./emergency/Emergency.view.vue')
    },
    {
        path: '/emergencies/form',
        name: routeNames.emergenciesForm,
        component: () => import('./emergency/EmergencyForm.view.vue')
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
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})
export default router