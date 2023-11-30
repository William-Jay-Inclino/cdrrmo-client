
import { defineStore } from 'pinia'
import { IUser, userService } from '../user'
import { appService } from '.'
import { computed, ref } from 'vue'
import { IAuthUser } from './entities'

// root store

export const appStore = defineStore('app', () => {
    
    // state

    const _store = 'appStore: '
    const _authUser = ref<IAuthUser>()

    // methods 
    const init = async() => {
      // to be refactored
      // const users = await userService.findAll()
      // setAuthUser(users[0])
    }

    const login = async(payload: {username: string, password: string}): Promise<boolean> => {
      console.log(_store + 'login()', payload)
      const authUser = await appService.login(payload)
      console.log('authUser', authUser)
      if(authUser){
        setAuthUser(authUser)

        return true
      }

      return false
    }

    // getters

    const authUser = computed( (): IAuthUser => _authUser.value!)

    const setAuthUser = (user: IAuthUser) => {
      console.log(_store + 'setAuthUser()', user)
      _authUser.value = user
    } 

    return {
      authUser,
      init,
      login,
    }
})



