
import { defineStore } from 'pinia'
import { IBART } from '../../types'
import { computed, ref } from 'vue';
import { useFakeData } from '../../config';
import { app } from '../app.store';

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


class BART{

    getAllBARTs() :IBART[]{
        console.log('getAllBARTs()')
        
        if(useFakeData){
            return app.fakeBarts
        }

        // get from api TBA 
        return []

    }

}

export const BARTService = new BART()


// methods


