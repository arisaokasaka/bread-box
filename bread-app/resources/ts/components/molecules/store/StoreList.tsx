import React from 'react';
import { useHistory } from 'react-router-dom';
import Btn_favorite from '../../atoms/buttons/Btn_favorite';
import Btn_interested from '../../atoms/buttons/Btn_interested';
import Week from '../../../info/Week';
import Schedule from '../../atoms/Schedule';
import Score from '../../atoms/Score';

type StoreProps = ({
    StoreInfo: Array<any>;
});

const StoreList: React.FC<StoreProps> = ({StoreInfo}) => {
    const history = useHistory();

    return(
        <div className ="m-store-list">
            {StoreInfo.map((el)=>{
                return(
                    el &&
                    <div className ="m-store-list__item" key={"storeList_" + el.user_uuid}>
                        <div className ="m-store-list__item--pc" onClick={()=>history.push("/store/" + el.user_uuid)}>
                            <div className ="m-store-list__item--pc__images__main">
                                {el.thumbnail ? 
                                 <img src={"/storage/store/" + el.user_uuid + "/thumbnail.jpg"} alt="パンのメイン画像"/> 
                                 : <img src="/images/no_image.jpg" alt="パンのメイン画像"/>}
                            </div>
                            <div className ="m-store-list__item--pc__images__sub">
                                {el.menu1 &&
                                 <img src={"/storage/store/" + el.user_uuid + "/menu/item_1.jpg"} alt="パンのサブ画像"/>}
                                {el.menu2 &&
                                <img src={"/storage/store/" + el.user_uuid + "/menu/item_2.jpg"} alt="パンのサブ画像"/>}
                                {el.menu3 &&
                                <img src={"/storage/store/" + el.user_uuid + "/menu/item_3.jpg"} alt="パンのサブ画像"/>}
                            </div>
                        </div>
                        <div className ="m-store-list__item__container">
                            <div className ="m-store-list__item__container__buttons">
                                <Btn_favorite 
                                    store_uuid={el.user_uuid}
                                />
                                <Btn_interested />
                            </div>
                            <div className ="m-store-list__item__container__name" onClick={()=>history.push("/store/" + el.user_uuid)}>
                                <h2 className ="hover-colorChange">{el.name}</h2>
                            </div>
                            <p className ="m-store-list__item__container__access">{el.address}</p>
                            <div className ="m-store-list__item--mobile" onClick={()=>history.push("/store/" + el.user_uuid)}>
                                <div className ="m-store-list__item--mobile__images">
                                    {el.thumbnail ? 
                                    <img src={"/storage/store/" + el.user_uuid + "/thumbnail.jpg"} alt="パンのメイン画像"/> 
                                    : <img src="/images/no_image.jpg" alt="パンのメイン画像"/>}
                                    {el.menu1 &&
                                    <img src={"/storage/store/" + el.user_uuid + "/menu/item_1.jpg"} alt="パンのサブ画像"/>}
                                    {el.menu2 &&
                                    <img src={"/storage/store/" + el.user_uuid + "/menu/item_2.jpg"} alt="パンのサブ画像"/>}
                                </div>
                            </div>
                            <p className ="m-store-list__item__container__explanation">{el.message}</p>
                            <Schedule
                                Week = {Week.week}
                            />
                            <Score
                                ScoreStar = {el.star}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default StoreList;