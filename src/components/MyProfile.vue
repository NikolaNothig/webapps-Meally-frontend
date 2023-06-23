<template>
  <div>
    <h2>My Recipes</h2>
    <div v-for="recipe in myRecipes" :key="recipe._id">
      <h3>{{ recipe.title }}</h3>
      <p>{{ recipe.description }}</p>
      <button @click="editRecipe(recipe)">Edit</button>
      <button @click="deleteRecipe(recipe._id)">Delete</button>
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
async editRecipe(recipe) {
try {
  const response = await fetch(`http://localhost:3000/recipes/update/${recipe._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const updatedRecipe = await response.json();

  const index = this.myRecipes.findIndex(r => r._id === recipe._id);
  this.myRecipes.splice(index, 1, updatedRecipe);
} catch (error) {
  console.error(error);
}
},


   
async deleteRecipe(id) {
try {
  const response = await fetch(`http://localhost:3000/recipes/delete/${id}`, { 
      method: 'DELETE' ,
      credentials: 'include' 
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  this.myRecipes = this.myRecipes.filter(recipe => recipe._id !== id);
} catch (error) {
  console.error(error);
}
}

  },
  mounted() {
    this.fetchMyRecipes();
  }
};
</script>
