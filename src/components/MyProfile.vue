<template>
  <div class="row">
    <h2 class="display-2 text-center mb-4">My Recipes</h2>
    <div v-for="recipe in myRecipes" :key="recipe._id" class="col-lg-4 ">
      <div class="card mb-4 shadow">
        <div class="card-body">
          <router-link :to="`/recipe/${recipe._id}`" class="link-stretched text-decoration-none text-dark">
            <h5 class="card-title">{{ recipe.title }}</h5>
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
            <button class="btn btn-primary" @click="editRecipe(recipe._id)">Edit</button>
            <button class="btn btn-danger" @click="deleteRecipe(recipe._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      myRecipes: [],
    }
  },
  methods: {
    async fetchMyRecipes() {
      try {
        const response = await fetch(`http://localhost:3000/recipes/user/${this.$cookies.get('userId')}/recipes`);
        const responseData = await response.text();
        try {
          this.myRecipes = JSON.parse(responseData);
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
        const response = await fetch(`http://localhost:3000/recipes/delete/${id}`, {
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
}</style>
