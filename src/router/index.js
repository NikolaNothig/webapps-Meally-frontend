import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import MainPage from '../components/MainPage.vue';
import CreateRecipe from '../components/CreateRecipe';
import MyProfile from '../components/MyProfile.vue';
import EditRecipe from '../components/EditRecipe.vue'


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
  {
    path: '/create',
    name: 'create recipes',
    component: CreateRecipe,
  },
  {
    path: '/edit/:id',
    name: 'EditRecipe',
    component: EditRecipe,
    props: true
  },
  
  {
    path: '/profile',
    name: 'Profile',
    component: MyProfile
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router