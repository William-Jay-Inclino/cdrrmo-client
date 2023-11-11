
import { defineStore } from 'pinia'
import { IBART } from './entities'
import { computed, ref } from 'vue';
import { BARTService } from '.';

export const BARTStore = defineStore('BART', () => {
    
    // state
    const _BARTs = ref<IBART[]>([])

    // setters 
    const setBARTs = (BARTs: IBART[]) => {
        _BARTs.value = BARTs 
    }

    // getters 
    
    const BARTs = computed( () => _BARTs.value)

    // methods
    const getBARTs = () => {
        return BARTService.getAllBARTs()
    }

    return {
        BARTs,
        setBARTs,
        getBARTs,
    }
})




// methods


