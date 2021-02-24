import React from 'react'
import Btn_favorite from '../../atoms/buttons/Btn_favorite';
import Btn_interested from '../../atoms/buttons/Btn_interested';
import BtnStoreEdit from '../../atoms/buttons/BtnStoreEdit';
import StoreSubInfo from './StoreSubinfo';
import Score from '../../atoms/Score';

type StoreInfoProps = ({
    storeInfo : any;
})

const StoreBasicInfo: React.FC<StoreInfoProps> = ({storeInfo}) => {
    return(
        <div className = "m-store-basicInfo">
            <div className = "m-store-basicInfo__btn">
                <Btn_favorite 
                    store_uuid={storeInfo.user_uuid}
                />
                <Btn_interested />
                <BtnStoreEdit />
            </div>
            <div key={"basicInfo_" + storeInfo.id} className = "m-store-basicInfo__container">
                <h2 className = "m-store-basicInfo__name">{storeInfo.name}</h2>
                <p className = "m-store-basicInfo__address">{storeInfo.address}</p>
                <p className = "m-store-basicInfo__message">{storeInfo.message}</p>
                {/* レビューページ用のスコア */}
                <Score
                    ScoreStar={storeInfo.star}
                />
            </div>
            {/* モバイル用のsubInfo */}
            <StoreSubInfo
                storeInfo = {storeInfo}
            />
        </div>
    )
}
export default StoreBasicInfo;