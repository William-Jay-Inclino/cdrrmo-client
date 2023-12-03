<template>
    <div class="card shadow mb-4 flex-grow-1">
        <div class="card-header"> Search </div>
        <div class="card-body d-flex align-items-center">
            <div class="input-group">
                <input v-model="$dispatch.searchQuery" type="text" class="form-control" aria-label="Text input with dropdown button">
                <!-- <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    {{ $dispatch.searchReference }}
                </button> -->
                <div class="input-group-append">

                    <div class="btn-group">
                        <button type="button" class="btn btn-primary">
                            {{ $dispatch.searchReference }}
                        </button>
                        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only"></span>
                        </button>
                        <div class="dropdown-menu">
                            <a @click="onChangeSearchRef(SearchRefEnum.Team)" class="dropdown-item" href="javascript:void(0)">
                                {{ SearchRefEnum.Team }}
                            </a>
                            <a @click="onChangeSearchRef(SearchRefEnum.Dispatcher)" class="dropdown-item" href="javascript:void(0)">
                                {{ SearchRefEnum.Dispatcher }}
                            </a>
                            <a @click="onChangeSearchRef(SearchRefEnum.Emergency)" class="dropdown-item" href="javascript:void(0)">
                                {{ SearchRefEnum.Emergency }}
                            </a>
                            <a @click="onChangeSearchRef(SearchRefEnum.Location)" class="dropdown-item" href="javascript:void(0)">
                                {{ SearchRefEnum.Location }}
                            </a>
                            <a @click="onChangeSearchRef(SearchRefEnum.CallerName)" class="dropdown-item" href="javascript:void(0)">
                                {{ SearchRefEnum.CallerName }}
                            </a>
                            <a @click="onChangeSearchRef(SearchRefEnum.CallerNumber)" class="dropdown-item" href="javascript:void(0)">
                                {{ SearchRefEnum.CallerNumber }}
                            </a>
                            <a @click="onChangeSearchRef(SearchRefEnum.Description)" class="dropdown-item" href="javascript:void(0)">
                                {{ SearchRefEnum.Description }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { dispatchStore, SearchRefEnum } from '..';

    const $dispatch = dispatchStore()

    const onChangeSearchRef = (searchRef: SearchRefEnum) => {
        $dispatch.searchReference = searchRef
    }

</script>