
import { defineStore } from 'pinia'
import { IItem, IItemCategory, itemService } from '.'
import { computed, onMounted, ref } from 'vue';
import { ICreateItemDto } from './dto';
import moment from 'moment';

export const itemStore = defineStore('item', () => {

    const _store = 'itemStore: '

    const _formDataInitial: ICreateItemDto = {
        category_id: '',
        name: '',
        description: '',
        quantity: 0,
        cost: 0,
        date_acquired: '',
        serial_number: '',
    }

    const _formErrorsInitial = {
        category_id: false,
        name: false,
        description: false,
        quantity: false,
        invalidQuantity: false,
        cost: false,
        invalidCost: false,
        date_acquired: false,
        serial_number: false,
    }
    
    const formData = ref({..._formDataInitial});
    const formErrors = ref({..._formErrorsInitial})

    // state
    const _items = ref<IItem[]>([])
    const formCategory = ref<IItemCategory | null>(null)

    onMounted( async() => {
        console.log(_store + 'onMounted()')
        const items = await itemService.findAll()
        setItems(items)
    })

    // getters 
    const items = computed( () => _items.value)

    const formIsEditMode = computed( (): boolean => {
        if(formData.value.id && formData.value.id.trim() !== ''){
            return true 
        }
        return false 
    })

    // setters 
    const setItems = (items: IItem[]) => {
        console.log(_store + 'setItems()', items)
        _items.value = items
    }

    const setFormData = (payload: {data: ICreateItemDto}) => {
        console.log(_store + 'setFormData()', payload)
        formData.value = payload.data
    }

    // methods

    const initUpdateFormData = async(id: string) => {
        console.log(_store + 'initUpdateFormData()', id)
        const itemFound = await itemService.findOne(id)

        if(itemFound){
            itemFound.date_acquired = moment(itemFound.date_acquired).format('YYYY-MM-DD')
            const category = itemFound.Category
            category.label = category.name
            formCategory.value = category
            setFormData({data: itemFound})
        }
    }

    const onSubmit = async(payload: {data: ICreateItemDto}): Promise<IItem | null> => {
        console.log(_store + 'onSubmit()', payload)

        formErrors.value.category_id = false 
        formErrors.value.cost = false 
        formErrors.value.invalidCost = false 
        formErrors.value.date_acquired = false 
        formErrors.value.description = false 
        formErrors.value.name = false 
        formErrors.value.quantity = false 
        formErrors.value.invalidQuantity = false 
        formErrors.value.serial_number = false 

        if(!formCategory.value){ 
            formErrors.value.category_id = true 
        }else{
            payload.data.category_id = formCategory.value.id
        }

        if(!payload.data.cost){
            formErrors.value.cost = true
        }else if(payload.data.cost < 0){
            formErrors.value.invalidCost = true
        }

        if(!payload.data.date_acquired || payload.data.date_acquired.trim() === ''){
            formErrors.value.date_acquired = true
        }

        if(payload.data.description.trim() === ''){
            formErrors.value.description = true
        }

        if(payload.data.name.trim() === ''){
            formErrors.value.name = true
        }

        if(formIsEditMode.value){
            if(!payload.data.quantity){
                formErrors.value.quantity = true
            }else if(payload.data.quantity < 0){
                formErrors.value.invalidQuantity = true
            }
        }

        if(payload.data.serial_number.trim() === ''){
            formErrors.value.serial_number = true
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

    const onCreate = async(payload: {data: ICreateItemDto}): Promise<IItem | null> => {
        console.log(_store + 'onCreate()', payload)

        const created = await itemService.create(payload)

        if(created){

            _items.value.unshift(created)
            return created
        }

        return null
    }

    const onUpdate = async(payload: {id: string, data: ICreateItemDto}): Promise<IItem | null> => {
        console.log(_store + 'onUpdate()', payload)

        const updated = await itemService.update(payload)

        if(updated){

            const indx = _items.value.findIndex(i => i.id === updated.id)

            if(indx !== -1){
                _items.value[indx] = {...updated}
            }
            
            return updated
        }

        return null
    }

    const onDelete = async(id: string): Promise<boolean> => {
        console.log(_store + 'onDelete()', id)

        const indx = _items.value.findIndex(i => i.id === id)

        if(indx === -1){
            console.error('Item not found')
            return false 
        }

        const deleted = await itemService.remove(id)

        if(deleted){
            _items.value.splice(indx, 1)
            return true
        }

        return false 

    }

    const resetFormData = () => {
        console.log(_store + 'resetForm()')
        formData.value = {..._formDataInitial}
        formErrors.value = {..._formErrorsInitial}
        formCategory.value = null
    }

    const updateItem = (item: IItem) => {
        const indx = _items.value.findIndex(i => i.id === item.id)

        if(indx !== -1){
            _items.value[indx] = {...item}
        }
    }

    return {
        items,
        formData,
        formErrors,
        formCategory,
        formIsEditMode,
        onSubmit,
        onDelete,
        resetFormData,
        setFormData,
        initUpdateFormData,
        updateItem,
    }
})



