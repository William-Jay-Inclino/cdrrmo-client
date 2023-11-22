
import { defineStore } from 'pinia'
import { DispatchStatusEnum, IDispatch, dispatchService } from '.'
import { computed, ref } from 'vue';
import { ICreateDispatchDto } from './dto/create-dispatch.dto';


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

    // state
    const _dispatchedTeams = ref<IDispatch[]>([])
    const formData = ref<ICreateDispatchDto>({..._formDataInitial})

    // getters 
    
    const dispatchedTeams = computed( () => _dispatchedTeams.value)

    // methods 

    const init = async() => {
        const dispatchedTeams = await dispatchService.findAll()
        setDispatchTeams(dispatchedTeams)
    }

    const setDispatchTeams = (dispatchedTeams: IDispatch[]) => {
        console.log(_store + 'setDispatchTeams()', dispatchedTeams)
        _dispatchedTeams.value = dispatchedTeams
    }

    const resetFormData = () => {
        formData.value = {..._formDataInitial}
    }

    return {
        dispatchedTeams,
        formData,
        resetFormData,
        init,
    }
})






