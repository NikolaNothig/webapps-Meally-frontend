<template>
    <div id="home">
      <nav>
        <ul>
          <li><router-link to="/main">Main page</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <form @submit.prevent="search">
            <input v-model="searchInput" type="text" placeholder="Search recipes">
            <button type="submit">Search</button>
          </form>
        </ul>
      </nav>
      <div v-for="recipe in recipes" :key="recipe._id">
        <h2>{{ recipe.title }}</h2>
        <p>Created by: {{ recipe.createdBy.username }}</p>
        <!-- ostali detalji recepata -->
      </div>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
      recipes: [],
      searchInput: '',
      isLoggedIn: !!localStorage.getItem('loginToken'), 
    };
  },

  async mounted() {
    const response = await fetch('http://localhost:3000/recipe');
    this.recipes = await response.json();
  },
  methods: {
    async search() {
      const response = await fetch(`http://localhost:3000/recipe/search?ingredients=${this.searchInput}`);
      this.recipes = await response.json();
    },
    logout() {
       const cookies = document.cookie.split(';');

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  }
}

  },
};
</script>

  