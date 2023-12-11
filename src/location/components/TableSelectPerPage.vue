<template>
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        Show
        <select @change="onChange()" class="form-control ml-1" v-model="$location.pagination.perPage">
          <option v-for="option in [10, 20, 50, 100]" :key="option" :value="option">{{ option }}</option>
        </select>
        <span class="ml-2">items per page</span>
      </div>
    </form>
  </template>

<script setup lang="ts">

    import { locationService, locationStore } from '..';

    const $location = locationStore()
    
    const onChange = async() => {
      console.log('onChange()')
      const {currentPage, totalPages, totalItems, locations} = await locationService.findPerPage({page: $location.pagination.currentPage, pageSize: $location.pagination.perPage}) 
      $location.setPagination(currentPage, totalPages, totalItems)
      $location.setLocations(locations)
    }

</script>