import React from 'react';
import style from './../../components/Main/AddRecipe/AddRecipe.module.css';
import { Field } from 'redux-form';
import { FieldMaterial } from './utils';
import ButtonIconBox from './ButtonIconBox';
import ButtonBox from './ButtonBox';

export const renderIngredients = ({ fields, meta: { error } }) => {
    return (
        <div>
            {fields.map((ing, id) => {
                return <div className={style.contianerIngredients} key={id}>
                    <ButtonIconBox color={"secondary"} type="button" title="Remove ingredient" onClick={() => fields.remove(id)} />
                    <div className={style.boxIng}>
                        <Field
                            name={ing + "nameOfProduct"}
                            type="text"
                            placeholder="Ингредиент:"
                            component={FieldMaterial}
                        />
                        <Field
                            name={ing + "amount"}
                            type="text"
                            placeholder="Кол-во:"
                            component={FieldMaterial}
                        />
                        <Field
                            name={ing + "type"}
                            type="text"
                            placeholder="Ед:"
                            component={FieldMaterial}
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