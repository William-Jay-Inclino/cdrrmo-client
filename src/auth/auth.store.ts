
import { defineStore } from 'pinia'
import { authService } from '.'
import { computed, onMounted, ref } from 'vue'
import { IAuth, IAuthUser } from './entities'

// root store

export const authStore = defineStore('auth', () => {
    
    // state

    const _store = 'authStore: '
    const _auth = ref<IAuth | null>(null)


    onMounted( () => {
        console.log(_store + 'onMounted')
        const auth = authService.getAuth()
        if(auth){
            setAuth(auth)
        }
    })


    // getters

    const authUser = computed( (): IAuthUser | null => {
        if(_auth.value){
            return _auth.value?.user
        }
        return null
    })

    // setters
    const setAuth = (auth: IAuth) => {
        console.log(_store + 'setAuth()', auth)
        _auth.value = auth
    } 



    // methods 

    const login = async(payload: {username: string, password: string}): Promise<boolean> => {
        console.log(_store + 'login()', payload)
        const auth = await authService.login(payload)
        console.log('auth', auth)
        if(auth){
            setAuth(auth)
            return true
        }

        return false
    }

    const logout = () => {
        console.log(_store + 'logout()')
        localStorage.removeItem('auth')
    }

    return {
      authUser,

      login,
      logout,
      
    }
})



