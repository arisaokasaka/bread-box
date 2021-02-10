import React from 'react';
import Modal_editSpirit from '../../../atoms/modal/Modal_editSpirit';

type SpiritProps = (
    {Spirit: Array<any>}
);

const StoreEditTable_spirit: React.FC<SpiritProps> = ({Spirit}) => (
    <div className = "m-storeEdit-spirit">
        <div className = "m-storeEdit-spirit__title">
            <h3>思い</h3>
            <Modal_editSpirit
                kind = {"spirit"}
            />
        </div>
        {Spirit.map((el)=>(
            el.menu_type === 2 &&
            <div className = "m-storeEdit-spirit__container">
                <div className = "m-storeEdit-spirit__container__item">
                    <label>登録画像</label>
                    <img src="/images/croissant.jpg" alt="思いが伝わる写真"/>
                </div>
                <div className = "m-storeEdit-spirit__container__item">
                    <label>内容</label>
                    <p>{el.spirit}</p>
                </div>
            </div>
        ))}
    </div>
);

export default StoreEditTable_spirit;