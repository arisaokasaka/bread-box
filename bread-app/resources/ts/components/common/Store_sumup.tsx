import React from 'react';
import Btn_bookmark from './buttons/Btn_bookmark';
import Btn_favorite from './buttons/Btn_favorite';

type store = {
    store_name?: string;
    store_access?: string;
    store_detail?: string;
}

const Store_sumup: React.FC<store> = ({store_name, store_access, store_detail}) => (
    <div className ="c-store-sum">
        <div className ="c-store-sum__images">
            <div className ="c-store-sum__images__main">
                <img src="" alt=""/>
            </div>
            <div className ="c-store-sum__images__sub">
                <img src="" alt=""/>
                <img src="" alt=""/>
                <img src="" alt=""/>
            </div>
        </div>
        <div className ="c-store-sum__text">
            <div className ="c-store-sum__text__buttons">
                <Btn_favorite />
                <Btn_bookmark
                    buttonId="c-btn-favorite"
                    buttonClass="c-btn-interested"
                    buttonText="行ってみたい"
                />
            </div>
            <div className ="c-store-sum__text__title">
                <h2>{store_name}</h2>
            </div>
            <p>{store_access}</p>
            <p>{store_detail}</p>
            <div className="c-store-sum__text__schedule">

            </div>
            <div className="c-store-sum__text__score">

            </div>
        </div>
    </div>
);

export default Store_sumup;