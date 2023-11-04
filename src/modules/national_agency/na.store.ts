
import { defineStore } from 'pinia'
import { INationalAgency } from '@/types/types'
import { computed, ref } from 'vue';
import { NAService } from '.';

export const NAStore = defineStore('NA', () => {
    
    // state
    const _NAs = ref<INationalAgency[]>([])

    // setters 
    const setNAs = (NAs: INationalAgency[]) => {
        _NAs.value = NAs 
    }

    // getters 
    
    const NAs = computed( () => _NAs.value)

    // methods
    const getNAs = () => {
        return NAService.getAllNAs()
    }

    return {
        NAs,
        setNAs,
        getNAs,
    }
})





// methods


