import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import InputSchedule from '../../InputSchedule';
import BtnSave from '../../../atoms/buttons/BtnSave';
import week from '../../../../info/Week';

type BasicProps = ({
    StoreInfo: Array<any>;
});

const EditBusinessDays: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit, errors} = useForm();
    const [ alertOpen, setAlertOpenHour ] = useState(false);
    const [ alertClose, setAlertCloseHour ] = useState(false);
    let business_day = {};

    const alertMessage:any = () => {
        if(alertOpen === true && alertClose === false){
            return <p>開店時間・閉店時間どちらも記入してください。</p>
        }else if(alertOpen === true && alertClose === false){
            return <p>開店時間が未記入のものがあります。</p>
        }else if(alertOpen === false && alertClose === true){
            return <p>閉店時間が未記入のものがあります。</p>
        }
    }

    const onSubmit = (data) => {
        let business_day_check = false;
        setAlertOpenHour(false);
        setAlertCloseHour(false);
        console.log('submit')

        week.week.map((day)=>{
            let open = document.getElementsByName(day.id + '_open')[0] as HTMLInputElement;
            let close = document.getElementsByName(day.id + '_close')[0] as HTMLInputElement;
            if(open.value && close.value){
                business_day[day.id] = [open.value, close.value]
                business_day_check = true;
            }else if(open.value && close.value===''){
                console.log('開店')
                setAlertCloseHour(true);
                // alertMessage();
            }else if(close.value && open.value==='' ){
                console.log('heiten')
                setAlertOpenHour(true);
                // alertMessage();
            }
        })

        data['business_day'] = JSON.stringify(business_day);
        
        if(business_day_check) {
            console.log('success')
        }else{
            console.log('false')
        }
    }

    return(
        <div className = "m-storeEdit-businessDay">
            {StoreInfo.map((el)=>{
                return(
                    <div className = "m-storeEdit-businessDay__container" key = {el.uuid}>
                        <h3>営業日・営業時間</h3>
                        <form className="m-storeEdit-businessDay__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="m-storeForm__item">
                                <label htmlFor="business_day" className="a-label-required__red">営業日</label>
                                <div className="m-storeForm__item__input">
                                    <input type="hidden" name="business_day" ref={register} />
                                    <span>営業している曜日をチェックのうえ、営業時間を入力してください。</span>
                                    <InputSchedule/>
                                    {/* {alertMessage} */}
                                </div>
                            </div>   
                            <div className="m-storeEdit-businessDay__container__form__btn m-storeForm__btn">
                                <BtnSave
                                    InputType={"submit"}
                                    OnClickFunction={alertMessage}
                                />
                            </div>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}

export default EditBusinessDays;