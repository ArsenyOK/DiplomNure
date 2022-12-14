import React from "react";
import style from "./Recipe.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Recipe = (props) => {
    if (props.loading || !props.newContent) {
        return <CircularProgress size={50} />;
    }

    return (
        <div className={style.containerRecipe}>
            <div className={style.mainInformation}>
                <RecipePresentasion newContent={props.newContent} />
                <RecipeInformation newContent={props.newContent} />
            </div>
        </div>
    );
};

const RecipePresentasion = ({ newContent }) => {
    console.log(newContent, "newContent");
    if (newContent.img.data) {
        const img = new Buffer.from(newContent.img.data).toString("base64");
        return (
            <div>
                <div className={style.title}>
                    <h2>{newContent.title}</h2>
                </div>
                <div className={style.contentImg}>
                    <img
                        src={`data:image/jpg;base64, ${img}`}
                        alt="recipePhoto"
                    />
                </div>
            </div>
        );
    }
};

const RecipeInformation = ({ newContent }) => {
    let i = 1,
        j = 1;
    return (
        <div className={style.contentRecipe}>
            <div className={style.boxDescription}>
                <h3>Описание:</h3>
                <p>{newContent.description}</p>
            </div>
            <div className={style.ingredients}>
                <h3>Ингредиенты:</h3>
                <ul>
                    {newContent.Ingredients &&
                        newContent.Ingredients.map((ing, id) => {
                            if (ing.amount && ing.type) {
                                return (
                                    <li key={id}>
                                        {`${j++}. ${ing.nameOfProduct} - ${
                                            ing.amount
                                        } ${ing.type}`}
                                    </li>
                                );
                            } else if (!ing.amount) {
                                return (
                                    <li key={id}>
                                        {`${j++}. ${ing.nameOfProduct}`}
                                    </li>
                                );
                            } else if (!ing.type) {
                                return (
                                    <li key={id}>
                                        {`${j++}. ${ing.nameOfProduct} - ${
                                            ing.amount
                                        }`}
                                    </li>
                                );
                            }
                        })}
                </ul>
            </div>
            <div className={style.instructionsContainer}>
                <h3>Пошаговое приготовление:</h3>
                {newContent.instructions &&
                    newContent.instructions.map((ins, id) => {
                        return (
                            <div className={style.box} key={id}>
                                <p className={style.step}>{`Шаг ${i++}`}</p>
                                <p>{ins.instructionsStep}</p>
                                {ins.photo && (
                                    <div>
                                        <img src={ins.photo} alt="photoIns" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                <div className={style.loveFood}>
                    <p>Приятного аппетита!</p>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
