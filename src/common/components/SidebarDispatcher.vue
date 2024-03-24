<template>

    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <!-- <div class="sidebar-brand-text mx-3"> CDRRMO </div> -->
            <div class="sidebar-brand-icon">
                <img :src="config.baseUrl + 'images/cdrrmo-v2/system-logo-header.png'" style="height: 5em">
                <!-- <i class="fas fa-shield-alt"></i> -->
            </div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <li class="nav-item"
            :class="{ 'active': routeName === routeNames.dispatch || routeName === routeNames.dispatchForm }">
            <router-link :to="{ name: routeNames.dispatch }" class="nav-link">
                <i class="fas fa-fw fa-truck"></i>
                <span>Dispatch</span>
            </router-link>
        </li>

        <li class="nav-item"
            :class="{ 'active': routeName === routeNames.teams || routeName === routeNames.teamManage || routeName === routeNames.teamsForm }">
            <router-link :to="{ name: routeNames.teams }" class="nav-link">
                <i class="fas fa-fw fa-sitemap"></i>
                <span>Team</span>
            </router-link>
        </li>

        <li class="nav-item"
            :class="{ 'active': routeName === routeNames.location || routeName === routeNames.locationForm }">
            <router-link :to="{ name: routeNames.location }" class="nav-link">
                <i class="fas fa-fw fa-map"></i>
                <span>Location</span>
            </router-link>
        </li>

        <div class="sidebar-card d-none d-lg-flex flex-column align-items-center mt-auto">
            <img class="sidebar-card-illustration mb-2" :src="config.baseUrl + 'images/cdrrmo-v1/cdrrmo-logo.png'"
                style="height: 8rem;">
        </div>

    </ul>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { routeNames } from '../constants'
import { config } from '../../config'

const route = useRoute();
const routeName = computed(() => route.name)

</script>