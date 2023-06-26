<template>
  <div class="row">
    <h2 class="display-2 text-center mb-4">My Recipes</h2>
    <div v-for="recipe in myRecipes" :key="recipe._id" class="col-lg-4 ">
      <div class="card mb-4 shadow">
        <div class="card-body">
          <router-link :to="`/recipe/${recipe._id}`" class="link-stretched text-decoration-none text-dark">
            <h5 class="card-title recipe-title">{{ recipe.title }}</h5>
            <img :src="getImageUrl(recipe.image)" class="recipe-image mb-3" alt="Recipe image" />
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
          </router-link>
          <div class="mt-3 d-flex justify-content-between">
            <button class="btn btn-primary styled-button" @click="editRecipe(recipe._id)">Edit</button>
            <button class="btn btn-danger" @click="deleteRecipe(recipe._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      myRecipes: [],
    }
  },
  computed: {
    ...mapGetters(['getUserId'])
  },
  methods: {
    getImageUrl(imagePath) {
      return `https://meally-backend.onrender.com${imagePath}`;
    },
    async fetchMyRecipes() {
      try {
        // get userId from Vuex store instead of cookie
        const response = await fetch(`https://meally-backend.onrender.com/recipes/user/${this.getUserId}/recipes`);
        const responseData = await response.text();
        try {
          let recipes = JSON.parse(responseData);
          this.myRecipes = recipes.map(recipe => {
            if(!recipe.ingredients) {
              recipe.ingredients = [];
            }
            return recipe;
          });
        } catch (err) {
          console.error('Failed to parse response as JSON', responseData);
          throw err;
        }
      } catch (error) {
        console.error(error);
      }
    },
    editRecipe(id) {
      this.$router.push({ name: 'EditRecipe', params: { id: id } });
    },
    async deleteRecipe(id) {
      try {
        const response = await fetch(`https://meally-backend.onrender.com/recipes/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.myRecipes = this.myRecipes.filter(recipe => recipe._id !== id);
      } catch (error) {
        console.error(error);
      }
    },
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
  },
  mounted() {
    this.fetchMyRecipes();
  }
};
</script>

<style scoped>

h2 {
  margin-bottom: 2rem;
  color: #ff6f00;
  font-family: 'Brush Script MT';
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.recipe-image {
  max-width: auto;
  max-height: 200px;
  height: auto;
  width: 100%;
  object-fit: cover;
}
.recipe-title {
    font-family: 'Brush Script MT', cursive;
    font-size: 2.5em;
    color: black;
}
.styled-button {
  background-color: orange;
  border-color: rgb(183, 119, 0);
  color: white;
}
.styled-button:hover, .styled-button:active, .styled-button:focus {
    background-color: #ff8a00;
    border-color: #ff8a00;
    color: white;
}
</style>
