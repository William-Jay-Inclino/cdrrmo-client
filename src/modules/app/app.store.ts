
import { defineStore } from 'pinia'
import { appService } from './app.service'
import { computed } from 'vue'

// root store

export const appStore = defineStore('app', () => {
    
    // state

    // getters 
    const CSOs = computed( () => appService.csos)
    const NAs = computed( () => appService.nas)
    const BARTs = computed( () => appService.barts)
    const POs = computed( () => appService.pos)
    const users = computed( () => appService.users)
    const teams = computed( () => appService.teams)
    const teamMembers = computed( () => appService.teamMembers)
    const emergencies = computed( () => appService.emergencies)
    
    //methods 
    const init = () => {
        appService.init()
    }

    return {
      init,
      CSOs,
      NAs,
      BARTs,
      POs,
      users,
      teams,
      teamMembers,
      emergencies,
    }
})



