import React, { useState } from "react";
import { Row } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import style from "./List.module.css";
import RecipesItem from "../../componentsBox/RecipesPage/RecipeItem/RecipesItem";

const List = ({
    loading,
    recipes,
    onChangeRecipe,
    category,
    recipeCount,
    pageSize,
    currentPage,
    onChangePageRecipes,
}) => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState("");

    let updateSearch = (e) => {
        setSearch(e.target.value.substr(0, 20));
    };

    let temp = category;

    let filterRecipe = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    let pagesCount = Math.ceil(recipeCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const changePage = (p) => {
        onChangePageRecipes(p);
    };

    return (
        <Row>
            <InputGroup>
                <InputGroupAddon addonType="prepend">Поиск</InputGroupAddon>
                <Input
                    onChange={(e) => {
                        updateSearch(e);
                    }}
                    type="text"
                    value={search}
                />
            </InputGroup>
            <div className={style.pagination}>
                <Pagination aria-label="Page navigation example">
                    {pages.length > 1 &&
                        pages.map((p) => {
                            return (
                                <PaginationItem>
                                    <PaginationLink
                                        onClick={() => {
                                            changePage(p);
                                        }}
                                        className={
                                            currentPage === p && style.selected
                                        }
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                </Pagination>
            </div>
            <div className={style.containerList}>
                <div className={style.allRecipes}>
                    {!temp &&
                        filterRecipe.map((r) => {
                            return (
                                <RecipesItem
                                    key={r._id}
                                    recipe={r}
                                    onChangeRecipe={onChangeRecipe}
                                />
                            );
                        })}
                </div>
            </div>
            <div className={style.pagination}>
                <Pagination aria-label="Page navigation example">
                    {pages.length > 1 &&
                        pages.map((p) => {
                            return (
                                <PaginationItem>
                                    <PaginationLink
                                        onClick={() => {
                                            changePage(p);
                                        }}
                                        className={
                                            currentPage === p && style.selected
                                        }
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                </Pagination>
            </div>
        </Row>
    );
};

export default List;
