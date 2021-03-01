import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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

export default function Register_user() {
    const { register, handleSubmit, errors, getValues } = useForm();
    const [emailError, SetEmailError] = useState(false);
    const history = new useHistory();

    const onSubmit = (data) => {
        SetEmailError(false);
        console.log(data);
        axios.post('/api/create_user', data)
        .then(res => {
            history.push("/search");
        })
        .catch(errors => {
            if(errors.response.status === 422){
                SetEmailError(true);
            }
        });
    }

    return (
        <div className = "p-register-user">
            <div className = "p-register-user__container">
                
                <form className="p-register-user__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <h2>新規ユーザー登録</h2>

                    <label htmlFor="user_name" className="a-label-required__red--user">ユーザー名</label>
                    <input type="text" id="user_name" name="name" ref={ register({required: true})} />
                    {errors.name && <p>ユーザー名は必須です。</p>}

                    <label htmlFor="user_email" className="a-label-required__red--user">メールアドレス</label>
                    <input type="email" name="email" id="user_email" ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                    {emailErrorMessage(emailError)}
                    
                    <label htmlFor="user_address">住所</label>
                    <input type="text" name="address" id="user_address" ref={register}/>
                    
                    <label htmlFor="user_password" className="a-label-required__red--user">パスワード</label>
                    <input type="password" name="password" id="user_password" ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})}/>
                    {errors.password && errors.password.type === "required" && (<p>パスワードは必須です。</p>)}
                    {errors.password && errors.password.type === "pattern" && (<p>8~16文字の半角英数字で指定してください。</p>)}

                    <label htmlFor="user_password-check" className="a-label-required__red--user">パスワード(確認用)</label>
                    <input type="password" name="password_check" id="user_password-check" ref={register({required: true})}/>
                    {errors.password_check && errors.password_check.type === "required" && (<p>パスワード(確認用)は必須です。</p>)}
                    {PasswordErrorMessage(getValues('password'),getValues('password_check'))}
                    
                    <input className="round" type="submit" value="登録する"/>
                </form>

                <div className = "p-register-user__container__links">
                    <span>既にご登録済ですか？&nbsp;<Link to="/login_user">ログイン</Link></span>
                </div>
            </div>
        </div>
    )
}
