<template>

    <div class="input-group">
        <div class="input-group-prepend">
            <button @click="onClickRefresh()" class="btn btn-primary">
                <i class="fas fa-sync"></i>
            </button>
        </div>
        <input @keyup.enter="onClickSearch()" :type="searchFieldType" v-model="searchVal" class="form-control" :placeholder="placeholder" @input="validateInput()">
        <div class="input-group-append">
            <div class="btn-group">
                <button @click="onClickSearch()" type="button" class="btn btn-primary">
                    Search for {{ searchRefObject[searchRef] }}
                </button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only"></span>
                </button>
                <div class="dropdown-menu">
                    <a @click="onChangeRef(SearchFieldEnum.Id)" class="dropdown-item" href="#">ID</a>
                    <a @click="onChangeRef(SearchFieldEnum.Lastname)" class="dropdown-item" href="#">Lastname</a>
                    <a @click="onChangeRef(SearchFieldEnum.Firstname)" class="dropdown-item" href="#">Firstname</a>
                </div>
                </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { SearchFieldEnum, userService, userStore } from '..';
    

    const searchRefObject = {
        [SearchFieldEnum.Id]: 'ID',
        [SearchFieldEnum.Firstname]: 'Firstname',
        [SearchFieldEnum.Lastname]: 'Lastname',
    }

    const $user = userStore()

    const searchRef = ref<SearchFieldEnum>(SearchFieldEnum.Id)
    const searchVal = ref('')

    const onChangeRef = (ref: SearchFieldEnum) => {
        searchVal.value = ''
        searchRef.value = ref
    }

    const placeholder = computed( () => {
        return `Search for ${searchRefObject[searchRef.value]}...`
    })

    const searchFieldType = computed( () => searchRef.value === SearchFieldEnum.Id ? 'number' : 'text')

    const onClickSearch = async() => {
        console.log('onClickSearch()')

        if(searchVal.value === '') return 

        if(searchRef.value !== SearchFieldEnum.Id && searchVal.value.trim() === '') return 

        const {currentPage, totalPages, totalUsers, users} = await userService.findAll({
            page: $user.pagination.currentPage, 
            pageSize: $user.pagination.perPage,
            searchField: searchRef.value,
            searchValue: searchVal.value,
        }) 
        $user.setPagination(currentPage, totalPages, totalUsers)
        $user.setUsers(users)
    }

    const onClickRefresh = async() => {
        console.log('onClickRefresh()')
        const {currentPage, totalPages, totalUsers, users} = await userService.findAll({page: 1, pageSize: $user.pagination.perPage}) 
        $user.setPagination(currentPage, totalPages, totalUsers)
        $user.setUsers(users)
    }

    const validateInput = () => {
        if(searchRef.value === SearchFieldEnum.Id) return 
        searchVal.value = searchVal.value.replace(/[^A-Za-z0-9]/g, '')
    }

</script>