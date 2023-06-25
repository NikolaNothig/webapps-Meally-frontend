<template>
  <div class="container">
    <h1 class="my-3">Edit Recipe</h1>
    <form @submit.prevent="submitForm" class="bg-light p-4 rounded shadow">
      <div class="form-group">
        <label for="title">Title:</label>
        <input id="title" v-model="form.title" type="text" required class="form-control">
      </div>
      <div class="form-group">
        <label for="ingredients">Ingredients :</label>
        <input id="ingredients" v-model="form.ingredients" type="text" required class="form-control">
      </div>
      <div class="form-group">
        <label for="preparation">Preparation:</label>
        <textarea id="preparation" v-model="form.preparation" required class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input id="image" ref="image" type="file" class="form-control">
        <img :src="form.image" alt="Current Recipe Image" class="mt-3" width="200">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Update</button>
    </form>
    <p v-if="message" class="mt-3 text-center alert alert-info">{{ message }}</p>
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
        preparation: '',
        image: ''
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

  if (this.$refs.image.files[0]) {
    formData.append('image', this.$refs.image.files[0]);
  }

  if (formData.has('image')) {
    const response = await fetch(`http://localhost:3000/recipes/update/${this.id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      this.message = "Recipe updated successfully!";
      this.$router.push('/main');
    } else {
      this.message = data.error;
    }
  } else {
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
      this.$router.push('/main');
    } else {
      this.message = data.error;
    }
  }
}
  },
  async created() {
    const response = await fetch(`http://localhost:3000/recipes/${this.id}`);
    const recipe = await response.json();
    console.log(recipe);
    this.form = {
      title: recipe.title,
      ingredients: recipe.ingredients.join(' '),
      preparation: recipe.preparation,
      image: `http://localhost:3000${recipe.image}`
    }
  }
};
</script>
