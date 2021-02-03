import React, { useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';

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
    const [emailError, SetEmailError] = useState(false);
    const history = new useHistory();
    const [businessDay, SetBusinessDay] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    })

    // function business_day(day){
    //     if(day.checked){
    //     switch(day){
    //         case 'monday':
    //             SetBusinessDay({...businessDay, monday: true});
    //             break;
    //         case 'tuesday':
    //             SetBusinessDay({...businessDay, tuesday: true});
    //             break;
    //         case 'wednensday':
    //             SetBusinessDay({...businessDay, wednesday: true});
    //             break;
    //         }
    //     }
    // }
  
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
                
                <form className="p-register-store__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <h2>新規店舗登録</h2>

                    <label htmlFor="store_name" className="a-label-required">店舗名</label>
                    <input type="text" id="store_name" name="name" ref={ register({required: true})} />
                    {errors.name && <p>店舗名は必須です。</p>}

                    <label htmlFor="store_email" className="a-label-required">メールアドレス</label>
                    <input type="email" name="email" id="store_email" ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                    {emailErrorMessage(emailError)}

                    <label htmlFor="store_address" className="a-label-required">住所</label>
                    <input type="text" name="address" id="store_addr
                    ess" ref={register({required: true})}/>
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
                    
                    <label htmlFor="business_day" className="a-label-required">営業日</label>
                    <span>営業している曜日を全てチェックしてください。</span>
                    <div className = "p-register-store__container__form__week">
                        <div className = "p-register-store__container__form__week__day">
                            <input type="checkbox" id="monday" name="monday" ref={register}/><label htmlFor="monday">月曜日</label>
                        </div>
                        <div className = "p-register-store__container__form__week__day">
                            <input type="checkbox" id="tuesday" name="tuesday" ref={register}/><label htmlFor="tuesday">火曜日</label>
                        </div>
                        <div className = "p-register-store__container__form__week__day">
                            <input type="checkbox" id="wednesday" name="wednesday" ref={register}/><label htmlFor="wednesday">水曜日</label>
                        </div>
                        <div className = "p-register-store__container__form__week__day">
                            <input type="checkbox" id="thursday" name="thursday" ref={register}/><label htmlFor="thursday">木曜日</label>
                        </div>
                        <div className = "p-register-store__container__form__week__day">
                            <input type="checkbox" id="friday" name="friday" ref={register}/><label htmlFor="friday">金曜日</label>
                        </div>
                        <div className = "p-register-store__container__form__week__day">
                            <input type="checkbox" id="saturday" name="saturday" ref={register}/><label htmlFor="saturday">土曜日</label>
                        </div>
                        <div className = "p-register-store__container__form__week__day">
                            <input type="checkbox" id="sunday" name="sunday" ref={register}/><label htmlFor="sunday">日曜日</label>
                        </div>
                    </div>
                    <label>営業日・営業時間備考</label>
                    <span>【記載例】<br></br>定休日：第3水曜日<br></br>営業時間：月～水 9時～19時 / 木～土 8時～13時</span>
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
