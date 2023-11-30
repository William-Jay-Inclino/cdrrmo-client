
import { defineStore } from 'pinia'
import { IUser, userService } from '../user'
import { computed, ref } from 'vue'

// root store

export const appStore = defineStore('app', () => {
    
    // state

    const _store = 'appStore: '
    const _authUser = ref<IUser>()

    
    // methods 
    const init = async() => {
      // to be refactored
      const users = await userService.findAll()
      setAuthUser(users[0])
    }


    // getters

    const authUser = computed( (): IUser => _authUser.value!)

    const setAuthUser = (user: IUser) => {
      console.log(_store + 'setAuthUser()', user)
      _authUser.value = user
    } 

    return {
      init,
      authUser,
    }
})



