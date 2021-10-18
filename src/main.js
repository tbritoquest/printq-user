import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import store from '@/store'
// import 'es6-promise/auto'

window._ = require("lodash")

createApp(App).use(router).use(store).mount('#app')
