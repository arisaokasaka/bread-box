import React from 'react';
import Btn_favorite from '../atoms/buttons/Btn_favorite';
import Btn_interested from '../atoms/buttons/Btn_interested';
import Week from '../../info/Week';
import Schedule from '../atoms/Schedule';
import Score from '../atoms/Score';

type store = {
    store_name?: string;
    store_access?: string;
    store_detail?: string;
}

const Store_summary: React.FC<store> = ({store_name, store_access, store_detail}) => (
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
                <Btn_interested />
            </div>
            <div className ="c-store-sum__text__title">
                <h2>{store_name}</h2>
            </div>
            <p>{store_access}</p>
            <p>{store_detail}</p>
            <div className="c-store-sum__text__schedule">
                <Schedule />
            </div>
            <div className="c-store-sum__text__score">
                <Score
                   score_rate = '4.2'
                   score_total = '4.2'
                />
            </div>
        </div>
    </div>
);

export default Store_summary;