<template>
    <div class="card shadow mb-4">
        <div class="card-header"> Filter </div>
        <div class="card-body justify-content-center">
            <div class="row">
                <div class="col">
                    <button @click="toggleQueue()" class="btn btn-block" :class="{'btn-outline-secondary': !$dispatch.flags.queue, 'btn-secondary': $dispatch.flags.queue}">
                        Queue
                    </button>
                </div>
                <div class="col">
                    <button @click="toggleOngoing()" class="btn btn-block" :class="{'btn-outline-danger': !$dispatch.flags.ongoing, 'btn-danger': $dispatch.flags.ongoing}">
                        Ongoing
                    </button>
                </div>
                <div class="col">
                    <button @click="toggleReturned()" class="btn btn-block" :class="{'btn-outline-success': !$dispatch.flags.returned, 'btn-success': $dispatch.flags.returned}">
                        Returned
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import { dispatchStore } from '..';

const $dispatch = dispatchStore()

const toggleQueue = () => $dispatch.flags.queue = !$dispatch.flags.queue
const toggleOngoing = () => $dispatch.flags.ongoing = !$dispatch.flags.ongoing
const toggleReturned = () => $dispatch.flags.returned = !$dispatch.flags.returned

</script>

