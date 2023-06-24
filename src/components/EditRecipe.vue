<template>
    <div>
      <h1>Edit Recipe</h1>
      <form @submit.prevent="submitForm">
        <label>
          Title:
          <input v-model="form.title" type="text" required>
        </label>
        <label>
          Ingredients :
          <input v-model="form.ingredients" type="text" required>
        </label>
        <label>
          Preparation:
          <textarea v-model="form.preparation" required></textarea>
        </label>
        <button type="submit">Update</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
</template>
  
<script>
export default {
  props: ['id'], 
  data() {
    return {
      form: {
        title: '',
        ingredients: '',
        preparation: ''
      },
      message: ''
    }
  },
  methods: {
    async submitForm() {
      const ingredientsArray = this.form.ingredients.split(',').map(item => item.trim());

      const response = await fetch(`http://localhost:3000/recipes/update/${this.id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: this.form.title,
          ingredients: ingredientsArray,
          preparation: this.form.preparation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        this.message = "Recipe updated successfully!";
        window.location.href = '/main';
      } else {
        this.message = data.error;
      }
    },
  },
  async created() {
    const response = await fetch(`http://localhost:3000/recipes/${this.id}`); 
    const recipe = await response.json();
    console.log(recipe); 
    this.form = {
      title: recipe.title,
      ingredients: recipe.ingredients.join(','),
      preparation: recipe.preparation
    }
  }
};
</script>
