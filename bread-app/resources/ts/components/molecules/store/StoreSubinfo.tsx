import React from 'react'
import Score from '../../atoms/Score';
import Week from '../../../info/Week';
import Schedule from '../../atoms/Schedule';
import Btn_homepage from '../../atoms/buttons/Btn_homepage';

import ModalSNS from '../../atoms/modal/Modal_sns';

type StoreInfoProps = ({
    StoreInfo? : any;
})

const StoreSubInfo: React.FC<StoreInfoProps> = ({StoreInfo}) => (
    <div className = "m-store-subInfo">
        {StoreInfo.map((el)=>{
            el.url = 1;
            return(
            <div className = "m-store-subInfo__container" key={"subInfo_"+el.id}>
                <div className = "m-store-subInfo__container__item">
                    <Score
                        ScoreStar = {el.star}
                    />
                </div>
                <div className = "m-store-subInfo__container__item">
                    <Schedule
                        Week = {Week.week}
                    />
                    <p>{el.business_memo}</p>
                </div>
                <div className = "m-store-subInfo__container__item__btns">
                    <Btn_homepage
                        StoreInfo = {StoreInfo}
                    />
                    <ModalSNS
                        StoreInfo = {StoreInfo}
                    />
                </div>
            </div>
            );
        })}
    </div>
);

export default StoreSubInfo;