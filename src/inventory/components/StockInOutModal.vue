<template>

    <div ref="myModal" class="modal fade" id="stockInOutModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header text-white" :class="{'bg-danger': !isStockIn, 'bg-success': isStockIn}">
                    <h5 class="modal-title" id="staticBackdropLabel"> {{ modalTitle }} </h5>
                    <button @click="resetForm()" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="item">
                    <div class="row">
                        <div class="col">
                            <span>Item: <b> {{ item.name }} </b></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <span>Current Quantity: <b> {{ item.quantity }} </b></span>
                        </div>
                    </div>
                    <div class="form-group mt-3">
                        <label>Quantity</label>
                        <input type="number" class="form-control" v-model="quantity">
                        <small class="form-text text-danger" v-if="formErrors.quantity"> {{ errorMsg }} </small>
                        <small class="form-text text-danger" v-if="formErrors.invalidQty"> Invalid Quantity </small>
                    </div>
                    <div class="form-group">
                        <label>Remarks</label>
                        <textarea class="form-control" rows="3" v-model="remarks"></textarea>
                        <small class="form-text text-danger" v-if="formErrors.remarks"> {{ errorMsg }} </small>
                    </div>
                </div>
                <div class="modal-footer justify-content-between">
                    <button @click="resetForm()" ref="cancelButton" class="btn btn-dark" type="button" data-dismiss="modal">Cancel</button>
                    <button @click="onSave()" class="btn btn-success" type="button">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { IItem, MovementTypeEnum, itemService, itemStore } from '..';
    import { useToast } from "vue-toastification";

    const props = defineProps<{
        item: IItem | null
        mode: MovementTypeEnum
    }>()

    const $item = itemStore()
    const toast = useToast();
    const quantity = ref(0)
    const remarks = ref('')
    const errorMsg = ref('This field is required')
    const cancelButton = ref<HTMLButtonElement | null>(null)

    const _formErrorsInitial = {
        quantity: false,
        remarks: false ,
        invalidQty: false,
    }

    const formErrors = ref({..._formErrorsInitial})

    const isStockIn = computed( () => props.mode === MovementTypeEnum.StockIn)

    const modalTitle = computed( () => isStockIn.value ? 'Stock In' : 'Stock Out')

    const onSave = async() => {

        if(!props.item) return 

        console.log('onSave()')

        formErrors.value.quantity = false 
        formErrors.value.remarks = false 
        formErrors.value.invalidQty = false
        

        if(!quantity.value){
            formErrors.value.quantity = true 
        }else if(quantity.value < 0 || !isWholeNumber(quantity.value)){
            formErrors.value.invalidQty = true 
        }else if(props.mode === MovementTypeEnum.StockOut && quantity.value > props.item.quantity){
            formErrors.value.invalidQty = true 
        }

        if(!remarks.value || remarks.value.trim() === ''){
            formErrors.value.remarks = true 
        }

        const hasError = Object.values(formErrors.value).includes(true);

        console.log('hasError', hasError)

        if(hasError){
            return null 
        }

        const data = {
            quantity: quantity.value,
            remarks: remarks.value
        }

        let item: IItem | null = null

        if(props.mode === MovementTypeEnum.StockIn){
            item = await itemService.stockIn({itemId: props.item.id, data})
        }else{
            item = await itemService.stockOut({itemId: props.item.id, data})
        }

        if(item){
            toast.success('Item Quantity successfully updated')
            $item.updateItem(item)
        }else{
            toast.error('Failed to update Item Quantity')
        }

        resetForm()

        console.log('stock out')

    }

    const resetForm = () => {
        console.log('resetForm()')

        if (cancelButton.value && typeof cancelButton.value.click === 'function') {
            cancelButton.value.click()
        }

        quantity.value = 0 
        remarks.value = ''
        formErrors.value = {..._formErrorsInitial}

    }

    const isWholeNumber = (number: number) => {
        // Check if the number is a finite value and if its integer representation is the same as the original.
        return Number.isFinite(number) && number === Math.floor(number);
    }

</script>