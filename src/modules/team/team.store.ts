
import { defineStore } from 'pinia'
import { teamService } from './team.service';
import { ITeam } from '../../types';
import { computed, ref } from 'vue';

export const teamStore = defineStore('team', () => {
    
    // state
    const _teams = ref<ITeam[]>([])

    
    // setters 

    const setTeams = (teams: ITeam[]) => {
        _teams.value = teams 
    }

    // getters 

    const teams = computed( () => _teams.value)

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



