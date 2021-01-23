import React from 'react';

type storePickup = {
    Pickup?: any;
}

const Store_pickup: React.FC<storePickup> = ({Pickup}) => (
    <div className="c-store-pickup">
        <h2>ピックアップ</h2>
        <ul>
            <li className="c-store-pickup__el">
                <img src={Pickup.img}></img>
                <p>{Pickup.name}</p>
            </li>
        </ul>
    </div>
);

export default Store_pickup;