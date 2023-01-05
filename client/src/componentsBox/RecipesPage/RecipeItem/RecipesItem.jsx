import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import style from "./../../../Components/List/List.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

const RecipesItem = ({ onChangeRecipe, recipe }) => {
    const img = new Buffer.from(recipe.img.data).toString("base64");
    const { user } = useSelector((store) => store.auth);
    const url = `/recipe/${recipe._id}`;
    const [like, setLike] = useState(recipe.likes);
    const [toggleLike, setToggleLike] = useState(false);

    const likeRecipe = (id) => {
        if (like.includes(id)) {
            const arrLikes = like.filter((item) => item !== id);
            setLike(arrLikes);
            console.log(arrLikes, "false arrLikes");

            setToggleLike(false);

            axios
                .put(`/api/recipes/update-recipe/${recipe._id}`, {
                    likes: arrLikes,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const arrLikes = [...like];
            arrLikes.push(id);
            setLike(arrLikes);
            console.log(arrLikes, "true arrLikes");
            setToggleLike(false);

            axios
                .put(`/api/recipes/update-recipe/${recipe._id}`, {
                    likes: arrLikes,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <Card className={style.card}>
            <CardActionArea>
                <NavLink
                    onClick={() => {
                        onChangeRecipe(recipe._id);
                    }}
                    to={url}
                >
                    <CardMedia
                        className={style.media}
                        image={`data:image/jpg;base64, ${img}`}
                        title={recipe.title}
                    />
                </NavLink>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                        {recipe.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {recipe.description.substring(0, 25) + " . . ."}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <NavLink
                    onClick={() => {
                        onChangeRecipe(recipe._id);
                    }}
                    to={url}
                >
                    Подробнее
                </NavLink>
            </CardActions>
            {user && recipe.likes !== undefined && (
                <div>
                    <p>likes: {like.length}</p>
                    <button onClick={() => likeRecipe(user._id)}>Like</button>
                </div>
            )}
        </Card>
    );
};

export default RecipesItem;
