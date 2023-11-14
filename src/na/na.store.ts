
import { defineStore } from 'pinia'
import { INa } from '.'
import { computed, onMounted, ref } from 'vue';
import { naService } from '.';

export const naStore = defineStore('na', () => {

    const _store = 'naStore: '

    const _formDataInitial: INa = {
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
    const _nas = ref<INa[]>([])

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await naService.findAll()
        setNas(items)
    })

    // getters 
    const nas = computed( () => _nas.value)


    // setters 
    const setNas = (items: INa[]) => {
        console.log(_store + 'setNas()', items)
        _nas.value = items
    }

    const setFormData = (payload: {data: INa}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await naService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: INa}): Promise<INa | null> => {
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

    const onCreate = async(payload: {data: INa}): Promise<INa | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await naService.create(payload)

        if(created){

            _nas.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: INa}): Promise<INa | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await naService.update(payload)

        if(updated){

            const indx = _nas.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _nas.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _nas.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await naService.remove(id)

        if(deleted){
            _nas.value.splice(indx, 1)
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
        nas,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})



