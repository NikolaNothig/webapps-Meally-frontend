<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <div class="d-flex align-items-center">
        <router-link to="/main" class="text text-decoration-none" @click="resetSearch">
          <h1 class="naslov fw-bold">Meally</h1>
        </router-link>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
          class="bi bi-egg-fried icon-margin" viewBox="0 0 16 16">
          <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path
            d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
        </svg>
      </div>
      <button class="navbar-toggler text-danger" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <h1 class="nav-link">
              <router-link v-if="isLoggedIn" to="/profile" class="styled-link">Profile</router-link>
              <span v-else @click="handleProfileClick" class="styled-link clickable">Profile</span>
            </h1>
          </li>
          <li class="nav-item">
            <h1 class="nav-link">
              <router-link v-if="isLoggedIn" to="/create" class="styled-link">Create Recipe</router-link>
              <span v-else @click="handleCreateRecipeClick" class="styled-link clickable">Create Recipe</span>
            </h1>
          </li>
          <li class="nav-item" v-if="route.path === '/main'">
            <form @submit.prevent="submitSearch" class="nav-link">
              <select v-model="searchInput">
                <option disabled value="">Please select an ingredient</option>
                <option v-for="(ingredient, index) in allIngredients" :key="index">{{ ingredient }}</option>
              </select>
              <button type="submit" class="btn btn-primary styled-button">Search</button>
            </form>
          </li>
        </ul>
        <div class="ml-auto">
          <router-link v-if="isLoggedIn" to="/login" @click="logout"
            class="btn btn-primary btn-lg styled-button">Logout</router-link>
          <router-link v-else to="/login" class="btn btn-primary btn-lg styled-button">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const isLoggedIn = ref(!!localStorage.getItem('loginToken'))
    const searchInput = ref('')
    const allIngredients = ref([])
    const route = useRoute();
    const router = useRouter();

    watchEffect(() => {
      isLoggedIn.value = !!localStorage.getItem('loginToken')
    })

    const logout = () => {
      const cookies = document.cookie.split(';');

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        localStorage.removeItem('loginToken');
      }
      isLoggedIn.value = false
    }

    const search = async () => {
      const response = await fetch(`http://localhost:3000/recipes/search?ingredients=${searchInput.value}`);
      const recipes = await response.json();
      console.log(recipes);
    }

    const resetSearch = () => {
      searchInput.value = '';
      router.push({ path: '/main' });
    }

    const submitSearch = () => {
      router.push({ path: '/main', query: { search: searchInput.value } });
    }

    const handleProfileClick = () => {
      if (!isLoggedIn.value) {
        alert("You need to log in first!");
      }
    }

    const handleCreateRecipeClick = () => {
      if (!isLoggedIn.value) {
        alert("You need to log in first!");
      }
    }

    onMounted(async () => {
      const response = await fetch('http://localhost:3000/recipes');
      const recipes = await response.json();
      allIngredients.value = [...new Set(recipes.flatMap(recipe => recipe.ingredients))];
    });

    return {
      isLoggedIn,
      logout,
      searchInput,
      search,
      route,
      submitSearch,
      allIngredients,
      resetSearch,
      handleProfileClick,
      handleCreateRecipeClick,
    }
  }
}
</script>

<style scoped>
.naslov {
  font-size: 50px;
  font-weight: 50;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  color: #ff6f00;
  font-family: 'Brush Script MT';
}

.icon-margin {
  margin-left: 10px;
}

.styled-link {
  text-decoration: none;
  color: orange;
  font-family: 'Brush Script MT';
  font-size: 2em;
}

.styled-button {
  background-color: orange;
  border-color: orange;
  color: white;
  font-family: 'Brush Script MT';
  font-size: 1.2em;
  margin-left: 5px;
}

.clickable {
  cursor: pointer;
}
</style>
