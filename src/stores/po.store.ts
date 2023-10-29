
import { defineStore } from 'pinia'
import { IPO } from '../types'
import { faker } from '@faker-js/faker';
import { computed, ref } from 'vue';
import { useFakeData } from '../config';
import { app } from './app.store';

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


class PO{

    getAllPOs() :IPO[]{
        console.log('getAllPOs()')
        
        if(useFakeData){
            return app.fakePOs
        }

        // get from api TBA 
        return []

    }

}

export const POService = new PO()


// methods


