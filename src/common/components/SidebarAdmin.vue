<template>
    
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-text mx-3"> CDRRMO </div>
            <div class="sidebar-brand-icon">
                <i class="fas fa-shield-alt"></i>
            </div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item" :class="{'active': routeName === routeNames.dashboard}">
            <router-link :to="{name: routeNames.dashboard}" class="nav-link">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Operations
        </div>

        <!-- Nav Item - Charts -->
        <li class="nav-item" :class="{'active': routeName === routeNames.dispatch || routeName === routeNames.dispatchForm}">
            <router-link :to="{name: routeNames.dispatch}" class="nav-link">
                <i class="fas fa-fw fa-truck"></i>
                <span>Dispatch</span>
            </router-link>
        </li>




        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Resource Management
        </div>

        <li class="nav-item" :class="{'active': routeName === routeNames.users}">
            <router-link :to="{name: routeNames.users}" class="nav-link">
                <i class="fas fa-fw fa-users"></i>
                <span>Personnel</span>
            </router-link>
        </li>

        <li class="nav-item" :class="{'active': routeName === routeNames.teams || routeName === routeNames.teamManage || routeName === routeNames.teamsForm}">
            <router-link :to="{name: routeNames.teams}" class="nav-link">
                <i class="fas fa-fw fa-sitemap"></i>
                <span>Team</span>
            </router-link>
        </li>

        <li class="nav-item" :class="{'active': routeName === routeNames.emergencies || routeName === routeNames.emergenciesForm}">
            <router-link :to="{name: routeNames.emergencies}" class="nav-link">
                <i class="fas fa-fw fa-exclamation-triangle"></i>
                <span>Emergency</span>
            </router-link>
        </li>

        <li class="nav-item" :class="{'active': routeName === routeNames.trainingSkills || routeName === routeNames.trainingSkillsForm}">
            <router-link :to="{name: routeNames.trainingSkills}" class="nav-link">
                <i class="fas fa-fw fa-medal"></i>
                <span>Training Skill</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Organizations
        </div>

        <li class="nav-item" :class="{'active': routeName === routeNames.nationalAgencies || routeName === routeNames.nationalAgenciesForm}">
            <router-link :to="{name: routeNames.nationalAgencies}" class="nav-link">
                <i class="fas fa-fw fa-building"></i>
                <span>National Agency</span>
            </router-link>
        </li>

        <li class="nav-item" :class="{'active': routeName === routeNames.csos || routeName === routeNames.csosForm}">
            <router-link :to="{name: routeNames.csos}" class="nav-link">
                <i class="fas fa-fw fa-hands-helping"></i>
                <span>CSO</span>
            </router-link>
        </li>

        <li class="nav-item" :class="{'active': routeName === routeNames.pos || routeName === routeNames.posForm}">
            <router-link :to="{name: routeNames.pos}" class="nav-link">
                <i class="fas fa-fw fa-users"></i>
                <span>PO</span>
            </router-link>
        </li>

        <li class="nav-item" :class="{'active': routeName === routeNames.barts || routeName === routeNames.bartsForm}">
            <router-link :to="{name: routeNames.barts}" class="nav-link">
                <i class="fas fa-fw fa-home"></i>
                <span>BART</span>
            </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Reports
        </div>

        <li class="nav-item" :class="{'active': routeName === routeNames.incidentReport}">
            <router-link :to="{name: routeNames.incidentReport}" class="nav-link">
                <i class="fas fa-file-alt"></i>
                <span>Incident Report</span>
            </router-link>
        </li>

        <!-- Sidebar Toggler (Sidebar) -->
        <!-- <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div> -->

        <!-- Sidebar Message -->
        <!-- <div class="sidebar-card d-none d-lg-flex">
            <img class="sidebar-card-illustration mb-2" src="/sbadmin/img/undraw_rocket.svg" alt="...">
            <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
            <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
        </div> -->

    </ul>
</template>


<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { routeNames } from '../constants'

    const route = useRoute();
    const routeName = computed( () => route.name) 

</script>