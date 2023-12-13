<template>

    <div class="input-group">
        <div class="input-group-prepend">
            <button @click="onClickRefresh()" class="btn btn-primary">
                <i class="fas fa-sync"></i>
            </button>
        </div>
        <input @keyup.enter="onClickSearch()" type="text" v-model="searchVal" class="form-control" :placeholder="placeholder" @input="validateInput()">
        <div class="input-group-append">
            <div class="btn-group">
                <button @click="onClickSearch()" type="button" class="btn btn-primary">
                    Search
                </button>
                <!-- <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only"></span>
                </button>
                <div class="dropdown-menu">
                    <a @click="onChangeRef(SearchFieldEnum.Name)" class="dropdown-item" href="#">Name</a>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { SearchFieldEnum, locationService, locationStore } from '..';
    

    const $location = locationStore()

    const searchRef = ref<SearchFieldEnum>(SearchFieldEnum.Name)
    const searchVal = ref('')

    const placeholder = computed( () => {
        return `Search location...`
    })

    const onClickSearch = async() => {
        console.log('onClickSearch()')

        if(searchVal.value === '') return 

        if(searchVal.value.trim() === '') return 

        const {currentPage, totalPages, totalItems, locations} = await locationService.findPerPage({
            page: $location.pagination.currentPage, 
            pageSize: $location.pagination.perPage,
            searchField: searchRef.value,
            searchValue: searchVal.value,
        }) 
        $location.setPagination(currentPage, totalPages, totalItems)
        $location.setLocations(locations)
    }

    const onClickRefresh = async() => {
        console.log('onClickRefresh()')
        const {currentPage, totalPages, totalItems, locations} = await locationService.findPerPage({page: 1, pageSize: $location.pagination.perPage}) 
        $location.setPagination(currentPage, totalPages, totalItems)
        $location.setLocations(locations)
    }

    const validateInput = () => {
        searchVal.value = searchVal.value.replace(/[^A-Za-z0-9 ]/g, '');
    }

</script>