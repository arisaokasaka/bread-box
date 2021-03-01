import React from 'react'
import Score from '../../atoms/Score';
import Schedule from '../../atoms/Schedule';
import Btn_homepage from '../../atoms/buttons/Btn_homepage';
import LinkSNS from '../../atoms/Link_sns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendar } from "@fortawesome/free-solid-svg-icons";

type StoreInfoProps = ({
    storeInfo: any
    scoreInfo: any
})

const StoreSidebar: React.FC<StoreInfoProps> = ({storeInfo, scoreInfo}) => {
    return (
        <div className="m-store-sidebar">
            <div className="m-store-sidebar__container">
                <div className="m-store-sidebar__container__item">
                    <Score
                        scoreInfo = {scoreInfo}
                    />
                </div>
                {storeInfo.business_memo && 
                    <div className="m-store-sidebar__container__item">
                        <label className="m-store-sidebar__container__item__title"><FontAwesomeIcon icon={faBell}/>お知らせ</label>
                        <p>{storeInfo.business_memo}</p>
                    </div>
                }
                {storeInfo.business_day && 
                <div className="m-store-sidebar__container__item">
                    <label className="m-store-sidebar__container__item__title"><FontAwesomeIcon icon={faCalendar}/>営業日</label>
                    <Schedule
                        info = {storeInfo}
                    />
                </div>
                }
                <div className="m-store-sidebar__container__item">
                    <div className="m-store-sidebar__container__item__sns">
                        {storeInfo.sns &&
                            <LinkSNS
                                sns = {storeInfo.sns}
                            />
                        }
                    </div>
                    <div className="m-store-sidebar__container__item__homepage">
                        {storeInfo.url &&
                            <Btn_homepage
                                url = {storeInfo.url}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
);
}

export default StoreSidebar;