import React from 'react'

type ButtonProps = {
    buttonText?: string;
    buttonClass: string;
    buttonId: string;
}

const Btn_bookmark: React.FC<ButtonProps> = ({buttonClass, buttonId, buttonText}) => (
    <button id = {buttonId} className={buttonClass}>
        <input>{buttonText}</input>
    </button>        
);

export default Btn_bookmark;