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

        <li class="nav-item" :class="{'active': routeName === routeNames.dispatch || routeName === routeNames.dispatchForm}">
            <router-link :to="{name: routeNames.dispatch}" class="nav-link">
                <i class="fas fa-fw fa-truck"></i>
                <span>Dispatch</span>
            </router-link>
        </li>

        <li class="nav-item" :class="{'active': routeName === routeNames.location || routeName === routeNames.locationForm}">
            <router-link :to="{name: routeNames.location}" class="nav-link">
                <i class="fas fa-fw fa-map"></i>
                <span>Location</span>
            </router-link>
        </li>
    </ul>
</template>


<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { routeNames } from '../constants'

    const route = useRoute();
    const routeName = computed( () => route.name) 

</script>