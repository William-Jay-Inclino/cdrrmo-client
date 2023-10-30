
import { defineStore } from 'pinia'
import { IPO } from '../../types'
import { computed, ref } from 'vue';

export const POStore = defineStore('PO', () => {
    
    // state
    const _POs = ref<IPO[]>([])

    // setters 
    const setPOs = (POs: IPO[]) => {
        _POs.value = POs 
    }

    // getters 
    
    const POs = computed( () => _POs.value)

    return {
        _POs,
        setPOs,
    }
})





// methods


