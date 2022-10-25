import React from 'react';
import style from './Home.module.css';
import { NavLink } from 'react-router-dom';

const Home = (props) => {
    return (
        <div className={style.homePage}>
            <div className={style.mainBlock}>
                <div className={style.dishesPhoto}>
                    <img src="https://chinesenewyear.imgix.net/assets/images/food/chinese-new-year-food-feast.jpg?q=50&w=640&h=360&auto=format" alt="dishes" />
                </div>
                <div className={style.textAbout}>
                    Многие люди считают, что они не умеют готовить. Мол, они не повара, никогда не учились
                    этому и не имеют опыта. Но на самом деле это совсем не так, потому что повара – это
                    обычные люди, которые просто готовят больше, чем другие. На сайте вы найдете рецепты на любой вкус!
               </div>
            </div>

            <div className={style.categories}>
                <h2>Рецепты</h2>
                <div className={style.containerCategories}>
                    <div className={style.box}>
                        <NavLink className={style.itemRecipe} to="/category/Первые блюда">
                            <div className={style.itemText}>
                                <h3>Первые блюда</h3>
                            </div>
                        </NavLink>
                        <NavLink className={style.itemRecipe} to="/category/Вторые блюда">
                            <div className={style.itemText}>
                                <h3>Вторые блюда</h3>
                            </div>
                        </NavLink>
                        <NavLink className={style.itemRecipe} to="/category/Салаты">
                            <div className={style.itemText}>
                                <h3>Салаты</h3>
                            </div>
                        </NavLink>
                    </div>
                    <div className={style.box}>
                        <NavLink className={style.itemRecipe} to="/category/Закуски">
                            <div className={style.itemText}>
                                <h3>Закуски</h3>
                            </div>
                        </NavLink>
                        <NavLink className={style.itemRecipe} to="/category/Десерты">
                            <div className={style.itemText}>
                                <h3>Десерты</h3>
                            </div>
                        </NavLink>
                        <NavLink className={style.itemRecipe} to="/category/Выпечка">
                            <div className={style.itemText}>
                                <h3>Выпечка</h3>
                            </div>
                        </NavLink>
                    </div>
                    <div className={style.box}>
                        <NavLink className={style.itemRecipe} to="/category/Соусы">
                            <div className={style.itemText}>
                                <h3>соусы</h3>
                            </div>
                        </NavLink>
                        <NavLink className={style.itemRecipe} to="/category/Напитки">
                            <div className={style.itemText}>
                                <h3>напитки</h3>
                            </div></NavLink>
                        <NavLink className={style.itemRecipe} to="/recipes">
                            <div className={style.itemText}>
                                <h3>все рецепты</h3>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
