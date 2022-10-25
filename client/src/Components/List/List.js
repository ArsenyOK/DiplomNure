import React, { useState } from 'react';
import { ListGroup, Row } from 'reactstrap';
import { TransitionGroup } from 'react-transition-group';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { InputGroup, InputGroupAddon, Input, Spinner } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import style from './List.module.css';
import { sortByCategory } from './../../common/sorts/sortByCategort';

const useStyles = makeStyles({
    card: {
        width: 600,
    },
    media: {
        height: 300,
    },

    // cardImg: {
    //     width: 600,
    //     height
    // }
});

const List = ({
    loading,
    recipes,
    onChangeRecipe,
    category,
    recipeCount,
    pageSize,
    currentPage,
    onChangePageRecipes
}) => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState("");

    let updateSearch = (e) => {
        setSearch(e.target.value.substr(0, 20));
    }

    if (loading) {
        return <Spinner style={{ width: '3rem', height: '3rem' }} />
    }

    let temp = category;

    let filterRecipe = recipes.filter(
        (recipe) => {
            return recipe.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );

    let pagesCount = Math.ceil(recipeCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const changePage = (p) => {
        onChangePageRecipes(p);
    }

    return (
        <Row>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Поиск</InputGroupAddon>
                <Input onChange={(e) => { updateSearch(e) }} type="text" value={search} />
            </InputGroup>
            <div className={style.pagination}>
                <Pagination aria-label="Page navigation example">
                    {
                        pages.length > 1 && pages.map(p => {
                            return <PaginationItem>
                                <PaginationLink onClick={() => { changePage(p) }} className={currentPage === p && style.selected}>{p}</PaginationLink>
                            </PaginationItem>
                        })
                    }
                </Pagination>
            </div>
            <div className={style.containerList}>
                <div className={style.allRecipes}>
                    {
                        !temp && filterRecipe.map((r) => {
                            return <Card className={style.card}>
                                <CardActionArea>
                                    <NavLink onClick={(e) => { onChangeRecipe(r.id) }} to={`/recipe/${r.id}`}>
                                        <CardMedia
                                            className={style.media}
                                            image={r.urlPhoto}
                                            title={r.title}
                                        />
                                    </NavLink>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <h3>{r.title}</h3>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {r.description.substring(0, 25) + " . . ."}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <NavLink onClick={(e) => { onChangeRecipe(r.id) }} to={`/recipe/${r.id}`}>Подробнее</NavLink>
                                </CardActions>
                            </Card>

                        })
                    }
                </div>
            </div>
            <div className={style.pagination}>
                <Pagination aria-label="Page navigation example">
                    {
                        pages.length > 1 && pages.map(p => {
                            return <PaginationItem>
                                <PaginationLink onClick={() => { changePage(p) }} className={currentPage === p && style.selected}>{p}</PaginationLink>
                            </PaginationItem>
                        })
                    }
                </Pagination>
            </div>
        </Row>
    );
}


export default List;