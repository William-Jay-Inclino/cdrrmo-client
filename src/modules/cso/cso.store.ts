
import { defineStore } from 'pinia'
import { ICSO } from '../../types'
import { computed, ref } from 'vue';
import { useFakeData } from '../../config';
import { app } from '../app.store';

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


class CSO{

    getAllCSOs() :ICSO[]{
        console.log('getAllCSOs()')
        
        if(useFakeData){
            return app.fakeCSOs
        }

        // get from api TBA 
        return []

    }

}

export const CSOService = new CSO()


// methods


