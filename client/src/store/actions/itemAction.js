import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_CURRENT_RECIPE, ADD_RECIPE, SET_CURRENT_PAGE, SET_TOTAL_RECIPES } from './../actions/types';
import * as axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { recipesAPI } from './../../api/api';

export const getItems = () => (dispatch) => {
    dispatch(setItemsLoading());
    axios
        .get(`/api/recipes`)
        .then(res => dispatch(getItemsAC(res.data.result, res.data.totalRecipeCount)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const getItemsByPages = (page, size) => (dispatch) => {
    dispatch(setItemsLoading());
    axios.get(`/api/recipes?page=${page}&limit=${size}`)
        .then(res => {
            dispatch(getItemsAC(res.data.result, res.data.totalRecipeCount))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const getCurrentRecipe = (id) => dispatch => {
    dispatch(setItemsLoading());
    axios.get(`/api/recipes/${id}`)
        .then(res =>
            dispatch({
                type: GET_CURRENT_RECIPE,
                recipe: res.data
            }))
};

export const updateRecipe = (id, recipe) => (dispatch, getState) => {
    axios.put(`/api/recipes/update-recipe/${id}`, recipe, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
}

export const addItem = (item) => (dispatch, getState) => {
    axios
        .post('api/recipes', item, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
};

export const deleteItem = (id) => (dispatch, getState) => {
    axios.delete(`/api/recipes/${id}`, tokenConfig(getState)).then(res =>
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    )
};

export const getItemsAC = (payload, count) => ({ type: GET_ITEMS, payload, count });

export const setItemsLoading = () => ({ type: ITEMS_LOADING });

export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

export const setTotalRecipeAC = (count) => ({ type: SET_TOTAL_RECIPES, count });

export const addRecipe = (recipe) => ({ type: ADD_RECIPE, recipe });

export const addRecipeThunk = (recipe) => async dispatch => {
    let response = await recipesAPI.createRecipe(recipe);
    dispatch(addRecipe(recipe));
    console.log(response.data.recipe);
}