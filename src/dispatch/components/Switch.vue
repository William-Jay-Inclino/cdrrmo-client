<template>
    <div>

        <div class="custom-control custom-switch">
            <input v-model="$dispatch.flags.expand" type="checkbox" class="custom-control-input" id="customSwitch_1">
            <label class="custom-control-label" for="customSwitch_1">Expand</label>
        </div>

        <!-- <div class="form-check form-switch ml-4">
            <input style="cursor: pointer;" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="$dispatch.flags.expand">
            <label class="form-check-label" for="flexSwitchCheckChecked">
                Expand
            </label>
        </div> -->

        <div class="custom-control custom-switch">
            <input v-model="$dispatch.flags.showComplete" type="checkbox" class="custom-control-input" id="customSwitch_2">
            <label class="custom-control-label" for="customSwitch_2">Show Complete</label>
        </div>

        <!-- <div class="form-check form-switch ml-4">
            <input style="cursor: pointer;" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="$dispatch.flags.showComplete">
            <label class="form-check-label" for="flexSwitchCheckChecked">
                Show Complete
            </label>
        </div> -->

    </div>
</template>


<script lang="ts" setup>

    import { dispatchStore } from '..';

    const $dispatch = dispatchStore()
</script>