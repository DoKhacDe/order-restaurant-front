import  { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store'
import ApiService from './common/api.service'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/tailwind.css'
import './assets/main.scss'
import Toaster from '@meforma/vue-toaster';
import './plugins/validate'

ApiService.init();
const app = createApp(App)
app.use(store)
app.use(router)
app.use(Toaster)

app.use(VueAxios,axios)
app.mount('#app')
