<template>
    <div class="card shadow mb-4 flex-grow-1">
        <div class="card-header"> Filter </div>
        <div class="card-body d-flex justify-content-center">
            <button class="btn btn-outline-primary custom-btn">Queue</button>
            <button class="btn btn-outline-primary custom-btn">Proceeding to scene</button>
            <button class="btn btn-outline-primary custom-btn">Arrived at scene</button>
            <button class="btn btn-outline-primary custom-btn">Proceeding to hospital</button>
            <button class="btn btn-outline-primary custom-btn">Arrived at hospital</button>
            <button class="btn btn-outline-primary custom-btn">Proceeding to Base</button>
            <button class="btn btn-outline-primary custom-btn">Arrived at Base</button>
        </div>
    </div>
</template>

<style>
.custom-btn {
    width: calc(100% - 16px); /* Adjust the margin size as needed */
    margin: 8px; /* Adjust the margin size as needed */
}
</style>

