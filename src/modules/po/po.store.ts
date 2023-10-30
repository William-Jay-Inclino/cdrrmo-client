
import { defineStore } from 'pinia'
import { IPO } from '../../types'
import { computed, ref } from 'vue';
import { POService } from '.';

export const POStore = defineStore('PO', () => {
    
    // state
    const _POs = ref<IPO[]>([])

    // setters 
    const setPOs = (POs: IPO[]) => {
        _POs.value = POs 
    }

    // getters 
    
    const POs = computed( () => _POs.value)

    // methods
    const getPOs = () => {
        return POService.getAllPOs()
    }

    return {
        POs,
        setPOs,
        getPOs,
    }
})





// methods


