import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';

export default function LoginUser() {
    const { register, handleSubmit, errors, getValues } = useForm();
    const [emailError, SetEmailError] = useState(false);
  
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
        <div className = "p-login-user">
            <div className = "p-login-user__container">
                
                <form className="p-login-user__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <h2>ログイン</h2>

                    <label htmlFor="user_email">メールアドレス</label>
                    <input type="email" name="email" id="user_email" ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                
                    <label htmlFor="user_password">パスワード</label>
                    <input type="password" name="password" id="user_password" ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})}/>
                    
                    <input type="submit" value="ログインする"/>
                </form>

                <div className = "p-login-user__container__links">
                    <Link to="/register_user">新規登録はこちら</Link>
                    <Link to="/password_user">パスワードを忘れた方はこちら</Link>
                    <Link to="/login_store">事業主の方はこちら</Link>
                </div>
            </div>
        </div>
    )
}
