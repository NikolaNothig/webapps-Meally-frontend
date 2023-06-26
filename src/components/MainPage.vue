<template>
  <div id="home" class="row mt-4">
    <div v-for="recipe in recipes" :key="recipe._id" class="col-lg-4">
      <router-link :to="`/recipe/${recipe._id}`" class="link-stretched text-decoration-none text-dark">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title recipe-title">{{ recipe.title }}</h5>
            <img :src="getImageUrl(recipe.image)" class="recipe-image" />
            <h6 class="card-subtitle mb-5 mt-2 text-muted">Created by: {{ recipe.createdBy.username }}</h6>
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
    const isLoggedIn = ref(!!getCookie('loginToken')) // use getCookie here
    const recipes = ref([])
    const searchInput = ref('')
    const route = useRoute();
    
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const fetchRecipes = async () => {
      let url = 'https://meally-backend.onrender.com/recipes';
      if (route.query.search) {
        url += `/search?ingredients=${route.query.search}`;
      }
      const response = await fetch(url);
      recipes.value = await response.json();
    };

    watch(() => route.query.search, async (search) => {
      const response = await fetch(`https://meally-backend.onrender.com/recipes/search?ingredients=${search}`);
      recipes.value = await response.json();
    }, { immediate: true });

    watchEffect(() => {
      isLoggedIn.value = !!getCookie('loginToken') // use getCookie here
    })
    watchEffect(() => {
      fetchRecipes();
    }, { immediate: true });
    onMounted(fetchRecipes);

    const allIngredients = ref([])

    const getImageUrl = (imagePath) => {
      return `https://meally-backend.onrender.com${imagePath}`;
    }

    return {
      isLoggedIn,
      recipes,
      searchInput,
      allIngredients,
      getImageUrl
    }
  },

  async mounted() {
    const response = await fetch('https://meally-backend.onrender.com/recipes');
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
    }
  },
}
</script>


<style scoped>
.recipe-title {
    font-family: 'Brush Script MT', cursive;
    font-size: 2.5em;
    color: black;
}
.recipe-image {
  max-width: auto;
  max-height: 200px;
  height: auto;
  width: 100%;
  object-fit: cover;
}
</style>
