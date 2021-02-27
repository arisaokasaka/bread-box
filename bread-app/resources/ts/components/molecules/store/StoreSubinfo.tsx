import React from 'react'
import Score from '../../atoms/Score';
import Schedule from '../../atoms/Schedule';
import Btn_homepage from '../../atoms/buttons/Btn_homepage';
import ModalSNS from '../../atoms/modal/Modal_sns';

type StoreInfoProps = ({
    storeInfo: any
    scoreInfo: any
})

const StoreSubInfo: React.FC<StoreInfoProps> = ({storeInfo, scoreInfo}) => {
    return (
        <div className = "m-store-subInfo">
            <div className = "m-store-subInfo__container" key={"subInfo_"+storeInfo.id}>
                <div className = "m-store-subInfo__container__item">
                    <Score
                        scoreInfo = {scoreInfo}
                    />
                </div>
                <div className = "m-store-subInfo__container__item">
                    {storeInfo.business_memo && <p>{storeInfo.business_memo}</p>}
                    <Schedule
                        info = {storeInfo}
                    />
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
}

export default StoreSubInfo;