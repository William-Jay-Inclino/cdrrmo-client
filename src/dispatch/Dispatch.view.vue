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
            <div class="col-4 d-flex flex-column">
                <Filter/>
            </div>
        </div>

        <div class="row pt-3">
            <div class="col">
                <Switch />
            </div>
        </div>

        <div class="row pt-3">
            <template v-for="dispatchedTeam in $dispatch.dispatchedTeams">
                <div class="col-lg-4 col-md-6 col-sm-12" v-if="$dispatch.flags.showComplete || !dispatchedTeam.is_completed">
                    <InfoCard
                        :dispatched-team="dispatchedTeam"
                        @set-time="setTime"
                        @set-complete="setComplete"
                        @cancel-service="cancelService"
                    />
                </div>
            </template>
        </div>

        <TeamInfoModal :team="$dispatch.teamInfo" :can-manage="false"/>
  </div>

</template>


<script setup lang="ts">
    import { useToast } from "vue-toastification";
    import { IDispatch, dispatchStore } from '.';
    import Search from './components/Search.vue';
    import Filter from './components/Filter.vue';
    import InfoCard from './components/InfoCard.vue'
    import TeamInfoModal from '../team/components/TeamInfoModal.vue';
    import Switch from './components/Switch.vue'

    const $dispatch = dispatchStore()

    $dispatch.init()

    const toast = useToast();

    // these are column fields in table dispatch in database 
    const fields = {
        'Time proceeding to scene': 'time_proceeding_scene',
        'Time arrival at scene': 'time_arrival_scene',
        'Time proceeding to hospital': 'time_proceeding_hospital',
        'Time arrival at hospital': 'time_arrival_hospital',
        'Time proceeding to base': 'time_proceeding_base',
        'Time arrival at base': 'time_arrival_base',
    } as any

    const setTime = async(payload: {dispatchedTeam: IDispatch, field: any}) => {

        console.log('setTime()', payload)

        const field = fields[payload.field]

        const dispatchedTeam = await $dispatch.onUpdateTimeField({id: payload.dispatchedTeam.id,field})

        if(dispatchedTeam){
            toast.success(payload.field + ' successfully recorded!')

        }else{
            toast.error('Failed to update ' + payload.field)
        }

    }
    
    const setComplete = async(payload: {dispatchedTeam: IDispatch}) => {

        console.log('setComplete()', payload)

        const data = {
            is_completed: true
        }

        const dispatchedTeam = await $dispatch.onUpdate({id: payload.dispatchedTeam.id, data})

        if(dispatchedTeam){
            toast.success('Operation completed successfully!')

        }else{
            toast.error('Operation could not be completed!')
        }

    }

    const cancelService = async(payload: {dispatchedTeam: IDispatch}) => {

        console.log('cancelService()', payload)

        const data = {
            is_cancelled: true
        }

        const dispatchedTeam = await $dispatch.onUpdate({id: payload.dispatchedTeam.id, data})

        if(dispatchedTeam){
            toast.success('Operation cancelled successfully!')

        }else{
            toast.error('Operation could not be cancelled!')
        }

    }


</script>