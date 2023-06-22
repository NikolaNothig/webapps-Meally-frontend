import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import MainPage from '../components/MainPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/main',
    name: 'main',
    component: MainPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router