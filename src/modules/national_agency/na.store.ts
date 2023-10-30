
import { defineStore } from 'pinia'
import { INationalAgency } from '@/types'
import { computed, ref } from 'vue';

export const NAStore = defineStore('NA', () => {
    
    // state
    const _NAs = ref<INationalAgency[]>([])

    // setters 
    const setNAs = (NAs: INationalAgency[]) => {
        _NAs.value = NAs 
    }

    // getters 
    
    const NAs = computed( () => _NAs.value)

    return {
        NAs,
        setNAs,
    }
})





// methods


