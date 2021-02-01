import React from 'react';
import { Link } from 'react-router-dom';
import Btn_favorite from '../../atoms/buttons/Btn_favorite';
import Btn_interested from '../../atoms/buttons/Btn_interested';
import Week from '../../../info/Week';
import Schedule from '../../atoms/Schedule';
import Score from '../../atoms/Score';

type StoreProps = ({
    StoreInfo: Array<any>;
});

const StoreList: React.FC<StoreProps> = ({StoreInfo}) => (
    <div className ="m-store-list">
        {StoreInfo.map((el)=>{
            return(
                <Link to = "/store" className ="m-store-list__item" key={el.uuid}>
                    <div className ="m-store-list__item--pc">
                        <div className ="m-store-list__item__images--pc__main">
                            <img src="" alt="パンのメイン画像"/>
                        </div>
                        <div className ="m-store-list__item__images--pc__sub">
                            <img src="" alt="パンのサブ画像"/>
                            <img src="" alt="パンのサブ画像"/>
                            <img src="" alt="パンのサブ画像"/>
                        </div>
                    </div>
                    <div className ="m-store-list__item__container">
                        <div className ="m-store-list__item__container__buttons">
                            <Btn_favorite />
                            <Btn_interested />
                        </div>
                        <div className ="m-store-list__item__container__name">
                            <h2 className ="hover-colorChange">{el.name}</h2>
                        </div>
                        <p className ="m-store-list__item__container__access">{el.access}</p>
                        <div className ="m-store-list__item--mobile">
                            <div className ="m-store-list__item--mobile__main">
                                <img src="" alt="パンのメイン画像"/>
                            </div>
                            <div className ="m-store-list__item--mobile__sub">
                                <img src="" alt="パンのサブ画像"/>
                                <img src="" alt="パンのサブ画像"/>
                                <img src="" alt="パンのサブ画像"/>
                            </div>
                        </div>
                        <p className ="m-store-list__item__container__explanation">{el.detail}</p>
                        <Schedule
                            Week = {Week.week}
                        />
                        <Score
                            ScoreStar = {el.star}
                        />
                    </div>
                </Link>
            );
        })}
    </div>
);

export default StoreList;