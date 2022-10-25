export const require = (values) => {
    if(values) return undefined;

    return "Field is required";
}

export const minValues = min => values => {
    if(values && values.length < min) return `Minimum symbols are ${min}`;

    return undefined;
}

export const maxValues = max => values => {
    if(values && values.length > max) return `Maximum symbols are ${max}`;

    return undefined;
}