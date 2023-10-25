import { createApp } from 'vue'
import mitt from 'mitt'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import router from './router'



const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter
app.use(router)
app.mount('#app')