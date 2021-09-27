import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
// // ES6 Modules or TypeScript
// import Swal from 'sweetalert2'

createApp(App).use(router).mount('#app')
