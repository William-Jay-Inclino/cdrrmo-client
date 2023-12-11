import { createRouter, createWebHistory } from 'vue-router'
import { dispatcherModules, routeNames } from './common/constants'
import { authService } from './auth';
import NotFound from './common/components/NotFound.vue'
import Unauthorized from './common/components/Unauthorized.vue'
import Login from './auth/Login.vue'
import Profile from './auth/Profile.vue'
import Settings from './auth/Settings.vue'

const routes = [

    // ================ auth route ================ 

    {
        path: '/',
        name: routeNames.login,
        component: Login,
    },

    {
        path: '/my-profile',
        name: routeNames.profile,
        component: Profile,
    },

    {
        path: '/my-settings',
        name: routeNames.settings,
        component: Settings,
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

        // ================ location route ================ 
        {
            path: '/locations',
            name: routeNames.location,
            meta: { requiresAuth: true },
            component: () => import('./location/Location.view.vue')
        },
        {
            path: '/locations/form',
            name: routeNames.locationForm,
            meta: { requiresAuth: true },
            component: () => import('./location/LocationForm.view.vue')
        },

    // ================ report route ================ 

    {
        path: '/reports/incident',
        name: routeNames.incidentReport,
        meta: { requiresAuth: true },
        component: () => import('./report/Incident.view.vue')
    },

    // ================ error route ================ 
    {
        path: '/:catchAll(.*)',
        name: routeNames.notFound,
        component: NotFound,
    },

    {
        path: '/unauthorized',
        name: routeNames.unauthorized,
        component: Unauthorized,
    },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    console.log('from', from)
    console.log('to', to)

    // check if user is authenticated 
    if (to.meta.requiresAuth && !authService.isAuthenticated()) {
        console.error('user is not authenticated')
        next({ name: routeNames.login});
        return 
    }

    // only allow dispatcher on dispatch module

    if (authService.isDispatcher() && !dispatcherModules.includes(to.name as string)){
        console.error('Dispatcher is unauthorized')
        next({ name: routeNames.unauthorized})
        return 
    }

    // temporary. Since only admin and dispatcher can access the app
    if(authService.isTeamLeader() || authService.isFieldOperator()){
        console.error('Team Lead or Field Operator is unauthorized')
        next({ name: routeNames.login})
        return 
    }


    next();

});

export default router