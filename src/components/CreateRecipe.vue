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
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" ref="file" accept="image/*" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary mt-2 styled-button">Create</button>
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

      const formData = new FormData();
      formData.append('title', this.form.title);
      formData.append('ingredients', ingredientsArray);
      formData.append('preparation', this.form.preparation);
      formData.append('image', this.$refs.file.files[0]);

      const response = await fetch('http://localhost:3000/recipes/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        this.message = data.message;
        window.location.href = '/main';
      } else {
        this.message = ("You didnt enter all required data");
      }
    },
  },
};
</script>
<style scoped>
.styled-button {
  background-color: orange;
  border-color: rgb(183, 119, 0);
  color: white;
}
h1 {
  margin-bottom: 2rem;
  color: #ff6f00;
  font-family: 'Brush Script MT';
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
}
.styled-button:hover, .styled-button:active, .styled-button:focus {
    background-color: #ff8a00;
    border-color: #ff8a00;
    color: white;
}
</style>