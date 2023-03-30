import { createApp } from 'vue'
import App from './App.vue'

import '@/common/static/css/index.css'

import pinia from './common/store'

const app = createApp(App)
app.use(pinia)
app.mount('#app')
