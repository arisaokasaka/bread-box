import React from 'react'
import Score from '../../atoms/Score';
import Week from '../../../info/Week';
import Schedule from '../../atoms/Schedule';
import Btn_homepage from '../../atoms/buttons/Btn_homepage';
import ModalSNS from '../../atoms/modal/Modal_sns';

type StoreInfoProps = ({
    storeInfo: any;
})

const StoreSubInfo: React.FC<StoreInfoProps> = ({storeInfo}) => (
    <div className = "m-store-subInfo">
        <div className = "m-store-subInfo__container" key={"subInfo_"+storeInfo.id}>
            <div className = "m-store-subInfo__container__item">
                {storeInfo.star &&
                    <Score
                        ScoreStar = {storeInfo.star}
                    />
                }
            </div>
            <div className = "m-store-subInfo__container__item">
                <Schedule
                    Week = {Week.week}
                />
                <p>{storeInfo.business_memo}</p>
            </div>
            <div className = "m-store-subInfo__container__item__btns">
                {storeInfo.url &&
                    <Btn_homepage
                        url = {storeInfo.url}
                    />
                }
                {storeInfo.sns &&
                    <ModalSNS
                        sns = {storeInfo.sns}
                    />
                }
            </div>
        </div>
    </div>
);

export default StoreSubInfo;