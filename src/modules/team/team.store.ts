
import { defineStore } from 'pinia'
import { ITeam } from '../../types/types';
import { computed, ref } from 'vue';
import { appService } from '../app';
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
  
    return {
        teams,
        setTeams,
    }
})



