import React, { useState, useEffect } from "react";
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
import HeartIcon from "../../IconsSvg/HeartIcon/HeartIcon";
import { useCallback } from "react";
import { ContainerLikes } from "./RecipesItemStyled";

const RecipesItem = ({ onChangeRecipe, recipe }) => {
    const img = new Buffer.from(recipe.img.data).toString("base64");
    const url = `/recipe/${recipe._id}`;

    const { user } = useSelector((store) => store.auth);

    const [like, setLike] = useState(recipe.likes);
    const [toggleLike, setToggleLike] = useState(false);

    const likeRecipe = useCallback(
        (id) => {
            let userId = user.id || user._id;
            if (userId) {
                if (like.includes(userId)) {
                    const arrLikes = like.filter((item) => item !== userId);
                    setLike(arrLikes);

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
                    arrLikes.push(userId);
                    setLike(arrLikes);

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
            }
        },
        [user, like]
    );

    useEffect(() => {
        if (user !== null && like) {
            let userId = user.id || user._id;
            if (like.includes(userId)) {
                setToggleLike(true);
            } else {
                setToggleLike(false);
            }
        }
    }, [like, user]);

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
                    <ContainerLikes>
                        <HeartIcon
                            click={() => likeRecipe(user._id)}
                            width="20px"
                            height="20px"
                            color="#EB3234"
                            toggleBtn={toggleLike}
                        />

                        <p>{like.length}</p>
                    </ContainerLikes>
                </div>
            )}
        </Card>
    );
};

export default RecipesItem;
