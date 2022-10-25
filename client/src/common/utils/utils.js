import React from 'react';
import style from './utils.module.css';
import Input from '@material-ui/core/Input';

export const FieldInput = ({ input, label, placeholder, value, type, meta: { touched, error } }) => {
    let hasError = touched && error;
    return <div className="block">    
        <div className={style.contaierText}>
            <label>{label}</label>
            <input  className={style.fieldType + " " + (hasError ? style.errorType : "")} {...input} type={type} placeholder={placeholder} />
        </div>
        {hasError && <span className={style.error}>{error}</span>}
    </div>
}


export const FieldTextarea = ({ input, label, placeholder, value, type, meta: { touched, error } }) => {
    let hasError = touched && error;
    return <div className="block">   
        <div className={style.contaierText}>
            <label>{label}</label>
            <textarea  className={style.fieldType + " " + (hasError ? style.errorType : "")} {...input} type={type} placeholder={placeholder} />
        </div>
        {hasError && <span className={style.error}>{error}</span>}
    </div>
}

export const FieldMaterial = ({ input, label, placeholder, type, meta: { touched, error } }) => {
    let hasError = touched && error;
    return <div className="block">    
        <div className={style.contaierText}>
            <label>{label}</label>
            <Input className={style.fieldType + " " + (hasError ? style.errorType : "")} {...input} type={type} placeholder={placeholder} />
        </div>
        {hasError && <span className={style.error}>{error}</span>}
    </div>
}

export const FieldSelect = ({ input, label, type, meta: { touched, error } }) => {
    const categories = ["Первые блюда", "Вторые блюда", "Салаты", "Закуски", "Десерты", "Выпечка", "Соусы", "Напитки", "Другие"];
    let hasError = touched && error;
    return (
        <div className="block">
            <div className={style.contaierText}>
                <label>{label}</label>
                <select className={style.fieldType + " " + (hasError ? style.errorType : "")} {...input} type={type} >
                    <option value="">Select categories</option>
                    {categories.map(cat => {
                        return <option value={cat} key={cat}>{cat}</option>
                    })}
                </select>
            </div>
            {hasError && <span className={style.error}>{error}</span>}
        </div>
    )
}