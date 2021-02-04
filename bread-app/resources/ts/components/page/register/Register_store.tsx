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
                    <input type="time" name={day.id+"_open"}/>
                    <span>&nbsp;～&nbsp;</span>
                    <input type="time" name={day.id+"_close"}/>
                </div>
            </div>
        );
    }

    const onSubmit = (data) => {
        SetEmailError(false);
        console.log(data);
        axios.post('/api/create_store', data)
        .then(res => {
            console.log(res);
            history.push('/store');
        })
        .catch(errors => {
            console.log(errors.response.data.errors);
            console.log(errors.response.status);
            if(errors.response.status === 422){
                SetEmailError(true);
            }
        });
    }

    return (
        <div className = "p-register-store">
            <div className = "p-register-store__container">
                
                <form className="p-register-store__container__form" name="form_storeRegister" onSubmit={handleSubmit(onSubmit)}>
                    <h2>新規店舗登録</h2>

                    <label htmlFor="store_name" className="a-label-required">店舗名</label>
                    <input type="text" id="store_name" name="name" ref={ register({required: true})} />
                    {errors.name && <p>店舗名は必須です。</p>}

                    <label htmlFor="store_email" className="a-label-required">メールアドレス</label>
                    <input type="email" name="email" id="store_email" ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                    {emailErrorMessage(emailError)}

                    <label htmlFor="store_address" className="a-label-required">住所</label>
                    <input type="text" name="address" id="store_address" ref={register({required: true})}/>
                    {errors.address && <p>住所は必須です。</p>}

                    <label htmlFor="store_tel" className="a-label-required">電話番号(半角)</label>
                    <input type="text" name="tel" id="store_tel" ref={register({required: true, pattern: /[0-9]{10,11}/})}/>
                    {errors.tel && errors.tel.type === "required" && (<p>電話番号は必須です。</p>)}
                    {errors.tel && errors.tel.type === "pattern" && (<p>10~11文字の半角数字で指定してください。</p>)}
                    
                    <label htmlFor="store_password" className="a-label-required">パスワード</label>
                    <input type="password" name="password" id="store_password" ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})}/>
                    {errors.password && errors.password.type === "required" && (<p>パスワードは必須です。</p>)}
                    {errors.password && errors.password.type === "pattern" && (<p>8~16文字の半角英数字で指定してください。</p>)}

                    <label htmlFor="store_password-check" className="a-label-required">パスワード(確認用)</label>
                    <input type="password" name="password_check" id="store_password-check" ref={register({required: true})}/>
                    {errors.password_check && errors.password_check.type === "required" && (<p>パスワード(確認用)は必須です。</p>)}
                    {PasswordErrorMessage(getValues('password'),getValues('password_check'))}
                    
                    <label htmlFor="business_day" className="a-label-required">営業日・営業時間</label>
                    <input type="hidden" name="business_day" ref={register} />
                    <span>営業している曜日を全てチェックしてください。</span>
                    <div className = "p-register-store__container__form__week">
                        {week.week.map((day)=> WeekItem(day))}
                    </div>

                    <label>営業日に関するひとこと</label>
                    <span>【例1】定休日：第3水曜日<br></br>【例2】祝日、お盆、年末年始はお休みです。</span>
                    <textarea name="business_memo" ref={register}/>

                    <input type="submit" value="登録する"/>
                </form>

                <div className = "p-register-store__container__links">
                    <span>ログインは<Link to="/login_store">こちら</Link></span>
                    <span>トップページは<Link to="/">こちら</Link></span>
                </div>
            </div>
        </div>
    )
}
