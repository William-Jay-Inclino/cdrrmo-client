
import { defineStore } from 'pinia'
import { IEmergency } from '.'
import { computed, onMounted, ref } from 'vue';
import { emergencyService } from '.';

export const emergencyStore = defineStore('emergency', () => {

    const _store = 'emergencyStore: '

    const _formDataInitial: IEmergency = {
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
    const _emergencies = ref<IEmergency[]>([])

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await emergencyService.findAll()
        setEmergencies(items)
    })

    // getters 
    const emergencies = computed( () => _emergencies.value)


    // setters 
    const setEmergencies = (items: IEmergency[]) => {
        console.log(_store + 'setEmergencies()', items)
        _emergencies.value = items
    }

    const setFormData = (payload: {data: IEmergency}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await emergencyService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: IEmergency}): Promise<IEmergency | null> => {
        console.log(_store + 'onSubmit()', payload)

        if(payload.data.name.trim() === ''){ 
            formErrors.value.name = true 
        }
        else{ 
            formErrors.value.name = false  
        }

        // if(payload.data.description.trim() === ''){ 
        //     formErrors.value.description = true 
        // }
        // else{ 
        //     formErrors.value.description = false  
        // }

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

    const onCreate = async(payload: {data: IEmergency}): Promise<IEmergency | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await emergencyService.create(payload)

        if(created){

            _emergencies.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: IEmergency}): Promise<IEmergency | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await emergencyService.update(payload)

        if(updated){

            const indx = _emergencies.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _emergencies.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _emergencies.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await emergencyService.remove(id)

        if(deleted){
            _emergencies.value.splice(indx, 1)
            return true
        }

        return false 

    }

    const resetFormData = () => {
        console.log(_store + 'resetForm()')
        formData.value = {..._formDataInitial}
        formErrors.value = {..._formErrorsInitial}
    }

    return {
        emergencies,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})



