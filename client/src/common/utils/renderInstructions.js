import React from 'react';
import style from "./../../Components/AddRecipe/AddRecipe.module.css";
import { Field } from 'redux-form';
import { FieldTextarea, FieldInput } from './utils';
import { require } from '../../common/validates/validates';
import ButtonIconBox from './ButtonIconBox';
import ButtonBox from './ButtonBox';

export const renderInstructions = ({ fields, meta: { error } }) => {
    return (
        <div className={style.mainInstruction}>
            <div className={style.recipeContainer}>
                <div>
                    <h3>Пошаговое приготовление</h3>
                </div>
            </div>
            <ul>
                {fields.map((ing, id) => {
                    return <li key={id}>
                        {/* <button className={style.deleteIng} type="button" title="Remove ingredient"
                            onClick={() => fields.remove(id)}>
                            Удалить
                        </button> */}
                        <ButtonIconBox color={"secondary"} type="button" title="Remove ingredient" onClick={() => fields.remove(id)} />
                        <div className={style.BoxInstruction}>
                            <div className={style.box}>
                                <Field
                                    validate={[require]}
                                    name={ing + "instructionsStep"}
                                    type="text"
                                    component={FieldTextarea}
                                    label={"Шаг " + (id + 1)}
                                />
                            </div>
            
                            <div>
                                <Field
                                    type="text"
                                    label={"Фото"}
                                    component={FieldInput}
                                    name={ing + "photo"}
                                />
                            </div>
                        </div>
                    </li>
                })}
                <li>
                    <div className={style.btnStep}>
                        <ButtonBox type="button" onClick={() => fields.push()} color={"primary"} text={"Добавить шаг"} variant={"contained"} />
                    </div>
                </li>
                {error && <li className="error">{error}</li>}
            </ul>
        </div>
    )
}