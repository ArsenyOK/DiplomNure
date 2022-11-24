import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import style from './../../../Components/List/List.module.css';

const RecipesItem = ({ onChangeRecipe, recipe }) => {
    const img = new Buffer.from(recipe.img.data).toString("base64");
    const url = `/recipe/${recipe._id}`;
    return (
        <Card className={style.card}>
            <CardActionArea>
                <NavLink onClick={() => { onChangeRecipe(recipe._id) }} to={url}>
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
                    <Typography variant="body2" color="textSecondary" component="p">
                        {recipe.description.substring(0, 25) + " . . ."}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <NavLink onClick={() => { onChangeRecipe(recipe._id) }} to={url}>Подробнее</NavLink>
            </CardActions>
        </Card>
    )
}

export default RecipesItem