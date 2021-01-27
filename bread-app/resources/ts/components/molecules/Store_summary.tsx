import React from 'react';
import { Link } from 'react-router-dom';
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
    <Link to = "/store" className ="m-store-summary">
        <div className ="m-store-summary__images--pc">
            <div className ="m-store-summary__images--pc__main">
                <img src="" alt=""/>
            </div>
            <div className ="m-store-summary__images--pc__sub">
                <img src="" alt=""/>
                <img src="" alt=""/>
                <img src="" alt=""/>
            </div>
        </div>
        <div className ="m-store-summary__content">
            <div className ="m-store-summary__content__buttons">
                <Btn_favorite />
                <Btn_interested />
            </div>
            <div className ="m-store-summary__content__name">
                <h2 className ="hover-colorChange">{store_name}</h2>
            </div>
            <p className ="m-store-summary__content__access">{store_access}</p>
            <div className ="m-store-summary__images--mobile">
                <div className ="m-store-summary__images--mobile__main">
                    <img src="" alt=""/>
                </div>
                <div className ="m-store-summary__images--mobile__sub">
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                </div>
            </div>
            <p className ="m-store-summary__content__detail">{store_detail}</p>
            <Schedule
                Week = {Week.week}
            />
            <Score
                score_total = '4.2'
                score_rate = '50%'
            />
        </div>
    </Link>
);

export default Store_summary;