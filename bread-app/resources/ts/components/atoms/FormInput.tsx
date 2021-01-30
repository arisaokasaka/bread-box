import React from 'react'

type InputProps = (
    {
        tag? : string,
        label?: string,
        type?: string,
        id?: string,
        name?: string,
        value?: string,
    }
)

const FormInput: React.FC<InputProps> = ({tag,label,type,id,name,value}) => (
    <div className = "a-form-input">
        <label htmlFor={id}>{label}</label>
        <a>{tag}</a>
        <input type={type} id={id} name={name} value={value}/>
    </div>
)

export default FormInput;