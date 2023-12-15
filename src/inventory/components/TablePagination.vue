<template>

    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item" :class="{ disabled: $item.pagination.currentPage === 1 }">
            <a class="page-link" @click="changePage($item.pagination.currentPage - 1)" href="#">Previous</a>
        </li>
        <li v-for="page in $item.pagination.totalPages" :key="page" class="page-item" :class="{ active: $item.pagination.currentPage === page }">
            <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: $item.pagination.currentPage === $item.pagination.totalPages }">
            <a class="page-link" @click="changePage($item.pagination.currentPage + 1)" href="#">Next</a>
        </li>
        </ul>
    </nav>

</template>


<script setup lang="ts">

    import { itemService, itemStore } from '..';

    const $item = itemStore()

    const changePage = async(page: number) => {
        console.log('changePage', page)
        const {currentPage, totalPages, totalItems, items} = await itemService.findAll({page, pageSize: $item.pagination.perPage}) 
        $item.setPagination(currentPage, totalPages, totalItems)
        $item.setItems(items)
    }

</script>