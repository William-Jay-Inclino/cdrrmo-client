
import { defineStore } from 'pinia'
import { appService } from './app.service'
import { computed, ref } from 'vue'
import { IUser } from '@/common/types/types'

// root store

export const appStore = defineStore('app', () => {
    
    // state

    // getters 
    const _authUser = ref<IUser | undefined>(appService.getAuthUser())
    const authUser = computed( () => _authUser.value)
    const CSOs = computed( () => appService.csos)
    const NAs = computed( () => appService.nas)
    const BARTs = computed( () => appService.barts)
    const POs = computed( () => appService.pos)
    const users = computed( () => appService.users)
    const teams = computed( () => appService.teams)
    const teamMembers = computed( () => appService.teamMembers)
    const emergencies = computed( () => appService.emergencies)
    const trainingSkills = computed( () => appService.trainingSkills)
    const personnelSkills = computed( () => appService.personnelSkills)
    
    //methods 
    const init = () => {
        appService.init()
    }

    return {
      init,
      authUser,
      CSOs,
      NAs,
      BARTs,
      POs,
      users,
      teams,
      teamMembers,
      emergencies,
	  trainingSkills,
      personnelSkills,
    }
})



