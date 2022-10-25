import React from 'react';
import style from './../../components/Main/AddRecipe/AddRecipe.module.css';
import { Field } from 'redux-form';
import { FieldTextarea, FieldMaterial } from './utils';
import { require, minValues } from '../../common/validates/validates';
import ButtonIconBox from './ButtonIconBox';
import ButtonBox from './ButtonBox';

const min = minValues(2);

// const adaptFileEventToValue = delegate =>
//     e => delegate(e.target.files[0])

// const FileInput = ({ input: { value: omitValue, onChange, onBlur, ...inputProps }, meta: omitMeta, ...props
// }) =>
//     (<input
//         onChange={adaptFileEventToValue(onChange)}
//         onBlur={adaptFileEventToValue(onBlur)}
//         type="file"
//         {...inputProps}
//         {...props}
//     />)

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
                                    component={FieldMaterial}
                                    name={ing + "photo"}
                                    placeholder={"Photo URL"}
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