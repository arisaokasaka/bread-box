import React from 'react'
import Btn_favorite from '../../atoms/buttons/Btn_favorite';
import Btn_interested from '../../atoms/buttons/Btn_interested';
import StoreSubInfo from './StoreSubinfo';

type StoreInfoProps = ({
    StoreInfo? : any;
})

const StoreBasicInfo: React.FC<StoreInfoProps> = ({StoreInfo}) => {
    let buttons: any;
    if(true){
        buttons = (
            <div className = "m-store-basicInfo__btn">
                <Btn_favorite />
                <Btn_interested />
            </div>
        );
    }else{
        buttons = null;
    }

    return(
        <div className = "m-store-basicInfo">
            {buttons}
            {StoreInfo.map((el)=>{
                return(
                <div>
                    <h2 className = "m-store-basicInfo__name">{el.name}</h2>
                    <p className = "m-store-basicInfo__address">{el.address}</p>
                    <p className = "m-store-basicInfo__message">{el.message}</p>
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