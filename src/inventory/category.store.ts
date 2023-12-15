
import { defineStore } from 'pinia'
import { IItemCategory } from '.'
import { computed, onMounted, ref } from 'vue';
import { itemCategoryService } from '.';

export const categoryStore = defineStore('category', () => {

    const _store = 'categoryStore: '

    const _formDataInitial: IItemCategory = {
        id: '',
        name: '', 
    }

    const _formErrorsInitial = {
        name: false,
    }
    
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})

    // state
    const _categories = ref<IItemCategory[]>([])

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await itemCategoryService.findAll()
        setCategories(items)
    })

    // getters 
    const categories = computed( () => _categories.value)


    // setters 
    const setCategories = (items: IItemCategory[]) => {
        console.log(_store + 'setCategories()', items)
        _categories.value = items
    }

    const setFormData = (payload: {data: IItemCategory}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await itemCategoryService.findOne(id)
        if(itemFound){
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: IItemCategory}): Promise<IItemCategory | null> => {
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

    const onCreate = async(payload: {data: IItemCategory}): Promise<IItemCategory | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await itemCategoryService.create(payload)

        if(created){

            _categories.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: IItemCategory}): Promise<IItemCategory | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await itemCategoryService.update(payload)

        if(updated){

            const indx = _categories.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _categories.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _categories.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await itemCategoryService.remove(id)

        if(deleted){
            _categories.value.splice(indx, 1)
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
        categories,
        formData,
        formErrors,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
    }
})



