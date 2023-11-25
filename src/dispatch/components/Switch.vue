<template>
    <div>

        <div class="form-check form-switch ml-4">
            <input style="cursor: pointer;" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="$dispatch.flags.expand">
            <label class="form-check-label" for="flexSwitchCheckChecked">
                Expand
            </label>
        </div>

        <div class="form-check form-switch ml-4">
            <input style="cursor: pointer;" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="$dispatch.flags.showComplete">
            <label class="form-check-label" for="flexSwitchCheckChecked">
                Show Complete
            </label>
        </div>

    </div>
</template>


<script lang="ts" setup>

    import { dispatchStore } from '..';

    const $dispatch = dispatchStore()
</script>