<template>

    <div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Certificate Image</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- <div v-if="image_url"> -->
                        <!-- {{ image_url }} -->
                        <!-- <img src="http://localhost:5173/api/v1/image/get-image/image.png" class="img-fluid" alt="Responsive image"> -->
                        <img v-if="image_url" :src="config.uploads + image_url" class="img-fluid">
                    <!-- </div> -->
                    <!-- <div v-else class="text-center">
                        No image
                    </div> -->
                </div>
                <!-- <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div> -->
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">

    import { config } from '../../config';

    defineProps<{
        image_url: string
    }>()



</script>