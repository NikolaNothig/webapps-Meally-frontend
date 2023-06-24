<template>
  <div>
    <h1>Create New Recipe</h1>
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
      <button type="submit">Create</button>
    </form>
    <p v-if="message">{{ message }}</p>
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
      const ingredientsArray = this.form.ingredients.split(',').map(item => item.trim());

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
