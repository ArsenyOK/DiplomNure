import React, { useState } from 'react';
import style from './AddRecipe.module.css';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { FieldInput, FieldTextarea, FieldSelect } from './../../common/utils/utils';
import { Redirect } from 'react-router-dom';
import { require, minValues } from './../../common/validates/validates';
import { renderIngredients } from './../../common/utils/renderIngredients';
import { renderInstructions } from './../../common/utils/renderInstructions';
import ButtonBox from './../../common/utils/ButtonBox';
import { Form } from 'reactstrap';



const min = minValues(2);


const FieldArraysForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    return (
        <Form className={style.formRecipe} onSubmit={handleSubmit}>
            <div className={style.recipeContainer}>
                <Field
                    name="title"
                    type="text"
                    component={FieldInput}
                    label="Название блюда:"
                    validate={[require, min]}
                />
            </div>
            <div className={style.describeInfo}>
                <div>
                    <Field
                        name="urlPhoto"
                        type="text"
                        value="privet"
                        component={FieldInput}
                        label="Главное фото:"
                        placeholder="photo"
                        validate={[require, min]}
                    />
                </div>
                <div>
                    <Field label="Катергория:" name="category" validate={[require]} component={FieldSelect} />
                </div>
            </div>
            <div className={style.recipeContainer}>
                <Field
                    name="description"
                    type="textarea"
                    component={FieldTextarea}
                    label="Описание:"
                    validate={[require, min]}
                />
            </div>
            <div className={style.arrayIng}>
                <FieldArray name="ingredients" component={renderIngredients} />
            </div>
            <div className={style.instructionsBox}>
                <FieldArray name="instructions" component={renderInstructions} />
            </div>
            <div className={style.recipeContainerBtn}>
                <ButtonBox color={"secondary"} variant={"contained"} className={style.btnSend} type="submit" disabled={submitting} text={"Выложить рецепт"} />
                <ButtonBox type="button" disabled={pristine || submitting} onClick={reset} text={"Очистить"} />
            </div>
        </Form>
    )
}

const AddRecipe = (props) => {

    let [subButton, setSubButton] = useState(false);

    var idUserRecipe;

    if(props.user.user.id) {
        idUserRecipe = props.user.user.id;
    } 
    else {
        idUserRecipe = props.user.user._id
    }


    let onSubmit = (formData) => {
        let recipeData = {
            id: props.recipesId.length + 1,
            idRecipe: idUserRecipe,
            title: formData.title,
            urlPhoto: formData.urlPhoto,
            description: formData.description,
            category: formData.category,
            instructions: formData.instructions,
            Ingredients: formData.ingredients
        }
        props.addRecipe(recipeData);
        setSubButton(true);
        props.getItems();
        console.log(recipeData);
    }

    if (subButton) {
        return <Redirect to="/recipes" />
    }

    if(!props.isAuthenticated) {
        return <Redirect to="/recipes" />
    }

    return (
        <div className={style.addRecipeForm}>
            <h2>Новый рецепт</h2>
            <FormRedux onSubmit={onSubmit} />
        </div>
    )
}

const FormRedux = reduxForm({
    form: 'recipes',
})(FieldArraysForm);

export default AddRecipe;