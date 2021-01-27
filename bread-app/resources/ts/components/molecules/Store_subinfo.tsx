import React from 'react'
import Score from '../atoms/Score';
import Week from '../../info/Week';
import Schedule from '../atoms/Schedule';

type StoreInfoProps = ({
    StoreInfo? : any;
})

const Store_subInfo: React.FC<StoreInfoProps> = ({StoreInfo}) => (
    <div className = "m-store__subInfo">
        {StoreInfo.map((el)=>{
            return(
            <div className = "m-store__subInfo__container">
                <Score/>
                <div className = "m-store__subInfo__container__businessday">
                    <label>営業日・営業時間</label>
                    <Schedule
                        Week = {Week.week}
                    />
                    <p>{el.business_memo}</p>
                </div>
                <div className = "m-store__subInfo__container__homepage">
                    <label>ホームページ</label>
                    <p>{el.url}</p>
                </div>
                <div className = "m-store__subInfo__container__sns">
                    <label>SNS</label>
                    <p>{el.sns}</p>
                </div>
            </div>
            );
        })}
    </div>
);

export default Store_subInfo;