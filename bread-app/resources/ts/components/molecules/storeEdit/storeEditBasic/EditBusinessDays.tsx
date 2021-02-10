import React from 'react'
import {useForm} from 'react-hook-form';
import InputSchedule from '../../InputSchedule';

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
                        <form className="m-storeEdit-businessDay__container__form" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="business_day" className="a-label-required">営業日</label>
                            <span>営業している曜日を全てチェックしてください。</span>
                            <InputSchedule/>
                            <label>営業日・営業時間備考</label>
                            <span>【記載例】<br></br>定休日：第3水曜日<br></br>営業時間：月～水 9時～19時 / 木～土 8時～13時</span>
                            <textarea name="business_memo" ref={register}/>
                            
                            <div className="m-storeEdit-businessDay__container__form__btn">
                                <input type="submit" value="変更する"/>
                            </div>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}

export default EditBusinessDays;