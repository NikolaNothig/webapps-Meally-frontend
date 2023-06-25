<template>
    <div v-if="recipe" class="container mt-5">
        <h1 class="recipe-title mb-4">{{ recipe.title }}</h1>
        <img :src="getImageUrl(recipe.image)" class="recipe-image" />
        <div class="row">
            <div class="col-md-6">
                <h3 class="section-title">Preparation:</h3>
                <p>{{ recipe.preparation }}</p>
            </div>
            <div class="col-md-6">
                <h3 class="section-title">Ingredients:</h3>
                <p>
                    <span v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient-badge">
                        {{ ingredient }}<span v-if="index < recipe.ingredients.length - 1">, </span>
                    </span>
                </p>
            </div>
        </div>
        <div v-if="userId" class="rate-recipe-section text-center mt-4">
            <h3>Rate this recipe:</h3>
            <form @submit.prevent="submitRating" class="row g-3 mt-3 justify-content-center">
                <div class="col-auto">
                    <label for="rating" class="visually-hidden">Rating (1-5):</label>
                    <input type="number" v-model.number="newRating" min="1" max="5" id="rating" class="form-control"
                        placeholder="Rating (1-5)">
                </div>
                <div class="col-auto">
                    <label for="difficulty" class="visually-hidden">Difficulty (1-5):</label>
                    <input type="number" v-model.number="newDifficulty" min="1" max="5" id="difficulty" class="form-control"
                        placeholder="Difficulty (1-5)">
                </div>
                <div class="col-auto">
                    <button type="submit" class="btn btn-primary">Submit Rating</button>
                </div>
            </form>
        </div>

        <div class="footer-info mt-5 text-center">
            <h4>Created by: <strong>{{ recipe.createdBy.username }}</strong></h4>
            <h5>Average Rating: <span>{{ recipe.rating }}</span></h5>
            <h5>Average Difficulty: <span>{{ recipe.difficulty }}</span></h5>
        </div>
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
                image: '',
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
                image: recipe.image,
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
        getImageUrl(imagePath) {
            return `http://localhost:3000${imagePath}`;
        },
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

<style scoped>
.container {
    font-family: Arial, sans-serif;
}

.recipe-title {
    font-family: 'Brush Script MT', cursive;
    font-size: 2.5em;
    color: orange;
}

.section-title {
    font-family: 'Brush Script MT', cursive;
    color: orange;
}

.ingredient-badge {
    font-weight: 500;
    letter-spacing: 0.5px;
}

.form-control {
    border-radius: 0;
    border: 2px solid #ddd;
}

.btn-primary {
    background-color: #ff6f00;
    border-color: #ff6f00;
}

.footer-info,
.rate-recipe-section {
    font-size: 0.8em;
}
.recipe-image {
  max-width: 100%;
  max-height: 400px;
  height: auto;
  width: 100%;
  object-fit: cover;
}
</style>