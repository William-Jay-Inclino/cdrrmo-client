<template>

    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item" :class="{ disabled: $user.pagination.currentPage === 1 }">
            <a class="page-link" @click="changePage($user.pagination.currentPage - 1)" href="#">Previous</a>
        </li>
        <li v-for="page in $user.pagination.totalPages" :key="page" class="page-item" :class="{ active: $user.pagination.currentPage === page }">
            <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: $user.pagination.currentPage === $user.pagination.totalPages }">
            <a class="page-link" @click="changePage($user.pagination.currentPage + 1)" href="#">Next</a>
        </li>
        </ul>
    </nav>

</template>


<script setup lang="ts">

    import { userService, userStore } from '..';

    const $user = userStore()

    const changePage = async(page: number) => {
        console.log('changePage', page)
        const {currentPage, totalPages, totalUsers, users} = await userService.findAll({page, pageSize: $user.pagination.perPage}) 
        $user.setPagination(currentPage, totalPages, totalUsers)
        $user.setUsers(users)
    }

</script>