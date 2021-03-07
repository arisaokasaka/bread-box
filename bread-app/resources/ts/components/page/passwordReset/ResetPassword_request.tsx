import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Password_reset_request() {
    const { register, handleSubmit, errors, getValues } = useForm();
    const [ sentMail, setSentMail ] = useState(false);
  
    const onSubmit = (data) => {
        axios.post('/api/send_mail', data)
        .then(res => {
            setSentMail(true);
        })
        .catch(errors => {
        });
    }

    return (
        <div className = "p-password-reset-user">
            <div className = "p-password-reset-user__container">
                {sentMail ? 
                    <p>再設定メールを送信しました。</p>
                :
                    <form className="p-password-reset-user__container__form" onSubmit={handleSubmit(onSubmit)}>
                        <h2>パスワード再設定</h2>

                        <label htmlFor="user_email">メールアドレス</label>
                        <input type="email" name="email" id="user_email" ref={register({required: true})}/>
                        {errors.email && <p>メールアドレスは必須です。</p>}
                    
                        <input className="round" type="submit" value="再設定メールを送信"/>
                    </form>
                }
                <div className = "p-password-reset-user__container__links">
                    <span>ログインは<Link to="/login_user">こちら</Link></span>
                    <span>トップページへ<Link to="/">もどる</Link></span>
                </div>
            </div>
        </div>
    )
}
