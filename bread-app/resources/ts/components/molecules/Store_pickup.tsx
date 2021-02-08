import React from 'react';

type PickupProps = ({
    PickupInfo: Array<any>;
})

const Store_pickup: React.FC<PickupProps> = ({PickupInfo}) => (
    <div className="m-store-pickup">
        <h2 className="m-store-pickup__title">ピックアップ</h2>
        <div className="m-store-pickup__list">
            {PickupInfo.map((el)=>{
                return(
                    <a href="" className="m-store-pickup__list__item" key={el.id}>
                        <img src={el.img} alt="店舗画像"/>
                        <p>{el.name}</p>
                    </a>
                );
            })}
        </div>
    </div>
);

export default Store_pickup;