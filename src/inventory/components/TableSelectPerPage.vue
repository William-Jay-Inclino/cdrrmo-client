<template>
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        Show
        <select @change="onChange()" class="form-control ml-1" v-model="$item.pagination.perPage">
          <option v-for="option in [10, 20, 50, 100]" :key="option" :value="option">{{ option }}</option>
        </select>
        <span class="ml-2">items per page</span>
      </div>
    </form>
  </template>

<script setup lang="ts">

    import { itemService, itemStore } from '..';

    const $item = itemStore()
    
    const onChange = async() => {
      console.log('onChange()')
      const {currentPage, totalPages, totalItems, items} = await itemService.findAll({page: $item.pagination.currentPage, pageSize: $item.pagination.perPage}) 
      $item.setPagination(currentPage, totalPages, totalItems)
      $item.setItems(items)
    }

</script>