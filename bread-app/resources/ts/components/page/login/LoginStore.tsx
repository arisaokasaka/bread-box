import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';

export default function LoginStore() {
    const { register, handleSubmit, errors, getValues } = useForm();
    const [emailError, SetEmailError] = useState(false);
  
    const onSubmit = (data) => {
    //     SetEmailError(false);
    //     console.log(data);
    //     axios.post('/api/create_store', data)
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
        <div className = "p-login-store">
            <div className = "p-login-store__container">
                
                <form className="p-login-store__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <h2>店舗ログイン</h2>

                    <label htmlFor="store_email">メールアドレス</label>
                    <input type="email" name="email" id="store_email" ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                
                    <label htmlFor="store_password">パスワード</label>
                    <input type="password" name="password" id="store_password" ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})}/>
                    
                    <input type="submit" value="ログインする"/>
                </form>

                <div className = "p-login-store__container__links">
                    <span>新規登録は<Link to="/register_store">こちら</Link></span>
                    <span>パスワードを忘れた方は<Link to="/password_store">こちら</Link></span>
                </div>
            </div>
        </div>
    )
}
