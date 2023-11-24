<template>

    <div class="container-fluid">

        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dispatch Module</h1>
            <router-link :to="{name: 'dispatchForm.route'}">
                <button class="btn btn-primary float-end" type="submit">Dispatch a Team</button>
            </router-link>
        </div>
        

        <div class="row pt-5">
            <div class="col-4 d-flex flex-column">
                <Search/>
            </div>
            <div class="col-8 d-flex flex-column">
                <Filter/>
            </div>
        </div>

        <div class="row pt-3">
            <div class="col">
                <div class="form-check form-switch ml-4">
                    <input style="cursor: pointer;" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="$dispatch.flags.expand">
                    <label class="form-check-label" for="flexSwitchCheckChecked">
                        Expand
                    </label>
                </div>
            </div>
        </div>

        <div class="row pt-3">
            <div class="col-4" v-for="dispatchedTeam in $dispatch.dispatchedTeams">
                <InfoCard :dispatched-team="dispatchedTeam"/>
            </div>
        </div>

        <TeamInfoModal :team="$dispatch.teamInfo" :can-manage="false"/>
  </div>

</template>


<script setup lang="ts">
  
    import { dispatchStore } from '.';
    import Search from './components/Search.vue';
    import Filter from './components/Filter.vue';
    import InfoCard from './components/InfoCard.vue'
    import TeamInfoModal from '../team/components/TeamInfoModal.vue';

    const $dispatch = dispatchStore()

    $dispatch.init()



</script>