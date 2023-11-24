<template>
    <div class="card shadow mb-4 flex-grow-1">
        <div class="card-header"> Filter </div>
        <div class="card-body d-flex justify-content-center">
            <button class="btn btn-outline-secondary custom-btn">Queue</button>
            <button class="btn btn-outline-danger custom-btn">Ongoing</button>
            <button class="btn btn-outline-success custom-btn">Returned</button>
            <button class="btn btn-outline-warning custom-btn">Cancelled</button>
        </div>
    </div>
</template>

<style>
.custom-btn {
    width: calc(100% - 16px); /* Adjust the margin size as needed */
    margin: 8px; /* Adjust the margin size as needed */
}
</style>

