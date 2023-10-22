import { createApp } from 'vue'
import mitt from 'mitt'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter
app.mount('#app')
