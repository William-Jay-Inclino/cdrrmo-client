<template>

    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item" :class="{ disabled: $team.pagination.currentPage === 1 }">
            <a class="page-link" @click="changePage($team.pagination.currentPage - 1)" href="#">Previous</a>
        </li>
        <li v-for="page in $team.pagination.totalPages" :key="page" class="page-item" :class="{ active: $team.pagination.currentPage === page }">
            <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: $team.pagination.currentPage === $team.pagination.totalPages }">
            <a class="page-link" @click="changePage($team.pagination.currentPage + 1)" href="#">Next</a>
        </li>
        </ul>
    </nav>

</template>


<script setup lang="ts">

    import { teamService, teamStore } from '..';

    const $team = teamStore()

    const changePage = async(page: number) => {
        console.log('changePage', page)
        const {currentPage, totalPages, totalItems, teams} = await teamService.findAll({page, pageSize: $team.pagination.perPage}) 
        $team.setPagination(currentPage, totalPages, totalItems)
        $team.setTeams(teams)
    }

</script>