
import { defineStore } from 'pinia'
import { IBART } from '../../types'
import { computed, ref } from 'vue';

export const BARTStore = defineStore('BART', () => {
    
    // state
    const _BARTs = ref<IBART[]>([])

    // setters 
    const setBARTs = (BARTs: IBART[]) => {
        _BARTs.value = BARTs 
    }

    // getters 
    
    const BARTs = computed( () => _BARTs.value)

    return {
        BARTs,
        setBARTs,
    }
})




// methods


