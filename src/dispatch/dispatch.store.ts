
import { defineStore } from 'pinia'
import { DispatchStatusEnum, IDispatch, dispatchService } from '.'
import { computed, ref } from 'vue';
import { ICreateDispatchDto, IUpdateDispatchDto } from './dto';
import { IEmergency, emergencyService } from '../emergency';
import { ITeam, TeamStatusEnum, teamService } from '../team';
import { isValidPhoneNumber } from '../common';
import { appStore } from '../app';

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
        time_of_call: '',
    }

    const _formErrorsInitial = {
        emergency: false,
        callerName: false,
        callerNumber: false,
        location: false,
        description: false,
        numPeopleInvolved: false,
        hazard: false,
        team: false,
        timeOfCall: false,

        isInvalidContactNo: false,
    }

    const _flagsInitial = {
        expand: true,
        showComplete: true,
        queue: true,
        ongoing: true,
        returned: true,
    }

    const $app = appStore()

    // state
    const _dispatchedTeams = ref<IDispatch[]>([])
    const formData = ref<ICreateDispatchDto>({..._formDataInitial})
    const formErrors = ref({..._formErrorsInitial})
    const formTeams = ref<ITeam[]>([])

    const flags = ref({..._flagsInitial})
    const _emergencies = ref<IEmergency[]>([])
    const _activeTeams = ref<ITeam[]>([])

    const teamInfo = ref<ITeam | null>(null)

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

    const setTeamInfo = (team: ITeam) => {
        console.log(_store + 'setTeamInfo()', team)
        teamInfo.value = team
    }

    // getters 
    
    const dispatchedTeams = computed( () => {

        // let items: IDispatch[] = []

        // if(flags.value.queue){
        //     items = [...items, ..._dispatchedTeams.value.filter(i => i.status === DispatchStatusEnum.Queue)]
        // }

        // return items

        return _dispatchedTeams.value
    })
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

    const onSubmit = async(payload: {data: ICreateDispatchDto}): Promise<IDispatch[] | null> => {
        console.log(_store + 'onSubmit()', payload)

        formErrors.value.emergency = false 
        formErrors.value.callerName = false 
        formErrors.value.callerNumber = false 
        formErrors.value.location = false 
        formErrors.value.description = false 
        formErrors.value.numPeopleInvolved = false 
        formErrors.value.team = false 
        formErrors.value.isInvalidContactNo = false 
        formErrors.value.timeOfCall = false 
        

        if(!payload.data.emergency_id || payload.data.emergency_id.trim() === ''){ 
            formErrors.value.emergency = true 
        }

        if(payload.data.caller_name.trim() === ''){
            formErrors.value.callerName = true
        }

        if(payload.data.caller_number.trim() === ''){
            formErrors.value.callerNumber = true
        }else{
            if (!isValidPhoneNumber('63' + formData.value.caller_number)) {
                formErrors.value.isInvalidContactNo = true;
            }
        }

        if(payload.data.location.trim() === ''){
            formErrors.value.location = true
        }

        if(payload.data.description.trim() === ''){
            formErrors.value.description = true
        }

        if(payload.data.num_people_involved < 0){
            formErrors.value.numPeopleInvolved = true
        }

        if(formTeams.value.length === 0){
            formErrors.value.team = true
        }

        const pattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

        if(!pattern.test(payload.data.time_of_call)){
            formErrors.value.timeOfCall = true
        }

        const hasError = Object.values(formErrors.value).includes(true);

        if(hasError){
            return null 
        }

        const dispatchedTeams = setPayload(payload.data)

        return await onCreate({data: dispatchedTeams})

    }

    const setPayload = (dispatchedTeam: ICreateDispatchDto): ICreateDispatchDto[] => {
        console.log(_store + 'setPayload()', dispatchedTeam)

        const dispatchedTeamArray: ICreateDispatchDto[] = []

        for(let i of formTeams.value){
            const x = {...dispatchedTeam}
            x.team_id = i.id
            x.dispatcher_id = $app.authUser.id
            dispatchedTeamArray.push(x)
        }

        return dispatchedTeamArray

    }

    const onCreate = async(payload: {data: ICreateDispatchDto[]}): Promise<IDispatch[] | null> => {
        console.log(_store + 'onCreate()', payload)

        const createdDispatches = await dispatchService.create(payload)

        if(createdDispatches && createdDispatches.length > 0){
            _dispatchedTeams.value.unshift(...createdDispatches)
            return createdDispatches
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: IUpdateDispatchDto}): Promise<IDispatch | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await dispatchService.update(payload)

        if(updated){

            const indx = _dispatchedTeams.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _dispatchedTeams.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onUpdateTimeField = async(payload: {id: string, field: string}): Promise<IDispatch | null> => {
        console.log(_store + 'onUpdateTimeField()', payload)

        const updated = await dispatchService.updateTimeField(payload)

        if(updated){

            const indx = _dispatchedTeams.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _dispatchedTeams.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const resetFormData = () => {
        console.log(_store + 'resetFormData()')
        formData.value = {..._formDataInitial}
        formErrors.value = {..._formErrorsInitial}
        formTeams.value = []
        teamInfo.value = null
    }
    

    return {
        dispatchedTeams,
        formData,
        formErrors,
        formTeams,
        flags,
        emergencies,
        activeTeams,
        teamInfo,
        resetFormData,
        init,
        initForm,
        onSubmit,
        onUpdate,
        onUpdateTimeField,
        setTeamInfo,
    }
})






