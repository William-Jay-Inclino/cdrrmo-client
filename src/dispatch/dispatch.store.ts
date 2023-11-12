
import { defineStore } from 'pinia'
import { DispatchStatusEnum, IDispatch } from '.'
import { computed, ref } from 'vue';
import { appService } from '../app';
import { emergencyService } from '../emergency';
import { teamService } from '../team';
import { dispatchService } from '.';
import { CONST_DispatchStatus } from '../common';
import { userService } from '../user';


export const dispatchStore = defineStore('dispatch', () => {
    
    const authUser = appService.getAuthUser() 
    const emergencies = emergencyService.getAllEmergencies()
    const teams = teamService.getAllTeams()
    const users = userService.getAllUsers()

    const _formDataInitial: IDispatch = {
        dispatch_id: '',
        caller_name: '',
        dispatcher_id: authUser!.user_id,
        caller_number: '',
        location: '',
        emergency_id: (emergencies.length > 0) ? emergencies[0].emergency_id : '',
        description: '',
        medical_description: '',
        num_people_involved: 0,
        hazard: '',
        team_id: (teams.length > 0) ? teams[0].team_id : '',
        time_dispatch: new Date(),
        remarks: '',
        time_proceeding: null,
        time_arrival: null,
        time_proceeding_hospital: null,
        time_arrival_hospital: null,
        status: DispatchStatusEnum.Queue,
    }

    // state
    const _dispatchedTeams = ref<IDispatch[]>([])
    const formData = ref<IDispatch>({..._formDataInitial})

    // getters 
    
    const dispatchedTeams = computed( () => {
        return _dispatchedTeams.value.map(i => {
            i.statusObj = CONST_DispatchStatus[i.status]
            i.emergency = emergencies.find(j => j.emergency_id === i.emergency_id)
            i.team = teams.find(j => j.team_id === i.team_id)
            i.teamLeader = users.find(j => j.user_id === i.team?.team_leader_id)
            i.dispatcher = users.find(j => j.user_id === i.dispatcher_id)
            return i
        })
    })

    // methods 

    // save or update to api (dispatchService)
    const saveDispatch = async(payload: IDispatch): Promise<IDispatch | null> => {
        console.log('saveDispatch()', payload)

        if(payload.dispatch_id.trim() !== ''){
            console.log('update')
            const updatedDispatch = await dispatchService.updateDispatch(payload.dispatch_id, payload)
            console.log('updatedDispatch ', updatedDispatch)
            return updatedDispatch
        }

        const createdDispatch = await dispatchService.createDispatch(payload)
        console.log('createdDispatch', createdDispatch)

        _dispatchedTeams.value.unshift(createdDispatch)

        resetFormData()

        return createdDispatch
    }

    const updateDispatchStatus = (payload: {id: string, status: DispatchStatusEnum}): IDispatch | null => {
        console.log('updateDispatchStatus()', payload)
        const dispatchedTeam = _dispatchedTeams.value.find(i => i.dispatch_id === payload.id)

        if(!dispatchedTeam){
            console.error('dispatchedTeam not found', dispatchedTeam)
            return null
        }

        if(payload.status === DispatchStatusEnum.Dispatched){
            dispatchedTeam.time_proceeding = new Date() 
        }
        else if(payload.status === DispatchStatusEnum.Deck){
            dispatchedTeam.time_arrival = new Date() 
        }

        dispatchedTeam.status = payload.status

        return dispatchedTeam
    }

    const resetFormData = () => {
        formData.value = {..._formDataInitial}
    }

    const onProceedingHospital = (payload: IDispatch) => {
        const dispatchedTeam = _dispatchedTeams.value.find(i => i.dispatch_id === payload.dispatch_id)

        if(!dispatchedTeam){
            console.error('dispatchedTeam not found', dispatchedTeam)
            return null
        }

        dispatchedTeam.time_proceeding_hospital = new Date()
    }

    const onArrivedHospital = (payload: IDispatch) => {
        const dispatchedTeam = _dispatchedTeams.value.find(i => i.dispatch_id === payload.dispatch_id)

        if(!dispatchedTeam){
            console.error('dispatchedTeam not found', dispatchedTeam)
            return null
        }

        dispatchedTeam.time_arrival_hospital = new Date()
    }

    return {
        dispatchedTeams,
        formData,
        emergencies,
        teams,
        saveDispatch,
        resetFormData,
        updateDispatchStatus,
        onProceedingHospital,
        onArrivedHospital,
    }
})





// methods


