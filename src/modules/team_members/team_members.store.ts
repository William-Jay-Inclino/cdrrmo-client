
import { defineStore } from 'pinia'
import { teamMemberService } from './team_members.service';
import { ITeamMember } from '../../types';
import { computed, ref } from 'vue';
import { teamService } from '../team';
import { userService } from '../user';

export const teamMemberStore = defineStore('teamMember', () => {
    
    // state
    const _teamMembers = ref<ITeamMember[]>([])
    const _users = userService.getAllUsers()
    const _teams = teamService.getAllTeams()
    const _teamId = ref()

    console.log('_users', _users)
    // setters 

    const setTeamMembers = (teamMembers: ITeamMember[]) => {
        _teamMembers.value = teamMembers 
    }

    const setTeamId = (teamId: string) => {
        console.log('setTeamId()', teamId)
        _teamId.value = teamId
    }

    // getters 

    const team = computed( () => {
        console.log('_teamId', _teamId)
        console.log('_teams', _teams)
        const t = _teams.find(i => i.team_id === _teamId.value)
        if(t){
            return t
        }
    })

    const teamMembers = computed( () => {
        return _teamMembers.value.map(i => {

            const member = _users.find(j => j.user_id === i.member_id)

            if(member){
                i.member = member
            }

            return i
        })
    })

    // methods
    const getTeamMembers = () => {
        return teamMemberService.getAllTeamMembers({teamId: _teamId.value})
    }
  
    return {
        teamMembers,
        team,
        setTeamMembers,
        setTeamId,
        getTeamMembers,
    }
})



