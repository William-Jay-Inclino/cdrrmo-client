
import { defineStore } from 'pinia'
import { IEmergency } from '@/types'
import { computed, ref } from 'vue';
import { emergencyService } from '.';

export const emergencyStore = defineStore('emergency', () => {
    
    // state
    const _emergencies = ref<IEmergency[]>([])

    // setters 
    const setEmergencies = (emergencies: IEmergency[]) => {
        _emergencies.value = emergencies
    }

    // getters 
    
    const emergencies = computed( () => _emergencies.value)

    // methods
    const getEmergencies = () => {
        return emergencyService.getAllEmergencies()
    }

    return {
        emergencies,
        setEmergencies,
        getEmergencies,
    }
})





// methods


