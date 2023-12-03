<template>
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        Show
        <select @change="onChange()" class="form-control ml-1" v-model="$user.pagination.perPage">
          <option v-for="option in [10, 20, 50, 100]" :key="option" :value="option">{{ option }}</option>
        </select>
        <span class="ml-2">items per page</span>
      </div>
    </form>
  </template>

<script setup lang="ts">

    import { userService, userStore } from '..';

    const $user = userStore()
    
    const onChange = async() => {
      console.log('onChange()')
      const {currentPage, totalPages, totalUsers, users} = await userService.findAll({page: $user.pagination.currentPage, pageSize: $user.pagination.perPage}) 
      $user.setPagination(currentPage, totalPages, totalUsers)
      $user.setUsers(users)
    }

</script>