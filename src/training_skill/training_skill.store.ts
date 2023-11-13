
import { defineStore } from 'pinia'
import { ITrainingSkill } from '.'
import { computed, onMounted, ref } from 'vue';
import { trainingSkillService } from '.';

export const trainingSkillStore = defineStore('trainingSkill', () => {
    
    // state
    const _trainingSkills = ref<ITrainingSkill[]>([])

    onMounted( async() => {
        await init()
    })

    const init = async() => {
        const trainings = await trainingSkillService.getAllTrainingSkills()
        setTrainingSkills(trainings)
    }   

    // getters 
    const trainingSkills = computed( () => _trainingSkills.value)


    // setters 
    const setTrainingSkills = (trainingSkills: ITrainingSkill[]) => {
        _trainingSkills.value = trainingSkills
    }

    // methods

    const onRemove = async(id: string): Promise<boolean> => {
        console.log('onDelete()', id)

        const indx = _trainingSkills.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const removed = await trainingSkillService.remove(id)

        if(removed){
            _trainingSkills.value.splice(indx, 1)
            return true
        }

        return false 

    }

    return {
        trainingSkills,
        onRemove,
    }
})





// methods


