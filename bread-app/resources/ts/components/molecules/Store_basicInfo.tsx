import React from 'react'
import Btn_favorite from '../atoms/buttons/Btn_favorite';
import Btn_interested from '../atoms/buttons/Btn_interested';
import Store_subInfo from './Store_subinfo';

type StoreInfoProps = ({
    StoreInfo? : any;
})

const Store_basicInfo: React.FC<StoreInfoProps> = ({StoreInfo}) => (
    <div className = "m-store-basicInfo">
        <div className = "m-store-basicInfo__btn">
            <Btn_favorite />
            <Btn_interested />
        </div>
        {StoreInfo.map((el)=>{
            return(
            <div>
                <h2 className = "m-store-basicInfo__name">{el.name}</h2>
                <p className = "m-store-basicInfo__address">{el.address}</p>
                <p className = "m-store-basicInfo__message">{el.message}</p>
            </div>
        );})}
        {/* モバイル用のsubInfo */}
        <Store_subInfo
            StoreInfo = {StoreInfo}
        />
    </div>
);

export default Store_basicInfo;