<template>
    <div class="card shadow mb-4 flex-grow-1">
        <div class="card-header"> Search </div>
        <div class="card-body d-flex align-items-center">
            <div class="input-group">
                <input v-model="$dispatch.searchQuery" type="text" class="form-control" aria-label="Text input with dropdown button">
                <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ $dispatch.searchReference }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <a @click="onChangeSearchRef(SearchRefEnum.Team)" class="dropdown-item" href="javascript:void(0)">
                            {{ SearchRefEnum.Team }}
                        </a>
                    </li>
                    <li>
                        <a @click="onChangeSearchRef(SearchRefEnum.Dispatcher)" class="dropdown-item" href="javascript:void(0)">
                            {{ SearchRefEnum.Dispatcher }}
                        </a>
                    </li>
                    <li>
                        <a @click="onChangeSearchRef(SearchRefEnum.Emergency)" class="dropdown-item" href="javascript:void(0)">
                            {{ SearchRefEnum.Emergency }}
                        </a>
                    </li>
                    <li>
                        <a @click="onChangeSearchRef(SearchRefEnum.Location)" class="dropdown-item" href="javascript:void(0)">
                            {{ SearchRefEnum.Location }}
                        </a>
                    </li>
                    <li>
                        <a @click="onChangeSearchRef(SearchRefEnum.CallerName)" class="dropdown-item" href="javascript:void(0)">
                            {{ SearchRefEnum.CallerName }}
                        </a>
                    </li>
                    <li>
                        <a @click="onChangeSearchRef(SearchRefEnum.CallerNumber)" class="dropdown-item" href="javascript:void(0)">
                            {{ SearchRefEnum.CallerNumber }}
                        </a>
                    </li>
                    <li>
                        <a @click="onChangeSearchRef(SearchRefEnum.Description)" class="dropdown-item" href="javascript:void(0)">
                            {{ SearchRefEnum.Description }}
                        </a>
                    </li>
                </ul>
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