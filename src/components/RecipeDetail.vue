<template>
    <div v-if="recipe">
        <h1>{{ recipe.title }}</h1>
        <h2>Created by: {{ recipe.createdBy.username }}</h2>
        <h3>Ingredients:</h3>
        <p>
            <span v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient }}<span v-if="index < recipe.ingredients.length - 1">, </span>
            </span>
        </p>
        <h3>Preparation:</h3>
        <p>{{ recipe.preparation }}</p>
        <h3>Average Rating: {{ recipe.rating }}</h3>
        <h3>Average Difficulty: {{ recipe.difficulty }}</h3>
    </div>
    <div v-if="userId">
        <h3>Rate this recipe:</h3>
        <form @submit.prevent="submitRating">
            <label>Rating (1-5): <input type="number" v-model.number="newRating" min="1" max="5"></label>
            <label>Difficulty (1-5): <input type="number" v-model.number="newDifficulty" min="1" max="5"></label>
            <button type="submit">Submit Rating</button>
        </form>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            userId: null,
            newRating: null,
            newDifficulty: null,
            userHasRated: false,
            recipe: {
                title: '',
                ingredients: [],
                preparation: '',
                createdBy: { username: '' },
                ratings: [],
                rating: 0,
                difficulty: 0,
            },
            message: ''
        }
    },

    async created() {
        this.userId = this.$cookies.get('userId');
        const id = this.$route.params.id;
        const response = await fetch(`http://localhost:3000/recipes/${id}`);
        const recipe = await response.json();
        if (recipe.ingredients && recipe.title && recipe.preparation) {
            this.recipe = {
                id: recipe._id,
                title: recipe.title,
                ingredients: recipe.ingredients,
                preparation: recipe.preparation,
                createdBy: recipe.createdBy || { username: '' },
                ratings: recipe.ratings || [],
                rating: this.calculateAverageRating(recipe.ratings),
                difficulty: this.calculateAverageDifficulty(recipe.ratings),
            }

            const userRating = recipe.ratings.find(rating => rating.user === this.userId);
            if (userRating) {
                this.userHasRated = true;
                this.newRating = userRating.rating;
                this.newDifficulty = userRating.difficulty;
            }
        } else {
            console.error('Invalid recipe:', recipe);
        }
    },
    methods: {
        calculateAverageRating(ratings) {
            if (!ratings || !ratings.length) return 0;
            const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
            return sum / ratings.length;
        },
        calculateAverageDifficulty(ratings) {
            if (!ratings || !ratings.length) return 0;
            const sum = ratings.reduce((acc, curr) => acc + curr.difficulty, 0);
            return sum / ratings.length;
        },
        async submitRating() {
            const route = this.userHasRated ?
                `http://localhost:3000/recipes/${this.recipe.id}/rate` :
                `http://localhost:3000/recipes/${this.recipe.id}/rate`;

            const method = this.userHasRated ? 'PUT' : 'POST';

            try {
                const response = await fetch(route, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: this.userId,
                        rating: this.newRating,
                        difficulty: this.newDifficulty,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    this.message = data.error;
                    return;
                }

                this.recipe.ratings = this.recipe.ratings.filter(rating => rating.user !== this.userId);
                this.recipe.ratings.push({
                    user: this.userId,
                    rating: this.newRating,
                    difficulty: this.newDifficulty,
                });
                this.recipe.rating = this.calculateAverageRating(this.recipe.ratings);
                this.recipe.difficulty = this.calculateAverageDifficulty(this.recipe.ratings);

                this.userHasRated = true;

                this.newRating = null;
                this.newDifficulty = null;

                this.message = "Your rating was successfully submitted!";

                window.location.reload();
            } catch (error) {
                console.error('Failed to rate recipe:', error);
            }
        }
    }
};
</script>
<style>

</style>