
import { defineStore } from 'pinia'
import { IBART, INationalAgency } from '../types'
import { faker } from '@faker-js/faker';
import { computed, ref } from 'vue';
import { useFakeData } from '../config';
import { app } from './app.store';

export const NAStore = defineStore('NA', () => {
    
    // state
    const _NAs = ref<INationalAgency[]>([])

    // setters 
    const setNAs = (NAs: INationalAgency[]) => {
        _NAs.value = NAs 
    }

    // getters 
    
    const NAs = computed( () => _NAs.value)

    return {
        NAs,
        setNAs,
    }
})


class NationalAgency{

    getAllNAs() :INationalAgency[]{
        console.log('getAllNAs()')
        
        if(useFakeData){
            return app.fakeNas
        }

        // get from api TBA 
        return []

    }

}

export const NAService = new NationalAgency()


// methods


