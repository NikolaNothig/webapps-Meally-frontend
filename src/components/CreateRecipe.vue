<template>
  <div class="container">
    <h1>Create New Recipe</h1>
    <form @submit.prevent="submitForm" class="bg-light p-4 rounded shadow">
      <div class="form-group">
        <label for="title">Title:</label>
        <input v-model="form.title" type="text" required class="form-control">
      </div>
      <div class="form-group">
        <label for="ingredients">Ingredients:</label>
        <input v-model="form.ingredients" type="text" required class="form-control">
      </div>
      <div class="form-group">
        <label for="preparation">Preparation:</label>
        <textarea v-model="form.preparation" required class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
    <p v-if="message" class="mt-3 text-center alert alert-info">{{ message }}</p>
  </div>
</template>
  
<script>
export default {
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
      const ingredientsArray = this.form.ingredients.split(' ').map(item => item.trim());

      const response = await fetch('http://localhost:3000/recipes/create', {
        method: 'POST',
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
        this.message = data.message;
        window.location.href = '/main';
      } else {
        this.message = data.error;
      }
    },
  },
};
</script>

  