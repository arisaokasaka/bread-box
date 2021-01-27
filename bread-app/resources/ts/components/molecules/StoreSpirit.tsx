import React from 'react';

type SpiritProps = (
    {Spirit: any}
);

const StoreSpirit: React.FC<SpiritProps> = ({Spirit}) => (
    <div className = "m-spirit">
        {Spirit.map((el)=>(
            <div className = "m-spirit__container">
                <div className = "m-spirit__container__advantage">
                    <h2>こだわり</h2>
                    {el.advantage === '' && <p>まだ記載されていません。</p>}
                    <div className = "m-spirit__container__advantage__content">
                        <img></img>
                        <p>{el.advantage}</p>
                    </div>
                </div>
                <div className = "m-spirit__container__spirit">
                    <h2>思い</h2>
                    {el.spirit === '' && <p>まだ記載されていません。</p>}
                    <div className = "m-spirit__container__spirit__content">
                        <img></img>
                        <p>{el.spirit}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default StoreSpirit;