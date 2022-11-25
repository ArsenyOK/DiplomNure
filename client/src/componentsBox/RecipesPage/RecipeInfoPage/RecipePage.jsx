import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Recipe from "../../../Components/Recipe/Recipe";
import { getCurrentRecipe } from "../../../store/actions/itemAction";
import CircularProgress from "@mui/material/CircularProgress";

const RecipePage = () => {
    const params = useParams();
    const { currentRecipe, loading } = useSelector((store) => store.recipes);
    const dispatch = useDispatch();

    const onChangeRecipe = (recipeId) => {
        dispatch(getCurrentRecipe(recipeId));
    };

    const refreshRecipe = () => {
        window.scrollTo(0, 0);
        if (params.id !== undefined) {
            let id = params.id;

            onChangeRecipe(id);
            dispatch(getCurrentRecipe(id));
        }
    };

    useEffect(() => {
        refreshRecipe();
    }, []);

    if (!currentRecipe) {
        return <CircularProgress size="50" />;
    }

    return (
        <Recipe
            idRecipe={params.id}
            newContent={currentRecipe}
            loading={loading}
        />
    );
};

export default RecipePage;
