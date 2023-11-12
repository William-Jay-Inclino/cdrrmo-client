
import { defineStore } from 'pinia'
import { appService } from './app.service'

// root store

export const appStore = defineStore('app', () => {
    
    // state
    
    //methods 
    const init = () => {
        appService.init()
    }

    return {
      init,
    }
})



