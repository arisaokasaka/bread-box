import React from 'react';

type BtnProps = ({
    InputType: string
    OnClickFunction: any
    className?: string
})

const BtnSave: React.FC<BtnProps> = ({InputType, OnClickFunction, className}) =>  {
    return (
        <input
            className={"a-btnSave " + className}
            value="保存する"
            type={InputType}
            onClick={()=>OnClickFunction}
        />
    )
}

export default BtnSave;