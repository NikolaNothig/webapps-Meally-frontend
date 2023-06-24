<template>
  <div id="home" class="row">
    <div v-for="recipe in recipes" :key="recipe._id" class="col-lg-4">
      <router-link :to="`/recipe/${recipe._id}`">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Created by: {{ recipe.createdBy.username }}</h6>
            <p class="card-text">
              Ingredients:
              <span v-for="(ingredient, index) in recipe.ingredients.slice(0, 5)" :key="index">
                {{ ingredient }}<span v-if="index < recipe.ingredients.length - 1">, </span>
              </span>
              <span v-if="recipe.ingredients.length > 5">...</span>
            </p>
            <div class="d-flex justify-content-between">
              <div>Rating: {{ averageRating(recipe.ratings) }}</div>
              <div>Difficulty: {{ averageDifficulty(recipe.ratings) }}</div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { watch } from 'vue';

export default {
  setup() {
    const isLoggedIn = ref(!!localStorage.getItem('loginToken'))
    const recipes = ref([])
    const searchInput = ref('')
    const route = useRoute();
    const fetchRecipes = async () => {
      let url = 'http://localhost:3000/recipes';
      if (route.query.search) {
        url += `/search?ingredients=${route.query.search}`;
      }
      const response = await fetch(url);
      recipes.value = await response.json();
    };

    watch(() => route.query.search, async (search) => {
      const response = await fetch(`http://localhost:3000/recipes/search?ingredients=${search}`);
      recipes.value = await response.json();
    }, { immediate: true });

    watchEffect(() => {
      isLoggedIn.value = !!localStorage.getItem('loginToken')
    })
    watchEffect(() => {
      fetchRecipes();
    }, { immediate: true });
    onMounted(fetchRecipes);

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

    const allIngredients = ref([])

    return {
      isLoggedIn,
      recipes,
      searchInput,
      logout,
      allIngredients
    }
  },

  async mounted() {
    const response = await fetch('http://localhost:3000/recipes');
    this.recipes = await response.json();

    this.allIngredients = [...new Set(this.recipes.flatMap(recipe => recipe.ingredients))];
  },

  methods: {
    averageRating(ratings) {
      if (ratings.length === 0) {
        return 'No ratings yet';
      }
      let total = 0;
      for (let rating of ratings) {
        total += rating.rating;
      }
      return (total / ratings.length).toFixed(1);
    },
    averageDifficulty(ratings) {
      if (ratings.length === 0) {
        return 'No difficulties yet';
      }
      let total = 0;
      for (let rating of ratings) {
        total += rating.difficulty;
      }
      return (total / ratings.length).toFixed(1);
    },
    async search() {
      const response = await fetch(`http://localhost:3000/recipes/search?ingredients=${this.searchInput}`);
      this.recipes = await response.json();
    },
  },
}
</script>