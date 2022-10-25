import * as axios from 'axios';

const instance = axios.create({
    baseURL: '/api'
});

export const recipesAPI = {
    getRecipes() {
        return instance.get('/recipes')
            .then(response => {
                return response.data;
            })
    },

    getCurrentRecipe(id) {
        return instance.get(`/recipes/${id}`)
    },

    updateRecipe(recipe, id) {
        return instance.put(`/recipes/${id}`, recipe);
    },

    createRecipe(recipe) {
        return instance.post('/recipes', recipe)
    }
}