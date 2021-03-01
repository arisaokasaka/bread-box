import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function PasswordReset_user() {
    const { register, handleSubmit, errors, getValues } = useForm();
    const [ emailError, SetEmailError ] = useState(false);
  
    const onSubmit = (data) => {
    //     SetEmailError(false);
    //     console.log(data);
    //     axios.post('/api/create_user', data)
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(errors => {
    //         console.log(errors.response.data.errors);
    //         console.log(errors.response.status);
    //         if(errors.response.status === 422){
    //             SetEmailError(true);
    //         }
    //     });
    }

    return (
        <div className = "p-password-reset-user">
            <div className = "p-password-reset-user__container">
                
                <form className="p-password-reset-user__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <h2>パスワード再設定</h2>

                    <label htmlFor="user_email">メールアドレス</label>
                    <input type="email" name="email" id="user_email" ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                
                    <input className="round" type="submit" value="再設定メールを送信"/>
                </form>

                <div className = "p-password-reset-user__container__links">
                    <span>ログインは<Link to="/login_user">こちら</Link></span>
                    <span>トップページへ<Link to="/">もどる</Link></span>
                </div>
            </div>
        </div>
    )
}
