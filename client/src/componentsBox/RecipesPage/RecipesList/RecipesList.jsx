import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../../Components/List/List';
import * as axios from 'axios';
import { getCurrentRecipe, getItemsAC, getItemsByPages, setCurrentPageAC, setItemsLoading } from '../../../store/actions/itemAction';
import CircularProgress from '@mui/material/CircularProgress';

const RecipesList = () => {
    const { recipes, loading, pageSize, recipeCount, currentPage } = useSelector((store) => store.recipes);
    const { isAuthenticated } = useSelector((store) => store.auth);
    const dispatch = useDispatch();


    const onChangePageRecipes = (p) => {
        window.scrollTo(0, 0);
        dispatch(setItemsLoading())
        dispatch(setCurrentPageAC(p));
        axios.get(`/api/recipes?page=${p}&limit=${pageSize}`)
            .then(res => {
                dispatch(getItemsAC(res.data.result, res.data.totalRecipeCount));
            })
    }


    const onChangeRecipe = (recipeId) => {
        dispatch(getCurrentRecipe(recipeId));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getItemsByPages(currentPage, pageSize));
    }, [])

    if (loading) {
        return <CircularProgress size={50} />
    }

    return (
        <List
            recipeCount={recipeCount}
            pageSize={pageSize}
            recipes={recipes}
            onChangeRecipe={onChangeRecipe}
            onChangePageRecipes={onChangePageRecipes}
            loading={loading}
            isAuthenticated={isAuthenticated}
            setCurrentPageAC={setCurrentPageAC}
        />
    )
}

export default RecipesList