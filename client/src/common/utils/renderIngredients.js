import React from 'react';
import style from "./../../Components/AddRecipe/AddRecipe.module.css";
import { Field } from 'redux-form';
import { FieldInput } from './utils';
import ButtonIconBox from './ButtonIconBox';
import ButtonBox from './ButtonBox';
import { require } from '../../common/validates/validates';

export const renderIngredients = ({ fields, meta: { error } }) => {
    return (
        <div>
            {fields.map((ing, id) => {
                return <div className={style.contianerIngredients} key={id}>
                    <ButtonIconBox color={"secondary"} type="button" title="Remove ingredient" onClick={() => fields.remove(id)} />
                    <div className={style.boxIng}>
                        <Field
                            validate={[require]}
                            name={ing + "nameOfProduct"}
                            type="text"
                            placeholder="Ингредиент:"
                            component={FieldInput}
                        />
                        <Field
                            name={ing + "amount"}
                            type="number"
                            placeholder="Кол-во:"
                            component={FieldInput}
                        />
                        <Field
                            name={ing + "type"}
                            type="text"
                            placeholder="Ед:"
                            component={FieldInput}
                        />
                    </div>
                </div>
            })}
            <div className={style.btnRender}>
                <ButtonBox type="button" onClick={() => fields.push()} color={"primary"} text={"Добавить ингредиент"} variant={"contained"} />
                {error && <div className="error">{error}</div>}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}