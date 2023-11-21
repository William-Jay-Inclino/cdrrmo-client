
import { defineStore } from 'pinia'
import { IPO } from '.'
import { computed, onMounted, ref } from 'vue';
import { poService } from '.';

export const poStore = defineStore('po', () => {

    const _store = 'poStore: '

    const _formDataInitial: IPO = {
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
    const _pos = ref<IPO[]>([])

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await poService.findAll()
        setPos(items)
    })

    // getters 
    const pos = computed( () => _pos.value)


    // setters 
    const setPos = (items: IPO[]) => {
        console.log(_store + 'setPos()', items)
        _pos.value = items
    }

    const setFormData = (payload: {data: IPO}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await poService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: IPO}): Promise<IPO | null> => {
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

    const onCreate = async(payload: {data: IPO}): Promise<IPO | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await poService.create(payload)

        if(created){

            _pos.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: IPO}): Promise<IPO | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await poService.update(payload)

        if(updated){

            const indx = _pos.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _pos.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _pos.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await poService.remove(id)

        if(deleted){
            _pos.value.splice(indx, 1)
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
        pos,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})



