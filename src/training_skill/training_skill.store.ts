
import { defineStore } from 'pinia'
import { ITrainingSkill } from '.'
import { computed, onMounted, ref } from 'vue';
import { trainingSkillService } from '.';

export const trainingSkillStore = defineStore('trainingSkill', () => {

    const _formDataInitial: ITrainingSkill = {
        id: '',
        name: '', 
        description: ''
    }

    const _formErrorsInitial = {
        name: false,
        description: false,
    }
    
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})

    // state
    const _trainingSkills = ref<ITrainingSkill[]>([])

    onMounted( async() => {
        console.log('trainingSkillStore: onMounted()')
        const trainings = await trainingSkillService.getAllTrainingSkills()
        setTrainingSkills(trainings)
    })

    // getters 
    const trainingSkills = computed( () => _trainingSkills.value)


    // setters 
    const setTrainingSkills = (trainingSkills: ITrainingSkill[]) => {
        console.log('trainingSkillStore: setTrainingSkills()', trainingSkills)
        _trainingSkills.value = trainingSkills
    }

    const setFormData = (payload: {data: ITrainingSkill}) => {
        console.log('trainingSkillStore: setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log('trainingSkillStore: initUpdateFormData()', id)
        const trainingSkill = await trainingSkillService.getTrainingSkillById(id)
        if(trainingSkill){
            setFormData({data: trainingSkill})
        }
    }

    const onSubmit = async(payload: {data: ITrainingSkill}): Promise<ITrainingSkill | null> => {
        console.log('store: onSubmit()', payload)

        if(payload.data.name.trim() === ''){ 
            formErrors.value.name = true 
        }
        else{ 
            formErrors.value.name = false  
        }

        if(payload.data.description.trim() === ''){ 
            formErrors.value.description = true 
        }
        else{ 
            formErrors.value.description = false  
        }

        const hasError = Object.values(formErrors.value).includes(true);

        console.log('hasError', hasError)

        if(hasError){
            return null 
        }

        if(payload.data.id && payload.data.id.trim() !== ''){
            return await onUpdate({id: payload.data.id, data: payload.data})
        }
        // create
        else{
            return await onCreate(payload)
        }

    }

    const onCreate = async(payload: {data: ITrainingSkill}): Promise<ITrainingSkill | null> => {
        console.log('store: onCreate()', payload)

        const created = await trainingSkillService.create(payload)

        if(created){

            _trainingSkills.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: ITrainingSkill}): Promise<ITrainingSkill | null> => {
        console.log('store: onUpdate()', payload)

        const updated = await trainingSkillService.update(payload)

        if(updated){

            const indx = _trainingSkills.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _trainingSkills.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log('store: onDelete()', id)

        const indx = _trainingSkills.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await trainingSkillService.deleteItem(id)

        if(deleted){
            _trainingSkills.value.splice(indx, 1)
            return true
        }

        return false 

    }

    const resetFormData = () => {
        console.log('store: resetForm()')
        formData.value = {..._formDataInitial}
        formErrors.value = {..._formErrorsInitial}
    }

    return {
        trainingSkills,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})





// methods


