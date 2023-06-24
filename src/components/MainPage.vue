<template>
  <div id="home">
    <div v-for="recipe in recipes" :key="recipe._id">
      <h2>{{ recipe.title }}</h2>
      <p>Created by: {{ recipe.createdBy.username }}</p>
    </div>
  </div>
</template>


<script>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
import { watch } from 'vue';

export default {
  setup() {
    const isLoggedIn = ref(!!localStorage.getItem('loginToken'))
    const recipes = ref([])
    const searchInput = ref('')
    const route = useRoute();

    watch(() => route.query.search, async (search) => {
      const response = await fetch(`http://localhost:3000/recipes/search?ingredients=${search}`);
      recipes.value = await response.json();
    }, { immediate: true });
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

    return {
      isLoggedIn,
      recipes,
      searchInput,
      logout,
     
    }
  },

  async mounted() {
    const response = await fetch('http://localhost:3000/recipes');
    this.recipes = await response.json();
  },
  
  methods: {
    async search() {
      const response = await fetch(`http://localhost:3000/recipes/search?ingredients=${this.searchInput}`);
      this.recipes = await response.json();
    },
  },
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
.nav-list {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
}

.nav-item {
  margin-right: 10px;
}

.auth-item {
  margin-left: auto;
}
</style>