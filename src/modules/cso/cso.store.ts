
import { defineStore } from 'pinia'
import { ICSO } from '../../types'
import { computed, ref } from 'vue';

export const CSOStore = defineStore('CSO', () => {
    
    // state
    const _CSOs = ref<ICSO[]>([])

    // setters 
    const setCSOs = (CSOs: ICSO[]) => {
        _CSOs.value = CSOs 
    }

    // getters 
    
    const CSOs = computed( () => _CSOs.value)

    return {
        CSOs,
        setCSOs,
    }
})




// methods


