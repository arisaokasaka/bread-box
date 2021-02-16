import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import InputSchedule from '../../InputSchedule';
import BtnSave from '../../../atoms/buttons/BtnSave';
import week from '../../../../info/Week';

type BasicProps = ({
    StoreInfo: any;
});

const EditBusinessDays: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit, errors} = useForm();
    const [ dayValidation, setDayValidation ] = useState(false);
    const { state } = useContext(UserAuthContext);
    let defaultData: Object;

    // useEffect(()=>{
    //     getDefaultData(StoreInfo);
    // },[])

    // // 既に保存されている情報を取得
    // const getDefaultData = (info) => {
    //     if(info.business_day){
    //         defaultData = JSON.parse(info.business_day)
    //     }
    // }

    const onSubmit = (data) => {
        let business_day = {};
        let business_day_check = false;
        setDayValidation(false);

        // その曜日にチェック入ってるか確認のうえ、営業時間データを挿入
        week.week.map((day)=>{
            let checkbox = document.getElementById(day.id + '_checked') as HTMLInputElement;
            let open = document.getElementsByName(day.id + '_open')[0] as HTMLInputElement;
            let close = document.getElementsByName(day.id + '_close')[0] as HTMLInputElement;
            
            if(checkbox.checked){
                if(open.value && close.value){                    
                    business_day[day.id] = [ open.value, close.value]
                    business_day_check = true;
                }else{
                    setDayValidation(true);
                }
            }            
        })

        if(business_day_check) {
            //更新データ送信
            data['user_uuid'] = state.uuid;
            data['business_day'] = JSON.stringify(business_day);
            console.log(data);
            axios.post("/api/update_businessDay", data)
            .then(res => {
                alert('保存しました');
            })
            .catch(err => {
                alert('保存に失敗しました。');
            });
        }
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