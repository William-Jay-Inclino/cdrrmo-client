
import { defineStore } from 'pinia'
import { ILocation, locationService } from '.'
import { computed, onMounted, ref } from 'vue';

export const locationStore = defineStore('location', () => {

    const _store = 'locationStore: '

    const _formDataInitial: ILocation = {
        id: '',
        name: ''
    }

    const _formErrorsInitial = {
        name: false,
    }
    
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})

    // state
    const _locations = ref<ILocation[]>([])

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await locationService.findAll()
        setLocations(items)
    })

    // getters 
    const locations = computed( () => _locations.value)


    // setters 
    const setLocations = (items: ILocation[]) => {
        console.log(_store + 'setLocations()', items)
        _locations.value = items
    }

    const setFormData = (payload: {data: ILocation}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await locationService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: ILocation}): Promise<ILocation | null> => {
        console.log(_store + 'onSubmit()', payload)

        if(payload.data.name.trim() === ''){ 
            formErrors.value.name = true 
        }
        else{ 
            formErrors.value.name = false  
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

    const onCreate = async(payload: {data: ILocation}): Promise<ILocation | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await locationService.create(payload)

        if(created){

            _locations.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: ILocation}): Promise<ILocation | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await locationService.update(payload)

        if(updated){

            const indx = _locations.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _locations.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _locations.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await locationService.remove(id)

        if(deleted){
            _locations.value.splice(indx, 1)
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
        locations,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})



