
import { defineStore } from 'pinia'
import { ITrainingSkill } from '.'
import { computed, ref } from 'vue';

export const trainingSkillStore = defineStore('trainingSkill', () => {
    
    // state
    const _trainingSkills = ref<ITrainingSkill[]>([])

    // setters 
    const setTrainingSkills = (trainingSkills: ITrainingSkill[]) => {
        _trainingSkills.value = trainingSkills
    }

    // getters 
    
    const trainingSkills = computed( () => _trainingSkills.value)

    return {
        trainingSkills,
        setTrainingSkills,
    }
})





// methods


