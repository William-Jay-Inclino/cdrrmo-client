
import { defineStore } from 'pinia'
import { ITeam, ITeamMember, TeamStatusEnum } from '.'
import { computed, onMounted, ref } from 'vue';
import { teamService } from '.';
import { ICreateTeamDto } from './dto/create-team.dto';
import { IUser } from '@/user';

export const teamStore = defineStore('team', () => {

    const _store = 'teamStore: '

    const _formDataInitial: ICreateTeamDto = {
        id: '',
        team_leader: null,
        team_leader_id: '',
        name: '',
        status: TeamStatusEnum.Active
    }

    const _formErrorsInitial = {
        teamLeader: false,
        name: false
    }
    
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})

    // state
    const _teams = ref<ITeam[]>([])

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await teamService.findAll()
        setTeams(items)
    })

    // getters 
    const teams = computed( () => _teams.value)

    // setters 
    const setTeams = (items: ITeam[]) => {
        console.log(_store + 'setTeams()', items)
        _teams.value = items
    }

    const setFormData = (payload: {data: ITeam}) => {
        console.log(_store + 'setFormData()', payload)
        const team = {...payload.data} as ITeam

        team.team_leader['label'] = getTeamLeaderLabel(team.team_leader)
        formData.value.id = team.id
        formData.value.name = team.name
        formData.value.team_leader = team.team_leader
        formData.value.team_leader_id = team.team_leader_id
        formData.value.status = team.status
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await teamService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: ICreateTeamDto}): Promise<ITeam | null> => {
        console.log(_store + 'onSubmit()', payload)

        formErrors.value.name = false 
        formErrors.value.teamLeader = false 


        if(payload.data.name.trim() === ''){ 
            formErrors.value.name = true 
        }

        if(!payload.data.team_leader){ 
            formErrors.value.teamLeader = true 
        }

        const hasError = Object.values(formErrors.value).includes(true);

        console.log('hasError', hasError)

        if(hasError){
            return null 
        }

        if(payload.data.id && payload.data.id.trim() !== ''){
            return await onUpdate({id: payload.data.id, data: payload.data})
        }
        // create
        else{
            return await onCreate(payload)
        }

    }

    const onCreate = async(payload: {data: ICreateTeamDto}): Promise<ITeam | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await teamService.create(payload)

        if(created){

            _teams.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: ICreateTeamDto}): Promise<ITeam | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await teamService.update(payload)

        if(updated){

            const indx = _teams.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _teams.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _teams.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await teamService.remove(id)

        if(deleted){
            _teams.value.splice(indx, 1)
            return true
        }

        return false 

    }

    const userIsTeamLead = (team_leader_id: string): boolean => {
        console.log(_store + 'userIsTeamLead()', team_leader_id)
        const team = _teams.value.find(i => i.team_leader_id === team_leader_id && i.id !== formData.value.id)
        if(team){
            return true 
        }

        return false 
    }

    const getTeamLeaderLabel = (teamLeader: IUser): string => {
        return teamLeader.first_name + ' ' + teamLeader.last_name
    }

    const getTeam = async(teamId: string): Promise<ITeam | null> => {

        console.log(_store + 'getTeam()', teamId)

        const team = await teamService.findOne(teamId)

        if(!team){
            console.error('team not found in db')
            return null
        }

        return team

    }

    const onAddMember = async(payload: {team_id: string, member_id: string}): Promise<ITeamMember | null> => {
        console.log(_store + 'onAddMember()', payload)

        const created = await teamService.addTeamMember({data: payload})

        if(created){
            return created
        }

        return null

    }

    const resetFormData = () => {
        console.log(_store + 'resetForm()')
        formData.value = {..._formDataInitial}
        formErrors.value = {..._formErrorsInitial}
    }

    return {
        teams,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
        userIsTeamLead,
        getTeamLeaderLabel,
        getTeam,
        onAddMember,
    }
})



