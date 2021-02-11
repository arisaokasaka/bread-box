import React, { useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import InputSchedule from '../../molecules/InputSchedule';
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
    const { register, handleSubmit, errors, getValues } = useForm();
    const history = new useHistory();
    const [emailError, SetEmailError] = useState(false);
    let business_day = {};

    const onSubmit = (data) => {
        week.week.map((day)=>{
            let open = document.getElementsByName(day.id + '_open')[0] as HTMLInputElement;
            let close = document.getElementsByName(day.id + '_close')[0] as HTMLInputElement;
            if(open.value && close.value) business_day[day.id] = [open.value, close.value];
        })

        SetEmailError(false);
        console.log(data);
        data['business_day'] = JSON.stringify(business_day);
        axios.post('/api/create_store', data)
        .then(res => {
            console.log(res);
            history.push("/search");
        })
        .catch(errors => {
            console.log(errors);
            if(errors.response.status === 422){
                SetEmailError(true);
            }
        });
    }

    return (
        <div className = "p-register-store">
            <div className = "p-register-store__container">
                <h2>新規店舗登録(無料)</h2>
                <p>店舗情報が最新のものであることをご確認のうえ、ご入力ください。</p>
                <div className = "p-register-store__container__links">
                    <span>既に登録済ですか？<Link to="/login_store">店舗ログイン</Link></span>
                </div>
                <form className="p-register-store__container__form m-storeForm" name="form_storeRegister" onSubmit={handleSubmit(onSubmit)}>
                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_name" className="a-label-required__red">店舗名</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="text" id="store_name" name="name" ref={ register({required: true})} />
                            {errors.name && <p>店舗名は必須です。</p>}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_email" className="a-label-required__red">メールアドレス</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="email" name="email" id="store_email" ref={register({required: true, pattern: /[^\s]+@[^\s]+/})}/>
                            {errors.email && <p>メールアドレスは必須です。</p>}
                            {errors.email && errors.email.type === "pattern" && (<p>@を含めたメールアドレスを指定してください。</p>)}
                            {emailErrorMessage(emailError)}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_address" className="a-label-required__red">住所</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="text" name="address" id="store_address" ref={register({required: true})}/>
                            {errors.address && <p>住所は必須です。</p>}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_tel" className="a-label-required__red">電話番号</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <span>半角で入力してください。(ハイフンなし)</span>
                            <input type="tel" name="tel" id="store_tel" ref={register({required: true, pattern: /[0-9]/, maxLength: 11, minLength:10})}/>
                            {errors.tel && errors.tel.type === "required" && (<p>電話番号は必須です。</p>)}
                            {errors.tel && errors.tel.type === "pattern" && (<p>半角数字で指定してください。</p>)}
                            {errors.tel && errors.tel.type === "minLength" && (<p>10～11文字で入力してください。</p>)}
                            {errors.tel && errors.tel.type === "maxLength" && (<p>10～11文字で入力してください。</p>)}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_password" className="a-label-required__red">パスワード</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="password" name="password" id="store_password" ref={register({required: true, pattern: /[a-zA-Z0-9!-[/:-@-`{-~]/, minLength: 8, maxLength: 16})}/>
                            {errors.password && errors.password.type === "required" && (<p>パスワードは必須です。</p>)}
                            {errors.password && errors.password.type === "pattern" && (<p>半角英数字で指定してください。</p>)}
                            {errors.password && errors.password.type === "minLength" && (<p>8文字以上で指定してください。</p>)}
                            {errors.password && errors.password.type === "maxLength" && (<p>16文字以下で指定してください。</p>)}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_password-check" className="a-label-required__red">確認用パスワード</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="password" name="password_check" id="store_password-check" ref={register({required: true})}/>
                            {errors.password_check && errors.password_check.type === "required" && (<p>確認用パスワードは必須です。</p>)}
                            {PasswordErrorMessage(getValues('password'),getValues('password_check'))}
                        </div>
                    </div>

                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="business_day" className="a-label-required__red">営業日・営業時間</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="hidden" name="business_day" ref={register} />
                            <span>営業している曜日をチェックのうえ、営業時間を入力してください。</span>
                            <InputSchedule/>
                        </div>
                    </div>
                  
                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label>営業に関する備考</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <span>【例1】定休日：第3水曜日<br></br>【例2】祝日、お盆、年末年始はお休みです。</span>
                            <textarea name="business_memo" ref={register}/>
                        </div>
                    </div>

                    <input
                        className = "p-register-store__container__form__input--submit"
                        type="submit"
                        value="登録する"
                    />
                </form>
            </div>
        </div>
    )
}
