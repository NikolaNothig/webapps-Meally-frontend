import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue3-cookies'
import router from './router'
import store from './store';

createApp(App).use(router).use(VueCookies).use(store).mount('#app')