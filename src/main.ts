import { createApp } from 'vue'

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the CSS

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


import { createPinia } from 'pinia'
import EntryPoint from './EntryPoint.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(EntryPoint)

const toastOptions: PluginOptions = {
    // You can set your default options here
};

app.component("v-select", vSelect)

app.use(Toast, toastOptions);


app.use(router)
app.use(pinia)

app.mount('#app')
