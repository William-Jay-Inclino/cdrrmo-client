
import { defineStore } from 'pinia'
import { IDispatch } from '@/types'
import { computed, ref } from 'vue';

export const dispatchStore = defineStore('dispatch', () => {
    
    // state
    const _dispatchedTeams = ref<IDispatch[]>([])

    // setters 
    const setDispatchedTeams = (dispatchTeams: IDispatch[]) => {
        _dispatchedTeams.value = dispatchTeams
    }

    // getters 
    
    const dispatchedTeams = computed( () => _dispatchedTeams.value)

    return {
        dispatchedTeams,
        setDispatchedTeams,
    }
})





// methods


