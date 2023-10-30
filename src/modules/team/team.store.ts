
import { defineStore } from 'pinia'
import { teamService } from './team.service';
import { ITeam } from '../../types';
import { computed, ref } from 'vue';
import { appService } from '../';
import { CONST_TeamStatusText } from '../../helpers/constants';

export const teamStore = defineStore('team', () => {
    
    // state
    const _teams = ref<ITeam[]>([])

    
    // setters 

    const setTeams = (teams: ITeam[]) => {
        _teams.value = teams 
    }

    // getters 

    const teams = computed( () => {
        return _teams.value.map(i => {
            const user = appService.users.find(j => j.user_id === i.team_leader_id)
            if(user){
                i.team_leader = user
            }
            i.statusText = CONST_TeamStatusText[i.status]
            return i
        })
    })

    // methods
    const getTeams = () => {
        return teamService.getAllTeams()
    }
  
    return {
        teams,
        setTeams,
        getTeams,
    }
})



