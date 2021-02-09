import React, { useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import week from '../../../info/Week';

function emailErrorMessage(emailError){
    if(emailError){
        return(<p>既に登録されているメールアドレスです。</p>);
    }else{
        return null;
    }
};

function PasswordErrorMessage(original, check){
    if(original===check){
        return null;
    }else{
        return (<p>パスワードが一致していません。</p>);
    }
};

export default function Register_store() {
    const { register, handleSubmit, errors, getValues, setValue } = useForm();
    const history = new useHistory();
    const [emailError, SetEmailError] = useState(false);
    const [businessHours, SetBusinessHours] = useState({
        monday_open: null,
        monday_close: null,
        tuesday_open: null,
        tuesday_close: null,
        wednesday_open: null,
        wednesday_close: null,
        thursday_open: null,
        thursday_close: null,
        friday_open: null,
        friday_close: null,
        saturday_open: null,
        saturday_close: null,
        sunday_open: null,
        sunday_close: null,
    })

    const checkBusinessDay = (day) => {
        let checkInfo = document.getElementsByClassName(day.class + ' active');
        let checkInfoArray = Array.from(checkInfo);
        checkInfoArray.forEach
    }

    const handleClick = (targetClass) => {
        let classInfo = document.getElementsByClassName(targetClass);
        let classInfoArray = Array.from(classInfo);
        classInfoArray.forEach(el => {
            if(el.className.includes('active')) {
                el.classList.remove('active') 
            } else {
                el.className += ' active';
            }
        });
    }

    const WeekItem = (day) => {
        let HoursClassName = 'p-register-store__container__form__week__day__hours ' + day.class;
        let BtnClassName = 'p-register-store__container__form__week__day__heading__btn ' + day.class;

        return(
            <div className = "p-register-store__container__form__week__day" key={day.id}>
                <div className = "p-register-store__container__form__week__heading">
                    <label htmlFor={day.id}>{day.name}</label>
                    <div className = {BtnClassName} onClick={()=>handleClick(day.class)}>
                        <span></span>
                    </div>
                </div>
                <div className = {HoursClassName}>
                    <input type="time" name={day.id+"_open"}
                     onChange = {(el) => SetBusinessHours({...businessHours, [el.target.name]: el.target.value})}
                    />
                    <span>&nbsp;～&nbsp;</span>
                    <input type="time" name={day.id+"_close"}
                     onChange = {(el) => SetBusinessHours({...businessHours, [el.target.name]: el.target.value})}
                    />
                </div>
            </div>
        );
    }

    const onSubmit = (data) => {
        SetEmailError(false);

        data['business_day'] = JSON.stringify(businessHours);
        console.log(data);
        // monday : ['23:23', '23:23']
        // axios.post('/api/create_store', data)
        // .then(res => {
        //     console.log(res);
        //     history.push('/store');
        // })
        // .catch(errors => {
        //     console.log(errors.response.data.errors);
        //     console.log(errors.response.status);
        //     if(errors.response.status === 422){
        //         SetEmailError(true);
        //     }
        // });
    }

    return (
        <div className = "p-register-store">
            <div className = "p-register-store__container">
                {/* <div className = "p-register-store__container__links">
                    <span>既にご登録済の方は<Link to="/login_store">こちら</Link></span>
                </div> */}
                <h2>新規店舗登録(無料)</h2>
                <p>店舗情報が最新のものであることをご確認のうえ、ご入力ください。</p>
                <form className="p-register-store__container__form" name="form_storeRegister" onSubmit={handleSubmit(onSubmit)}>
                    <div className = "p-register-store__container__form__item">
                        <label htmlFor="store_name" className="a-label-required__red">店舗名</label>
                        <div className = "p-register-store__container__form__item__input">
                            <input type="text" id="store_name" name="name" ref={ register({required: true})} />
                            {errors.name && <p>店舗名は必須です。</p>}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item">
                        <label htmlFor="store_email" className="a-label-required__red">メールアドレス</label>
                        <div className = "p-register-store__container__form__item__input">
                            <input type="email" name="email" id="store_email" ref={register({required: true})}/>
                            {errors.email && <p>メールアドレスは必須です。</p>}
                            {emailErrorMessage(emailError)}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item">
                        <label htmlFor="store_address" className="a-label-required__red">住所</label>
                        <div className = "p-register-store__container__form__item__input">
                            <input type="text" name="address" id="store_address" ref={register({required: true})}/>
                            {errors.address && <p>住所は必須です。</p>}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item">
                        <label htmlFor="store_tel" className="a-label-required__red">電話番号</label>
                        <div className = "p-register-store__container__form__item__input">
                            <span>半角・ハイフンなしで入力してください。</span>
                            <input type="text" name="tel" id="store_tel" ref={register({required: true, pattern: /[0-9]{10,11}/})}/>
                            {errors.tel && errors.tel.type === "required" && (<p>電話番号は必須です。</p>)}
                            {errors.tel && errors.tel.type === "pattern" && (<p>10~11文字の半角数字で指定してください。</p>)}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item">
                        <label htmlFor="store_password" className="a-label-required__red">パスワード</label>
                        <div className = "p-register-store__container__form__item__input">
                            <input type="password" name="password" id="store_password" ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})}/>
                            {errors.password && errors.password.type === "required" && (<p>パスワードは必須です。</p>)}
                            {errors.password && errors.password.type === "pattern" && (<p>8~16文字の半角英数字で指定してください。</p>)}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item">
                        <label htmlFor="store_password-check" className="a-label-required__red">確認用パスワード</label>
                        <div className = "p-register-store__container__form__item__input">
                            <input type="password" name="password_check" id="store_password-check" ref={register({required: true})}/>
                            {errors.password_check && errors.password_check.type === "required" && (<p>確認用パスワードは必須です。</p>)}
                            {PasswordErrorMessage(getValues('password'),getValues('password_check'))}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item">
                        <label htmlFor="business_day" className="a-label-required__red">営業日・営業時間</label>
                        <div className = "p-register-store__container__form__item__input">
                            <input type="hidden" name="business_day" ref={register} />
                            <span>営業している曜日をチェックのうえ、営業時間を入力してください。</span>
                            <div className = "p-register-store__container__form__week">
                                {week.week.map((day)=> WeekItem(day))}
                            </div>
                        </div>
                    </div>
                    

                    <div className = "p-register-store__container__form__item">
                        <label>営業に関する備考</label>
                        <div className = "p-register-store__container__form__item__input">
                            <span>【例1】定休日：第3水曜日<br></br>【例2】祝日、お盆、年末年始はお休みです。</span>
                            <textarea name="business_memo" ref={register}/>
                        </div>
                    </div>

                    <input className = "p-register-store__container__form__input--submit" type="submit" value="登録する"/>
                </form>
            </div>
        </div>
    )
}
