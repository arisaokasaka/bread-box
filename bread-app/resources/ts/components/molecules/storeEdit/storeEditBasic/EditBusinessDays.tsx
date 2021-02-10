import React from 'react'
import {useForm} from 'react-hook-form';
import InputSchedule from '../../InputSchedule';
import BtnSave from '../../../atoms/buttons/BtnSave';

type BasicProps = ({
    StoreInfo: Array<any>;
});

const EditBusinessDays: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
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
                                    <span>営業している曜日を全てチェックしてください。</span>
                                    <InputSchedule/>
                                </div>
                            </div>
                            <div className="m-storeForm__item">
                                <label>営業日・営業時間備考</label>
                                <div className="m-storeForm__item__input">    
                                    <span>【記載例】<br></br>定休日：第3水曜日<br></br>営業時間：月～水 9時～19時 / 木～土 8時～13時</span>
                                    <textarea name="business_memo" ref={register}/>
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
                );
            })}
        </div>
    );
}

export default EditBusinessDays;