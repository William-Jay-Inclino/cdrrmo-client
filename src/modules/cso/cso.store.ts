
import { defineStore } from 'pinia'
import { ICSO } from '../../types/types'
import { computed, ref } from 'vue';
import { CSOService } from '.';

export const CSOStore = defineStore('CSO', () => {
    
    // state
    const _CSOs = ref<ICSO[]>([])

    // setters 
    const setCSOs = (CSOs: ICSO[]) => {
        _CSOs.value = CSOs 
    }

    // getters 
    
    const CSOs = computed( () => _CSOs.value)

    // methods
    const getCSOs = () => {
        return CSOService.getAllCSOs()
    }

    return {
        CSOs,
        setCSOs,
        getCSOs,
    }
})




// methods


