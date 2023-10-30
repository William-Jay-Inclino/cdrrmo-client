<template>

    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-for="item in items" class="breadcrumb-item" aria-current="page">
                <router-link to="/teams" class="item" :class="{'text-secondary active-item': item.isActive}">
                    <span>{{ item.text }}</span>
                </router-link>
            </li>
        </ol>
    </nav>

</template>


<script setup lang="ts">

    defineProps<{
        items: {text: string, link: string, isActive: boolean}[]
    }>()
    // items: {text: string, link: string, isActive: boolean}
</script>


<style scoped>

    .active-item{
        pointer-events: none;
    }

    .item{
        text-decoration: none; 
    }

</style>