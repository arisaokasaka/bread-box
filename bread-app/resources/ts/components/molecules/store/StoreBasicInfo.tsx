import React from 'react'
import Btn_favorite from '../../atoms/buttons/Btn_favorite';
import Btn_interested from '../../atoms/buttons/Btn_interested';
import BtnStoreEdit from '../../atoms/buttons/BtnStoreEdit';
import StoreSubInfo from './StoreSubinfo';
import Score from '../../atoms/Score';

type StoreInfoProps = ({
    StoreInfo? : any;
})

const StoreBasicInfo: React.FC<StoreInfoProps> = ({StoreInfo}) => {
    return(
        <div className = "m-store-basicInfo">
            <div className = "m-store-basicInfo__btn">
                <Btn_favorite />
                <Btn_interested />
                <BtnStoreEdit />
            </div>
            {StoreInfo.map((el)=>{
                return(
                <div key={"basicInfo_"+el.id} className = "m-store-basicInfo__container">
                    <h2 className = "m-store-basicInfo__name">{el.name}</h2>
                    <p className = "m-store-basicInfo__address">{el.address}</p>
                    <p className = "m-store-basicInfo__message">{el.message}</p>
                    {/* レビューページ用のスコア */}
                    <Score
                        ScoreStar={el.star}
                    />
                </div>
            );})}
            {/* モバイル用のsubInfo */}
            <StoreSubInfo
                StoreInfo = {StoreInfo}
            />
        </div>
    );
}
export default StoreBasicInfo;