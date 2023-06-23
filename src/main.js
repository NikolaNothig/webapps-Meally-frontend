import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue3-cookies'
import router from './router'

createApp(App).use(router).use(VueCookies).mount('#app')
