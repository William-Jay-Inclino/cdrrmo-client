<template>

    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar"
        style="overflow: auto;">

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

        <!-- Nav Item - Dashboard -->
        <!-- <li class="nav-item" :class="{'active': routeName === routeNames.dashboard}">
            <router-link :to="{name: routeNames.dashboard}" class="nav-link">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </router-link>
        </li> -->

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Operations
        </div>

        <!-- Nav Item - Charts -->
        <li class="nav-item"
            :class="{ 'active': routeName === routeNames.dispatch || routeName === routeNames.dispatchForm }">
            <router-link :to="{ name: routeNames.dispatch }" class="nav-link">
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

        <li class="nav-item" :class="{ 'active': routeName === routeNames.users }">
            <router-link :to="{ name: routeNames.users }" class="nav-link">
                <i class="fas fa-fw fa-users"></i>
                <span>Personnel</span>
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
            :class="{ 'active': routeName === routeNames.emergencies || routeName === routeNames.emergenciesForm }">
            <router-link :to="{ name: routeNames.emergencies }" class="nav-link">
                <i class="fas fa-fw fa-exclamation-triangle"></i>
                <span>Nature of Incident</span>
            </router-link>
        </li>

        <li class="nav-item"
            :class="{ 'active': routeName === routeNames.trainingSkills || routeName === routeNames.trainingSkillsForm }">
            <router-link :to="{ name: routeNames.trainingSkills }" class="nav-link">
                <i class="fas fa-fw fa-medal"></i>
                <span>Training</span>
            </router-link>
        </li>

        <li class="nav-item"
            :class="{ 'active': routeName === routeNames.location || routeName === routeNames.locationForm }">
            <router-link :to="{ name: routeNames.location }" class="nav-link">
                <i class="fas fa-fw fa-map"></i>
                <span>Location</span>
            </router-link>
        </li>

        <!-- Divider -->
        <!-- <hr class="sidebar-divider"> -->

        <!-- Heading -->
        <!-- <div class="sidebar-heading">
            Organizations
        </div> -->

        <li class="nav-item" :class="{
                        'active': routeName === routeNames.inventoryItem ||
                            routeName === routeNames.inventoryItemCategory ||
                            routeName === routeNames.inventoryItemStockMovement
                    }">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseInventory"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-box"></i>
                <span>Inventory</span>
            </a>
            <div id="collapseInventory" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link :to="{ name: routeNames.inventoryItem }" class="collapse-item"
                        :class="{ 'text-primary': routeName === routeNames.inventoryItem }">
                        <i class="fas fa-fw fa-tag"></i>
                        <span class="ml-2">Item</span>
                    </router-link>
                    <router-link :to="{ name: routeNames.inventoryItemCategory }" class="collapse-item"
                        :class="{ 'text-primary': routeName === routeNames.inventoryItemCategory }">
                        <i class="fas fa-fw fa-list"></i>
                        <span class="ml-2">Category</span>
                    </router-link>
                </div>
            </div>
        </li>

        <li class="nav-item" :class="{
                        'active': routeName === routeNames.nationalAgencies || routeName === routeNames.nationalAgenciesForm ||
                            routeName === routeNames.csos || routeName === routeNames.csosForm ||
                            routeName === routeNames.pos || routeName === routeNames.posForm ||
                            routeName === routeNames.barts || routeName === routeNames.bartsForm
                    }">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOrg"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-building"></i>
                <span>Organization</span>
            </a>
            <div id="collapseOrg" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <router-link :to="{ name: routeNames.nationalAgencies }" class="collapse-item"
                        :class="{ 'text-primary': routeName === routeNames.nationalAgencies || routeName === routeNames.nationalAgenciesForm }">
                        <i class="fas fa-fw fa-building"></i>
                        <span class="ml-2">National Agency</span>
                    </router-link>
                    <router-link :to="{ name: routeNames.csos }" style="text-decoration: none;" class="collapse-item"
                        :class="{ 'text-primary': routeName === routeNames.csos || routeName === routeNames.csosForm }">
                        <i class="fas fa-fw fa-hands-helping"></i>
                        <span class="ml-2">CSO</span>
                    </router-link>
                    <router-link :to="{ name: routeNames.pos }" style="text-decoration: none;" class="collapse-item"
                        :class="{ 'text-primary': routeName === routeNames.pos || routeName === routeNames.posForm }">
                        <i class="fas fa-fw fa-users"></i>
                        <span class="ml-2">PO</span>
                    </router-link>
                    <router-link :to="{ name: routeNames.barts }" style="text-decoration: none;" class="collapse-item"
                        :class="{ 'text-primary': routeName === routeNames.barts || routeName === routeNames.bartsForm }">
                        <i class="fas fa-fw fa-home"></i>
                        <span class="ml-2">BART</span>
                    </router-link>
                </div>
            </div>
        </li>

        <!-- <li class="nav-item" :class="{'active': routeName === routeNames.nationalAgencies || routeName === routeNames.nationalAgenciesForm}">
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
        </li> -->

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Reports
        </div>


        <li class="nav-item" :class="{ 'active': routeName === routeNames.incidentReport }">
            <router-link :to="{ name: routeNames.incidentReport }" class="nav-link">
                <i class="fas fa-file-alt"></i>
                <span>Incident Report</span>
            </router-link>
        </li>


        <div class="sidebar-card d-none d-lg-flex flex-column align-items-center mt-auto">
            <img class="sidebar-card-illustration mb-2" :src="config.baseUrl + 'images/cdrrmo-v1/cdrrmo-logo.png'"
                style="height: 8rem;">
        </div>

        <!-- <li class="nav-item" :class="{'active': routeName === routeNames.dispatchReport}">
            <router-link :to="{name: routeNames.dispatchReport}" class="nav-link">
                <i class="fas fa-file-alt"></i>
                <span>Dispatch Report</span>
            </router-link>
        </li> -->

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
import { config } from '../../config'

const route = useRoute();
const routeName = computed(() => route.name)

</script>