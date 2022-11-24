import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Recipe from '../../../Components/Recipe/Recipe';
import { getCurrentRecipe } from '../../../store/actions/itemAction';

const RecipePage = () => {
    const params = useParams();
    const { currentRecipe, loading } = useSelector((store) => store.recipes);
    const dispatch = useDispatch();

    const onChangeRecipe = (recipeId) => {
        dispatch(getCurrentRecipe(recipeId));
    }

    const refreshRecipe = () => {
        window.scrollTo(0, 0);
        if (params.id !== undefined) {
            let id = params.id;

            onChangeRecipe(id);
            dispatch(getCurrentRecipe(id));
        }
    }

    const updateRefreshRecipe = useCallback(() => {
        if (params.id !== undefined) {
            refreshRecipe();
        }
    }, [params.id])

    useEffect(() => {
        refreshRecipe();
    }, [])

    useEffect(() => {
        updateRefreshRecipe();
    }, [updateRefreshRecipe])

    if (params.id !== undefined && !currentRecipe) {
        return <>Loading...</>
    }

    console.log(currentRecipe, 'currentRecipe')

    return (
        <Recipe
            idRecipe={params.id}
            newContent={currentRecipe}
            loading={loading}
        />
    )
}

export default RecipePage