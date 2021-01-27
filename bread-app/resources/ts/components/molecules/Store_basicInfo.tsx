import React from 'react'
import Btn_favorite from '../atoms/buttons/Btn_favorite';
import Btn_interested from '../atoms/buttons/Btn_interested';

type StoreInfoProps = ({
    StoreInfo? : any;
})

const Store_basicInfo: React.FC<StoreInfoProps> = ({StoreInfo}) => (
    <div className = "m-store__basicInfo">
        <div className = "m-store__basicInfo__btn">
            <Btn_favorite />
            <Btn_interested />
        </div>
        {StoreInfo.map((el)=>{
            return(
            <div>
                <h2 className = "m-store__basicInfo__name">{el.name}</h2>
                <p className = "m-store__basicInfo__address">{el.address}</p>
                <p className = "m-store__basicInfo__message">{el.message}</p>
            </div>
        );})}
    </div>
);

export default Store_basicInfo;