
import { defineStore } from 'pinia'
import { IEmergency } from '@/types/types'
import { computed, ref } from 'vue';

export const emergencyStore = defineStore('emergency', () => {
    
    // state
    const _emergencies = ref<IEmergency[]>([])

    // setters 
    const setEmergencies = (emergencies: IEmergency[]) => {
        _emergencies.value = emergencies
    }

    // getters 
    
    const emergencies = computed( () => _emergencies.value)

    return {
        emergencies,
        setEmergencies,
    }
})





// methods


