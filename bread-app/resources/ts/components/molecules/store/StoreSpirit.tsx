import React from 'react';

type SpiritProps = (
    {Spirit: any}
);

const StoreSpirit: React.FC<SpiritProps> = ({Spirit}) => (
    <div className = "m-spirit">
        {Spirit.map((el)=>(
            el.menu_type === 2 &&
            <div className = "m-spirit__container" key={"spirit_"+el.id}>
                <div className = "m-spirit__container__section">
                    <h2>お店のこだわり</h2>
                    <div className = "m-spirit__container__section__content">
                        <img src="/images/croissant.jpg" alt="こだわりの写真"/>
                        <p>{el.advantage}</p>
                    </div>
                </div>
                <div className = "m-spirit__container__section">
                    <h2>お店の思い</h2>
                    <div className = "m-spirit__container__section__content">
                        <img src="/images/bakery2.jpg" alt="思いが伝わる写真"/>
                        <p>{el.spirit}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default StoreSpirit;