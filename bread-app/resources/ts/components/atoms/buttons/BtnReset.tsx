import React from 'react';

const BtnReset: React.FC = () =>  {
    return (
        <input
            className="a-btn-reset"
            value="リセットする"
            type="reset"
            readOnly
        />
    )
}

export default BtnReset;