
import { defineStore } from 'pinia'
import { DispatchStatusEnum, IDispatch, SearchRefEnum, dispatchService } from '.'
import { computed, ref } from 'vue';
import { ICreateDispatchDto, IUpdateDispatchDto } from './dto';
import { IEmergency, emergencyService } from '../emergency';
import { ITeam, teamService } from '../team';
// import { isValidPhoneNumber } from '../common';
import { authService, authStore } from '../auth';
import { IUser, userService } from '../user';
import { ILocation, locationService } from '../location';

export const dispatchStore = defineStore('dispatch', () => {

    const _store = 'dispatchStore: '

    const _formDataInitial: ICreateDispatchDto = {
        dispatcher_id: '',
        emergency_id: '',
        team_id: '',
        caller_name: '',
        caller_number: '',
        location: null,
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
        isInitialized: false,
        expand: true,
        showComplete: false,
        queue: true,
        ongoing: true,
        returned: true,
    }

    const $auth = authStore()

    // state
    const _dispatchedTeams = ref<IDispatch[]>([])
    const _emergencies = ref<IEmergency[]>([])
    const _activeTeams = ref<ITeam[]>([])
    const _dispatchers = ref<IUser[]>([])
    const _locations = ref<ILocation[]>()

    const formData = ref<ICreateDispatchDto>({ ..._formDataInitial })
    const formErrors = ref({ ..._formErrorsInitial })
    const formTeams = ref<ITeam[]>([])
    const flags = ref({ ..._flagsInitial })
    const teamInfo = ref<ITeam | null>(null)
    const searchQuery = ref('')
    const searchReference = ref<SearchRefEnum>(SearchRefEnum.Team)
    // setters

    const setDispatchTeams = (dispatchedTeams: IDispatch[]) => {
        console.log(_store + 'setDispatchTeams()', dispatchedTeams)
        _dispatchedTeams.value = dispatchedTeams
    }

    const setDispatchers = (dispatchers: IUser[]) => {
        console.log(_store + 'setDispatchers()', dispatchers)
        _dispatchers.value = dispatchers
    }

    const setEmergencies = (emergencies: IEmergency[]) => {
        console.log(_store + 'setEmergencies()', emergencies)
        _emergencies.value = emergencies
    }

    const setLocations = (locations: ILocation[]) => {
        console.log(_store + 'setLocations()', locations)
        _locations.value = locations
    }

    const setActiveTeams = (activeTeams: ITeam[]) => {
        _activeTeams.value = activeTeams
    }

    const setTeamInfo = (team: ITeam) => {
        console.log(_store + 'setTeamInfo()', team)
        teamInfo.value = team
    }

    // getters 

    const dispatchedTeams = computed(() => {

        let items: IDispatch[] = []

        if (flags.value.queue) {
            items = [...items, ..._dispatchedTeams.value.filter(i => i.status === DispatchStatusEnum.Queue)]
        }

        if (flags.value.ongoing) {
            items = [...items, ..._dispatchedTeams.value.filter(i => {
                if (
                    i.status === DispatchStatusEnum.ProceedingScene ||
                    i.status === DispatchStatusEnum.ArrivedScene ||
                    i.status === DispatchStatusEnum.ProceedingHospital ||
                    i.status === DispatchStatusEnum.ArrivedHospital ||
                    i.status === DispatchStatusEnum.ProceedingBase
                ) {
                    return i
                }
            })]
        }

        if (flags.value.returned) {
            items = [...items, ..._dispatchedTeams.value.filter(i => i.status === DispatchStatusEnum.ArrivedBase)]
        }

        items = items.map(i => {
            i.isExpanded = flags.value.expand
            return i
        })

        if (searchReference.value === SearchRefEnum.Team) {
            items = items.filter(i => i.team.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
        }
        else if (searchReference.value === SearchRefEnum.Dispatcher) {
            items = items.filter(i => (i.dispatcher.last_name + ', ' + i.dispatcher.first_name).toLowerCase().includes(searchQuery.value.toLowerCase()))
        }
        else if (searchReference.value === SearchRefEnum.Emergency) {
            items = items.filter(i => i.emergency.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
        }

        else if (searchReference.value === SearchRefEnum.Location) {
            items = items.filter(i => i.location.toLowerCase().includes(searchQuery.value.toLowerCase()))
        }

        else if (searchReference.value === SearchRefEnum.CallerName) {
            items = items.filter(i => i.caller_name.toLowerCase().includes(searchQuery.value.toLowerCase()))
        }

        else if (searchReference.value === SearchRefEnum.CallerNumber) {
            items = items.filter(i => i.caller_number.toLowerCase().includes(searchQuery.value.toLowerCase()))
        }

        else if (searchReference.value === SearchRefEnum.Description) {
            items = items.filter(i => i.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
        }


        return items
    })
    const emergencies = computed(() => _emergencies.value)
    const locations = computed(() => _locations.value)
    const activeTeams = computed(() => {
        return _activeTeams.value.map(i => {
            i.label = i.name
            return i
        })
    })
    const dispatchers = computed(() => {
        return _dispatchers.value.map(i => {
            i.label = i.first_name + ' ' + i.last_name
            return i
        })
    })

    // methods 

    const init = async () => {

        console.log(_store + 'init()')

        if (flags.value.isInitialized) {
            return
        }

        setDispatchTeams(await dispatchService.findAll())

        if (authService.isAdmin()) {
            setDispatchers(await userService.findDispatchers())
        }

        flags.value.isInitialized = true

    }

    const initForm = async () => {
        console.log('initForm()')
        setActiveTeams(await teamService.findAllActive())
        setEmergencies(await emergencyService.findAll())
        setLocations(await locationService.findAll())
    }

    const onSubmit = async (payload: { data: ICreateDispatchDto }): Promise<{ is_success: boolean, data: IDispatch[], msg: string } | null> => {
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


        if (!payload.data.emergency_id || payload.data.emergency_id.trim() === '') {
            formErrors.value.emergency = true
        }

        if (payload.data.caller_name.trim() === '') {
            formErrors.value.callerName = true
        }

        if (payload.data.caller_number.trim() === '') {
            formErrors.value.callerNumber = true
        }
        // else {
        //     if (!isValidPhoneNumber('63' + formData.value.caller_number)) {
        //         formErrors.value.isInvalidContactNo = true;
        //     }
        // }

        if (!payload.data.location) {
            formErrors.value.location = true
        }

        if (payload.data.description.trim() === '') {
            formErrors.value.description = true
        }

        if (payload.data.num_people_involved < 0) {
            formErrors.value.numPeopleInvolved = true
        }

        if (formTeams.value.length === 0) {
            formErrors.value.team = true
        }

        const pattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

        if (!pattern.test(payload.data.time_of_call)) {
            formErrors.value.timeOfCall = true
        }

        const hasError = Object.values(formErrors.value).includes(true);

        if (hasError) {
            return null
        }

        const dispatchedTeams = setPayload(payload.data)

        return await onCreate({ data: dispatchedTeams })

    }

    const setPayload = (dispatchedTeam: ICreateDispatchDto): ICreateDispatchDto[] => {
        console.log(_store + 'setPayload()', dispatchedTeam)

        const dispatchedTeamArray: ICreateDispatchDto[] = []

        for (let i of formTeams.value) {
            const x = { ...dispatchedTeam }
            x.team_id = i.id
            x.dispatcher_id = $auth.authUser!.id
            // @ts-ignore
            x.location = x.location?.name
            dispatchedTeamArray.push(x)
        }

        return dispatchedTeamArray

    }

    const onCreate = async (payload: { data: ICreateDispatchDto[] }): Promise<{ is_success: boolean, data: IDispatch[], msg: string } | null> => {
        console.log(_store + 'onCreate()', payload)

        const res = await dispatchService.create(payload)

        if (!res) {
            return null
        }

        if (res.is_success && res.data.length > 0) {
            _dispatchedTeams.value.unshift(...res.data)
        }

        return res
    }

    const onUpdate = async (payload: { id: string, data: IUpdateDispatchDto }): Promise<IDispatch | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await dispatchService.update(payload)

        if (updated) {

            const indx = _dispatchedTeams.value.findIndex(i => i.id === updated.id)

            if (indx !== -1) {
                _dispatchedTeams.value[indx] = { ...updated }
            }

            return updated
        }

        return null
    }

    const onUpdateTimeField = async (payload: { id: string, field: string, dispatcher_id: string }): Promise<IDispatch | null> => {
        console.log(_store + 'onUpdateTimeField()', payload)

        const updated = await dispatchService.updateTimeField(payload)

        if (updated) {

            const indx = _dispatchedTeams.value.findIndex(i => i.id === updated.id)

            if (indx !== -1) {
                _dispatchedTeams.value[indx] = { ...updated }
            }

            return updated
        }

        return null
    }

    const resetFormData = () => {
        console.log(_store + 'resetFormData()')
        formData.value = { ..._formDataInitial }
        formErrors.value = { ..._formErrorsInitial }
        formTeams.value = []
        teamInfo.value = null
    }

    const resetStore = () => {
        console.log(_store + 'resetStore()')
        _dispatchedTeams.value = []
        _emergencies.value = []
        _activeTeams.value = []
        _dispatchers.value = []

        formData.value = { ..._formDataInitial }
        formErrors.value = { ..._formErrorsInitial }
        formTeams.value = []
        flags.value = { ..._flagsInitial }
        teamInfo.value = null
        searchQuery.value = ''
        searchReference.value = SearchRefEnum.Team
    }

    return {
        _dispatchedTeams,
        dispatchedTeams,
        dispatchers,
        formData,
        formErrors,
        formTeams,
        flags,
        emergencies,
        locations,
        activeTeams,
        teamInfo,
        searchQuery,
        searchReference,
        resetFormData,
        init,
        initForm,
        onSubmit,
        onUpdate,
        onUpdateTimeField,
        setTeamInfo,
        resetStore,
        setActiveTeams,
    }
})






