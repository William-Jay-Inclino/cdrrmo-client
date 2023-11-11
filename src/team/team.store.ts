
import { defineStore } from 'pinia'
import { ITeam } from './entities';
import { computed, ref } from 'vue';

export const teamStore = defineStore('team', () => {
    
    // state
    const _teams = ref<ITeam[]>([])

    
    // setters 

    const setTeams = (teams: ITeam[]) => {
        _teams.value = teams 
    }

    // getters 

    const teams = computed( () => {

        return _teams.value
        // return _teams.value.map(i => {
        //     const user = appService.users.find(j => j.user_id === i.team_leader_id)
        //     if(user){
        //         i.team_leader = user
        //         i.statusObj = CONST_TeamStatus[i.status]
        //     }
        //     i.statusText = CONST_TeamStatusText[i.status]
        //     return i
        // })
    })
  
    return {
        teams,
        setTeams,
    }
})



