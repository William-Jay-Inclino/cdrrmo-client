
import { defineStore } from 'pinia'
import { IBART } from '.'
import { computed, onMounted, ref } from 'vue';
import { bartService } from '.';

export const bartStore = defineStore('bart', () => {

    const _store = 'bartStore: '

    const _formDataInitial: IBART = {
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
    const _barts = ref<IBART[]>([])

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await bartService.findAll()
        setBarts(items)
    })

    // getters 
    const barts = computed( () => _barts.value)


    // setters 
    const setBarts = (items: IBART[]) => {
        console.log(_store + 'setBarts()', items)
        _barts.value = items
    }

    const setFormData = (payload: {data: IBART}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await bartService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: IBART}): Promise<IBART | null> => {
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

    const onCreate = async(payload: {data: IBART}): Promise<IBART | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await bartService.create(payload)

        if(created){

            _barts.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: IBART}): Promise<IBART | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await bartService.update(payload)

        if(updated){

            const indx = _barts.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _barts.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _barts.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await bartService.remove(id)

        if(deleted){
            _barts.value.splice(indx, 1)
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
        barts,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})



