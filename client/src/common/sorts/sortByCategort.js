import React from 'react';
import style from './../../Components/Category/Category.module.css';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export const sortByCategory = (r, strCategory, onChangeRecipe) => {
    if (r.category === strCategory) {
        return <Card className={style.card}>
            <CardActionArea>
                <NavLink onClick={(e) => { onChangeRecipe(r.id) }} to={`/recipe/${r.id}`}>
                    <CardMedia
                        className={style.media}
                        image={r.urlPhoto}
                        title={r.title}
                    />
                </NavLink>
                <NavLink className={style.linkTitle} onClick={(e) => { onChangeRecipe(r.id) }} to={`/recipe/${r.id}`}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <h3 className={style.titleLink}>{r.title}</h3>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {r.description.substring(0, 25) + " . . ."}
                        </Typography>
                    </CardContent>
                </NavLink>
            </CardActionArea>
            <CardActions>

                <NavLink onClick={(e) => { onChangeRecipe(r.id) }} to={`/recipe/${r.id}`}>Подробнее</NavLink>

            </CardActions>
        </Card>
    }
}
