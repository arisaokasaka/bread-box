import React from 'react';
import Btn_favorite from '../../atoms/buttons/Btn_favorite';
import Btn_interested from '../../atoms/buttons/Btn_interested';
import BtnStoreEdit from '../../atoms/buttons/BtnStoreEdit';
import StoreSubInfo_mobile from './StoreSubinfo_mobile';

type StoreInfoProps = ({
    storeInfo : any
    scoreInfo: any
})

const StoreBasicInfo: React.FC<StoreInfoProps> = ({storeInfo, scoreInfo}) => {
    return(
        <div className = "m-store-basicInfo">
            <div className = "m-store-basicInfo__btn">
                <Btn_favorite
                    allInfo = {storeInfo}
                    index={1}
                    store_uuid={storeInfo.user_uuid}
                />
                <Btn_interested 
                    allInfo = {storeInfo}
                    index={1}
                    store_uuid={storeInfo.user_uuid}
                />
                <BtnStoreEdit />
            </div>
            <div className = "m-store-basicInfo__container">
                <h2 className = "m-store-basicInfo__name">{storeInfo.name}</h2>
                <p className = "m-store-basicInfo__address">{storeInfo.address}</p>
                <p className = "m-store-basicInfo__message">{storeInfo.message}</p>
            </div>
            {/* モバイル用のsubInfo */}
            <StoreSubInfo_mobile
                storeInfo = {storeInfo}
                scoreInfo = {scoreInfo}
            />
        </div>
    )
}
export default StoreBasicInfo;