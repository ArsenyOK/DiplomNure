import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_CURRENT_RECIPE, SET_CURRENT_PAGE, SET_TOTAL_RECIPES } from '../actions/types';

const initState = {
    recipes: [],
    loading: false,
    currentRecipe: null,
    recipeCount: 0,
    pageSize: 12,
    currentPage: 1
};

const itemsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ITEMS: {
            return {
                ...state,
                recipes: action.payload,
                loading: false,
                recipeCount: action.count
            }
        }

        case ADD_ITEM: {
            return {
                ...state, recipes: [action.payload, ...state.recipes]
            }
        }

        case DELETE_ITEM: {
            return {
                ...state,
                recipes: state.recipes.filter(item => item._id !== action.payload)
            }
        }

        case ITEMS_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        
        case GET_CURRENT_RECIPE: {
            return {
                ...state, currentRecipe: action.recipe,
                loading: false
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage,
                loading: false
            }
        }

        case SET_TOTAL_RECIPES: {
            return {
                ...state, recipeCount: action.count,
                loading: false
            }
        }

        default: {
            return state;
        }
    }
}

export default itemsReducer;