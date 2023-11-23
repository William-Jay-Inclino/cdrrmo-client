
import { defineStore } from 'pinia'
import { DispatchStatusEnum, IDispatch, dispatchService } from '.'
import { computed, ref } from 'vue';
import { ICreateDispatchDto } from './dto/create-dispatch.dto';
import { IEmergency, emergencyService } from '../emergency';
import { ITeam, TeamStatusEnum, teamService } from '../team';


export const dispatchStore = defineStore('dispatch', () => {
    
    const _store = 'dispatchStore: '

    const _formDataInitial: ICreateDispatchDto = {
        dispatcher_id: '',
        emergency_id: '',
        team_id: '',
        caller_name: '',
        caller_number: '',
        location: '',
        description: '',
        num_people_involved: 0,
        hazard: '',
        remarks: '',
        status: DispatchStatusEnum.Queue,
        time_of_call: null,
    }

    const _flagsInitial = {
        expand: true 
    }

    // state
    const _dispatchedTeams = ref<IDispatch[]>([])
    const formData = ref<ICreateDispatchDto>({..._formDataInitial})
    const formTeams = ref<ITeam[]>([])

    const flags = ref({..._flagsInitial})
    const _emergencies = ref<IEmergency[]>([])
    const _activeTeams = ref<ITeam[]>([])


    // setters

    const setDispatchTeams = (dispatchedTeams: IDispatch[]) => {
        console.log(_store + 'setDispatchTeams()', dispatchedTeams)
        _dispatchedTeams.value = dispatchedTeams
    }

    const setEmergencies = (emergencies: IEmergency[]) => {
        console.log(_store + 'setEmergencies()', emergencies)
        _emergencies.value = emergencies
    }

    const setActiveTeams = (activeTeams: ITeam[]) => {
        _activeTeams.value = activeTeams
    }

    // getters 
    
    const dispatchedTeams = computed( () => _dispatchedTeams.value)
    const emergencies = computed( () => _emergencies.value)
    const activeTeams = computed( () => {
        return _activeTeams.value.map(i => {
            i.label = i.name
            return i
        })
    })

    // methods 

    const init = async() => {
        setDispatchTeams(await dispatchService.findAll())
    }

    const initForm = async() => {
        console.log('initForm()')
        setActiveTeams(await teamService.findAllActive(TeamStatusEnum.Active))
        setEmergencies(await emergencyService.findAll())
    }

    const resetFormData = () => {
        formData.value = {..._formDataInitial}
    }
    

    return {
        dispatchedTeams,
        formData,
        formTeams,
        flags,
        emergencies,
        activeTeams,
        resetFormData,
        init,
        initForm,
    }
})






