import React from 'react';

type BtnProps = ({
    InputType: string;
    OnClickFunction: any;
})

const BtnSave: React.FC<BtnProps> = ({InputType, OnClickFunction}) =>  {
    return (
        <input
            className="a-btnSave"
            value="保存する"
            type={InputType}
            onClick={()=>OnClickFunction}
        />
    )
}

export default BtnSave;