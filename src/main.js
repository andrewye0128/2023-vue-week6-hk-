// import './assets/main.css'
import './assets/scss/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('LoadingRay', Loading)

app.mount('#app')
