
import { defineStore } from 'pinia'
import { ICSO } from '.'
import { computed, onMounted, ref } from 'vue';
import { csoService } from '.';

export const csoStore = defineStore('cso', () => {

    const _store = 'csoStore: '

    const _formDataInitial: ICSO = {
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
    const _csos = ref<ICSO[]>([])

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await csoService.findAll()
        setCsos(items)
    })

    // getters 
    const csos = computed( () => _csos.value)


    // setters 
    const setCsos = (items: ICSO[]) => {
        console.log(_store + 'setCsos()', items)
        _csos.value = items
    }

    const setFormData = (payload: {data: ICSO}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await csoService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: ICSO}): Promise<ICSO | null> => {
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

    const onCreate = async(payload: {data: ICSO}): Promise<ICSO | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await csoService.create(payload)

        if(created){

            _csos.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: ICSO}): Promise<ICSO | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await csoService.update(payload)

        if(updated){

            const indx = _csos.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _csos.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _csos.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await csoService.remove(id)

        if(deleted){
            _csos.value.splice(indx, 1)
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
        csos,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})



