<template>
 
  <div>
     <h2>My Recipes</h2>
     <div v-for="recipe in myRecipes" :key="recipe._id">
       <h3>{{ recipe.title }}</h3>
       <p>{{ recipe.description }}</p>
       <button @click="editRecipe(recipe._id)">Edit</button>
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
     }
   },
   mounted() {
     this.fetchMyRecipes();
   }
 };
 </script>
 <style scoped>
 .naslov {
   font-size: 50px;
   font-weight: 50;
   text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
   color: #ff6f00;
   font-family: 'Brush Script MT';
 }
 
 </style>