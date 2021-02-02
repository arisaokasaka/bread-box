import React from 'react';

type SpiritProps = (
    {Spirit: Array<any>}
);

const StoreEditTable_spirit: React.FC<SpiritProps> = ({Spirit}) => (
    <div className = "m-store-edit-spirit">
        {Spirit.map((el)=>(
            el.menu_type === 2 &&
            <div className = "m-store-edit-spirit__container">
                <div className = "m-store-edit-spirit__container__section">
                    <div className = "m-store-edit-spirit__container__section__title">
                        <h2>こだわり</h2>
                        <button>編集する</button>
                    </div>
                    <div className = "m-store-edit-spirit__container__section__content">
                        <img src="" alt="こだわりの写真"/>
                        <p>{el.advantage}</p>
                    </div>
                </div>
                <div className = "m-store-edit-spirit__container__section">
                    <div className = "m-store-edit-spirit__container__section__title">    
                        <h2>思い</h2>
                        <button>編集する</button>
                    </div>
                    <div className = "m-store-edit-spirit__container__section__content">
                        <img src="" alt="思いが伝わる写真"/>
                        <p>{el.spirit}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default StoreEditTable_spirit;