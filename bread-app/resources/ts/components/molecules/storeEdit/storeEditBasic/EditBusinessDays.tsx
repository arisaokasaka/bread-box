import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';
import InputSchedule from '../../InputSchedule';
import BtnSave from '../../../atoms/buttons/BtnSave';
import week from '../../../../info/Week';

const EditBusinessDays: React.FC = () => {
    const { register, handleSubmit, errors} = useForm();
    const [ dayValidation, setDayValidation ] = useState(false);
    const { state } = useContext(UserAuthContext);
    const { stateInfo, dispatch } = useContext(StoreInfoContext);
        
    let StoreInfo = {
        business_day: '',
    }

    if(stateInfo.storeInfo){
        StoreInfo = stateInfo.storeInfo;
    }
    
    const onSubmit = (data) => {
        let business_day = {};
        let business_day_check = true;
        setDayValidation(false);

        // その曜日にチェック入ってるか確認のうえ、営業時間データを挿入
        week.week.map((day)=>{
            let checkbox = document.getElementById(day.id + '_checked') as HTMLInputElement;
            let open = document.getElementsByName(day.id + '_open')[0] as HTMLInputElement;
            let close = document.getElementsByName(day.id + '_close')[0] as HTMLInputElement;
            if(checkbox.checked){
                if(open.value && close.value){                    
                    business_day[day.id] = [ open.value, close.value]
                }else{
                    setDayValidation(true);
                    business_day_check = false;
                }
            }            
        })

        if(business_day_check===true) {
            //更新データ送信
            data['user_uuid'] = state.uuid;
            data['business_day'] = JSON.stringify(business_day);
            console.log(data);
            axios.post("/api/update_businessDay", data)
            .then(res => {
                getStoreInfo();
                alert('営業日・営業時間を保存しました。');
            })
            .catch(err => {
                alert('営業日・営業時間の保存に失敗しました。');
            });
        }
    }

    // 店舗情報取得＆更新
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            store_uuid: state.uuid
        })
        .then(res => {
            console.log('storeinfo')
            dispatch({
                type: 'inputStoreInfo',
                payload: res.data,
            });
        })
        .catch(err => {
        });
    }

    return(
        <div className = "m-storeEdit-businessDay">
            <div className = "m-storeEdit-businessDay__container">
                <h3>営業日・営業時間</h3>
                <form className="m-storeEdit-businessDay__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-storeForm__item">
                        <label htmlFor="business_day" className="a-label-required__red">営業日</label>
                        <div className="m-storeForm__item__input">
                            <input type="hidden" name="business_day" ref={register} />
                            <span>営業している曜日をチェックのうえ、営業時間を入力してください。</span>
                            <InputSchedule
                                Info = {StoreInfo}
                            />
                            {dayValidation===true && <p>開店時間・閉店時間どちらも記入してください。</p>}
                        </div>
                    </div>   
                    <div className="m-storeEdit-businessDay__container__form__btn m-storeForm__btn">
                        <BtnSave
                            InputType={"submit"}
                            OnClickFunction={null}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBusinessDays;