<template>

    <div class="input-group">
        <div class="input-group-prepend">
            <button @click="onClickRefresh()" class="btn btn-primary">
                <i class="fas fa-sync"></i>
            </button>
        </div>
        <div v-if="searchRef === SearchFieldEnum.Name">
            <input @keyup.enter="onClickSearch()" type="text" v-model="searchVal" class="form-control"
                :placeholder="placeholder" @input="validateInput()">
        </div>
        <div v-else>
            <v-select @option:selected="onChangeCategory()" :options="$category.categories" v-model="selectedCategory" label="name"></v-select>
        </div>
        <div class="input-group-append">
            <div class="btn-group">
                <button @click="onClickSearch()" type="button" class="btn btn-primary">
                    Search for {{ searchRefObject[searchRef] }}
                </button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only"></span>
                </button>
                <div class="dropdown-menu">
                    <a @click="onChangeRef(SearchFieldEnum.Name)" class="dropdown-item" href="#">Name</a>
                    <a @click="onChangeRef(SearchFieldEnum.Category)" class="dropdown-item" href="#">Category</a>
                    <!-- <a @click="onChangeRef(SearchFieldEnum.SerialNumber)" class="dropdown-item" href="#">Serial Number</a> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { SearchFieldEnum, itemService, itemStore, categoryStore, IItemCategory } from '..';


const searchRefObject = {
    [SearchFieldEnum.Name]: 'Name',
    [SearchFieldEnum.Category]: 'Category',
    // [SearchFieldEnum.SerialNumber]: 'Serial Number',
}

const $item = itemStore()
const $category = categoryStore()

const searchRef = ref<SearchFieldEnum>(SearchFieldEnum.Name)
const searchVal = ref('')
const selectedCategory = ref<IItemCategory | null>(null)

const onChangeRef = (ref: SearchFieldEnum) => {
    searchVal.value = ''
    searchRef.value = ref
}

const placeholder = computed(() => {
    return `Search for ${searchRefObject[searchRef.value]}...`
})

const onChangeCategory = () => {

    console.log('onChangeCategory()');

    if(!selectedCategory.value) return 

    searchVal.value = selectedCategory.value.id

}

const onClickSearch = async () => {
    console.log('onClickSearch()')

    if (searchVal.value === '') return

    if (searchVal.value.trim() === '') return

    const { currentPage, totalPages, totalItems, items } = await itemService.findAll({
        page: $item.pagination.currentPage,
        pageSize: $item.pagination.perPage,
        searchField: searchRef.value,
        searchValue: searchVal.value,
    })
    $item.setPagination(currentPage, totalPages, totalItems)
    $item.setItems(items)
}

const onClickRefresh = async () => {
    console.log('onClickRefresh()')
    const { currentPage, totalPages, totalItems, items } = await itemService.findAll({ page: 1, pageSize: $item.pagination.perPage })
    $item.setPagination(currentPage, totalPages, totalItems)
    $item.setItems(items)
}

const validateInput = () => {
    searchVal.value = searchVal.value.replace(/[^A-Za-z0-9 ]/g, '');
}

</script>