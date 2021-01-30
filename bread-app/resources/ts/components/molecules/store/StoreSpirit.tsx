import React from 'react';

type SpiritProps = (
    {Spirit: any}
);

const StoreSpirit: React.FC<SpiritProps> = ({Spirit}) => (
    <div className = "m-spirit">
        {Spirit.map((el)=>(
            el.menu_type === 2 &&
            <div className = "m-spirit__container">
                <div className = "m-spirit__container__section">
                    <h2>こだわり</h2>
                    <div className = "m-spirit__container__section__content">
                        <img src="" alt="こだわりの写真"/>
                        <p>{el.advantage}</p>
                    </div>
                </div>
                <div className = "m-spirit__container__section">
                    <h2>思い</h2>
                    <div className = "m-spirit__container__section__content">
                        <img src="" alt="思いが伝わる写真"/>
                        <p>{el.spirit}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default StoreSpirit;