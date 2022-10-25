import React, { useState, useEffect } from 'react';
import style from './../AddRecipe/AddRecipe.module.css';
import styles from "./UpdateRecipe.module.css";
import { renderIngredients } from './../../common/utils/renderIngredients';
import { renderInstructions } from './../../common/utils/renderInstructions';
import ButtonBox from './../../common/utils/ButtonBox';
import { Form } from 'reactstrap';
import { connect } from 'react-redux'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { load as loadAccount } from './../../store/reducers/loadReducer';
import { FieldInput, FieldTextarea, FieldSelect } from './../../common/utils/utils';
import { require, minValues } from './../../common/validates/validates';
import * as axios from 'axios';

const min = minValues(2);

class InitializeFromStateForm extends React.Component {

    render() {
        const { handleSubmit, load, pristine, reset, submitting, data } = this.props;

        let bigData = data;

        const btnBack = () => {
            window.location.reload();
        }

        // useEffect(() => {
        //     if (bigData !== data) {
        //         bigData = data;
        //     }

        // }, []);

        return (
            <Form className={style.formRecipe} onSubmit={handleSubmit}>
                <div className={styles.generalBtn}>
                    <button type="button" onClick={() => load(bigData)}>Загрузка данных</button>
                    <button type="button" onClick={btnBack}>Назад</button>
                </div>
                <div className={style.recipeContainer}>
                    <div>
                        <Field
                            name="title"
                            type="text"
                            component={FieldInput}
                            label="Название блюда:"
                            validate={[require, min]}
                        />
                    </div>
                </div>
                <div className={style.describeInfo}>
                    <div>
                        <Field
                            name="urlPhoto"
                            label="Главное фото:"
                            validate={[require, min]}
                            component={FieldInput}
                            type="text"
                            placeholder="Photo"
                        />
                    </div>
                    <div>
                        <Field label="Катергория:" name="category" validate={[require]} component={FieldSelect} />
                    </div>
                </div>
                <div className={style.recipeContainer}>
                    <div>
                        <Field
                            name="description"
                            type="textarea"
                            component={FieldTextarea}
                            label="Описание:"
                            validate={[require, min]}
                        />
                    </div>
                </div>
                <div className={style.arrayIng}>
                    <FieldArray name="Ingredients" component={renderIngredients} />
                </div>
                <div className={style.instructionsBox}>
                    <FieldArray name="instructions" component={renderInstructions} />
                </div>
                <div className={style.recipeContainerBtn}>
                    <ButtonBox
                        color={"secondary"}
                        variant={"contained"}
                        className={style.btnSend}
                        disabled={submitting}
                        type="submit"
                        text={"Отправить"}
                    />
                    <ButtonBox
                        type="button"
                        disabled={pristine || submitting}
                        onClick={reset}
                        text={"Undo Changes"}
                    />
                </div>
            </Form>
        )
    }
}

InitializeFromStateForm = reduxForm({
    form: 'initializeFromState'
})(InitializeFromStateForm)


let mapStateToProps = (state) => ({
    initialValues: state.load.data,
    currentRecipe: state.recipes.currentRecipe
})

InitializeFromStateForm = connect(mapStateToProps, { load: loadAccount })(InitializeFromStateForm);

class UpdateRecipe extends React.Component {
    state = {
        Ingredients: "",
        instructions: "",
        description: "",
        title: "",
        urlPhoto: "",
        id: "",
        _id: "",
        category: ""
    }

    componentDidMount() {
        axios.get('/api/recipes/' + this.props.idRecipe)
            .then(res => {
                this.setState({
                    Ingredients: res.data.Ingredients,
                    instructions: res.data.instructions,
                    description: res.data.description,
                    title: res.data.title,
                    urlPhoto: res.data.urlPhoto,
                    id: res.data.id,
                    _id: res.data._id,
                    category: res.data.category
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this.props.reset('initializeFromState');
    }

    componentWillUpdate(prevProps) {
        if (this.props.currentRecipe !== prevProps.currentRecipe) {

        }
    }


    render() {
        let onSubmit = (formData) => {
            console.log(formData);
            this.props.updateRecipe(formData._id, formData);
            window.location.reload();
        }

        const data = {
            Ingredients: this.state.Ingredients,
            instructions: this.state.instructions,
            description: this.state.description,
            title: this.state.title,
            urlPhoto: this.state.urlPhoto,
            id: this.state.id,
            _id: this.state._id,
            category: this.state.category
        }

        return (
            <div className={style.addRecipeForm}>
                <h2>Редактирование рецепта</h2>
                <InitializeFromStateForm data={data} onSubmit={onSubmit} />
            </div>
        )
    }
}

export default UpdateRecipe;