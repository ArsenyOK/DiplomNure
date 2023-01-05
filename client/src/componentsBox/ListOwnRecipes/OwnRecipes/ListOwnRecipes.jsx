import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import OwnItemRecipe from "../OwnItemRecipe/OwnItemRecipe";
import { ContainerListOwnRecipes } from "./styled/ListOwnRecipes.styled";

const ListOwnRecipes = ({ user, showRecipes }) => {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleLoading = () => {
        setLoading((prev) => !prev);
    };

    const getUserRecipes = useCallback(() => {
        if (user && user._id) {
            toggleLoading();
            axios
                .get(`/api/recipes/recipes-user/${user._id}`)
                .then((res) => {
                    if (res.data.length > 0) {
                        setRecipes(res.data);
                        toggleLoading();
                    } else {
                        toggleLoading();
                    }
                })
                .catch((err) => {
                    console.log(err, "err");
                });
        }
    }, [user]);

    useEffect(() => {
        if (showRecipes) {
            getUserRecipes();
        }
    }, [getUserRecipes]);

    if (loading) {
        return <CircularProgress size={30} />;
    }

    return (
        <ContainerListOwnRecipes>
            {recipes &&
                recipes.map((item, index) => {
                    return (
                        <OwnItemRecipe
                            getUserRecipes={getUserRecipes}
                            key={index}
                            recipe={item}
                        />
                    );
                })}
        </ContainerListOwnRecipes>
    );
};

export default ListOwnRecipes;
