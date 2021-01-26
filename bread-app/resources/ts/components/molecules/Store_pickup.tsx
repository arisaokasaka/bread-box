import React from 'react';

type storePickup = {
    Pickup?: any;
}

const Store_pickup: React.FC<storePickup> = ({Pickup}) => (
    <div className="m-store-pickup">
        <h2>ピックアップ</h2>
        <div className="m-store-pickup__list">
            <ul>
                <li className="m-store-pickup__list__item">
                    <img src={Pickup.img}></img>
                    <p>{Pickup.name}</p>
                </li>
            </ul>
        </div>
    </div>
);

export default Store_pickup;