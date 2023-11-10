import { createApp } from 'vue'

import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the CSS

import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


import 'bootstrap/dist/css/bootstrap.css';

const pinia = createPinia()
const app = createApp(App)

const toastOptions: PluginOptions = {
    // You can set your default options here
};

  app.use(Toast, toastOptions);


app.use(router)
app.use(pinia)

app.mount('#app')
