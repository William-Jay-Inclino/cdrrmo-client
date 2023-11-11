
import { defineStore } from 'pinia'
import { INa } from './entities'
import { computed, ref } from 'vue';
import { NAService } from '.';

export const NAStore = defineStore('NA', () => {
    
    // state
    const _NAs = ref<INa[]>([])

    // setters 
    const setNAs = (NAs: INa[]) => {
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


