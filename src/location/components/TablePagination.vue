<template>

    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item" :class="{ disabled: $location.pagination.currentPage === 1 }">
            <a class="page-link" @click="changePage($location.pagination.currentPage - 1)" href="#">Previous</a>
        </li>
        <li v-for="page in $location.pagination.totalPages" :key="page" class="page-item" :class="{ active: $location.pagination.currentPage === page }">
            <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: $location.pagination.currentPage === $location.pagination.totalPages }">
            <a class="page-link" @click="changePage($location.pagination.currentPage + 1)" href="#">Next</a>
        </li>
        </ul>
    </nav>

</template>


<script setup lang="ts">

    import { locationService, locationStore } from '..';

    const $location = locationStore()

    const changePage = async(page: number) => {
        console.log('changePage', page)
        const {currentPage, totalPages, totalItems, locations} = await locationService.findPerPage({page, pageSize: $location.pagination.perPage}) 
        $location.setPagination(currentPage, totalPages, totalItems)
        $location.setLocations(locations)
    }

</script>