import { createRouter, createWebHistory } from 'vue-router'
import { routeNames } from './common/constants'
import { authService } from './auth';
import { useToast } from "vue-toastification";

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
        meta: { requiresAuth: true },
        component: () => import('./dashboard/Dashboard.vue'),
    },

    // ================ user route ================ 
    {
        path: '/users',
        name: routeNames.users,
        meta: { requiresAuth: true },
        component: () => import('./user/User.view.vue')
    },
    {
        path: '/users/form',
        name: routeNames.userForm,
        meta: { requiresAuth: true },
        component: () => import('./user/UserForm.view.vue')
    },

    // ================ dispatch route ================ 
    {
        path: '/dispatch',
        name: routeNames.dispatch,
        meta: { requiresAuth: true },
        component: () => import('./dispatch/Dispatch.view.vue')
    },
    {
        path: '/dispatch/form',
        name: routeNames.dispatchForm,
        meta: { requiresAuth: true },
        component: () => import('./dispatch/DispatchForm.view.vue')
    },

    // ================ team route ================ 
    {
        path: '/teams',
        name: routeNames.teams,
        meta: { requiresAuth: true },
        component: () => import('./team/Team.view.vue')
    },
    {
        path: '/teams/form',
        name: routeNames.teamsForm,
        meta: { requiresAuth: true },
        component: () => import('./team/TeamForm.view.vue')
    },
    {
        path: '/teams/manage',
        name: routeNames.teamManage,
        meta: { requiresAuth: true },
        component: () => import('./team/TeamManage.view.vue')
    },

    // ================ cso route ================ 
    {
        path: '/csos',
        name: routeNames.csos,
        meta: { requiresAuth: true },
        component: () => import('./cso/Cso.view.vue')
    },
    {
        path: '/csos/form',
        name: routeNames.csosForm,
        meta: { requiresAuth: true },
        component: () => import('./cso/CsoForm.view.vue')
    },

    // ================ po route ================ 
    {
        path: '/pos',
        name: routeNames.pos,
        meta: { requiresAuth: true },
        component: () => import('./po/Po.view.vue')
    },
    {
        path: '/pos/form',
        name: routeNames.posForm,
        meta: { requiresAuth: true },
        component: () => import('./po/PoForm.view.vue')
    },

    // ================ bart route ================ 
    {
        path: '/barts',
        name: routeNames.barts,
        meta: { requiresAuth: true },
        component: () => import('./bart/Bart.view.vue')
    },
    {
        path: '/barts/form',
        name: routeNames.bartsForm,
        meta: { requiresAuth: true },
        component: () => import('./bart/BartForm.view.vue')
    },

    // ================ na route ================ 
    {
        path: '/national-agencies',
        name: routeNames.nationalAgencies,
        meta: { requiresAuth: true },
        component: () => import('./na/Na.view.vue')
    },
    {
        path: '/national-agencies/form',
        name: routeNames.nationalAgenciesForm,
        meta: { requiresAuth: true },
        component: () => import('./na/NaForm.view.vue')
    },

    // ================ emergency route ================ 
    {
        path: '/emergencies',
        name: routeNames.emergencies,
        meta: { requiresAuth: true },
        component: () => import('./emergency/Emergency.view.vue')
    },
    {
        path: '/emergencies/form',
        name: routeNames.emergenciesForm,
        meta: { requiresAuth: true },
        component: () => import('./emergency/EmergencyForm.view.vue')
    },

    // ================ training skill route ================ 
    {
        path: '/training-skills',
        name: routeNames.trainingSkills,
        meta: { requiresAuth: true },
        component: () => import('./training_skill/TrainingSkill.view.vue')
    },
    {
        path: '/training-skills/form',
        name: routeNames.trainingSkillsForm,
        meta: { requiresAuth: true },
        component: () => import('./training_skill/TrainingSkillForm.view.vue')
    },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

const toast = useToast();

router.beforeEach((to, from, next) => {
    console.log('from', from)
    console.log('to', to)

    if(to.name === routeNames.login){
        next()
        
        return 
    }
    
    if (to.meta.requiresAuth && !authService.isAuthenticated()) {
        // Redirect to the login page if not authenticated
        toast.error('Unauthorized page!')
        next({ name: routeNames.login});

        return 
    } 

    next();
});

export default router