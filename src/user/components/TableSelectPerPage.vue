<template>
    <form class="form-inline">
      <div class="form-group mx-sm-3 mb-2">
        Show
        <select  class="form-control ml-1" v-model="$user.pagination.perPage">
          <option v-for="option in [10, 20, 50, 100]" :key="option" :value="option">{{ option }}</option>
        </select>
        <span class="ml-2">items per page</span>
      </div>
    </form>
  </template>

<script setup lang="ts">

    import { userStore } from '..';

    const $user = userStore()
    

</script>