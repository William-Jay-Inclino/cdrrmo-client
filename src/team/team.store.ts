
import { defineStore } from 'pinia'
import { ITeam, ITeamMember, TeamStatusEnum } from '.'
import { computed, ref } from 'vue';
import { teamService } from '.';
import { ICreateTeamDto } from './dto/create-team.dto';
import { IUser, userService } from '../user';
import { IUpdateTeamDto } from './dto/update-team.dto';

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
        name: false,
        status: false,
    }

    const _paginationInitial = {
        currentPage: 0,
        totalPages: 0,
        totalUsers: 0,
        perPage: 10,
    }
    
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})
    const pagination = ref({..._paginationInitial})

    // state
    const _teams = ref<ITeam[]>([])
    const _usersWithoutTeam = ref<IUser[]>([])
    const _orphanTeamLeaders = ref<IUser[]>([])

    // getters 
    const teams = computed( () => {
        return _teams.value.map(i => {
            i.isActivated = (i.status === TeamStatusEnum.Inactive) ? false : true
            return i
        })
    })

    const formIsEditMode = computed( (): boolean => {
        if(formData.value.id && formData.value.id.trim() !== ''){
            return true 
        }
        return false 
    })

    const usersWithoutTeam = computed( (): IUser[] => {
        return _usersWithoutTeam.value.map(user => {
            user.label = getTeamLeaderLabel(user)
            return user
        })
    })

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

    const setUsersWithoutTeam = (users: IUser[]) => {
        console.log(_store + 'setUsersWithouTeam()', users)
        _usersWithoutTeam.value = users
    }

    const setOrphanTeamLeaders = (users: IUser[]) => {
        console.log(_store + 'setOrphanTeamLeaders()', users)
        _orphanTeamLeaders.value = users
    }

    const setPagination = (currentPage: number, totalPages: number, totalUsers: number) => {
        pagination.value.currentPage = currentPage
        pagination.value.totalPages = totalPages
        pagination.value.totalUsers = totalUsers
    }

    // methods

    const init = async() => {
        console.log(_store + 'init()')
        const {currentPage, totalPages, totalItems, teams} = await teamService.findAll({page: 1, pageSize: pagination.value.perPage}) 
        setPagination(currentPage, totalPages, totalItems)
        setTeams(teams)
    }

    const initForm = async(id?: string) => {
        setOrphanTeamLeaders(await userService.findOrphanTeamLeaders())

        if(id){
            const itemFound = await teamService.findOne(id)
            if(itemFound){
                setFormData({data: itemFound})
            }
        }
    }

    const initManageTeam = async() => {
        console.log(_store + 'initManageTeam()')
        const usersWithoutTeam = await userService.findUsersWithoutTeam()
        setUsersWithoutTeam(usersWithoutTeam)
    }

    const onSubmit = async(payload: {data: ICreateTeamDto}): Promise<ITeam | null> => {
        console.log(_store + 'onSubmit()', payload)

        formErrors.value.name = false 
        formErrors.value.teamLeader = false 
        formErrors.value.status = false 


        if(payload.data.name.trim() === ''){ 
            formErrors.value.name = true 
        }

        if(!payload.data.team_leader){ 
            formErrors.value.teamLeader = true 
        }

        if(payload.data.status !== TeamStatusEnum.Active && payload.data.status !== TeamStatusEnum.Inactive){
            formErrors.value.status = true 
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

    const onUpdate = async(payload: {id: string, data: IUpdateTeamDto}): Promise<ITeam | null> => {
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
        return teamLeader.last_name + ', ' + teamLeader.first_name
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

        const memberAdded = await teamService.addTeamMember({data: payload})

        if(memberAdded){

            // also remove the member in _usersWithoutTeam since that member is now assigned in a team
            const indx = _usersWithoutTeam.value.findIndex(i => i.id === memberAdded.member_id)
            if(indx !== -1){
                _usersWithoutTeam.value.splice(indx, 1)
            }

            return memberAdded
        }

        return null

    }

    const onDeleteTeamMember = async(member: ITeamMember): Promise<boolean> => {
        console.log(_store + 'onDeleteTeamMember()', member)

        const deleted = await teamService.removeTeamMember(member.id)

        if(deleted){
            _usersWithoutTeam.value.push(member.member)
            return true
        }

        return false 

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
        formIsEditMode,
        usersWithoutTeam,
        pagination,
        setUsersWithoutTeam,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        setTeams,
        init,
        initForm,
        initManageTeam,
        userIsTeamLead,
        getTeamLeaderLabel,
        getTeam,
        onAddMember,
        onDeleteTeamMember,
        onUpdate,
        setPagination,
    }
})



