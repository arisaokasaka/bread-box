import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';

export default function PasswordReset_store() {
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
        <div className = "p-password-reset-store">
            <div className = "p-password-reset-store__container">
                
                <form className="p-password-reset-store__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <h2>店舗パスワード再設定</h2>

                    <label htmlFor="store_email">メールアドレス</label>
                    <input type="email" name="email" id="store_email" ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                
                    <input type="submit" value="再設定メールを送信"/>
                </form>

                <div className = "p-password-reset-store__container__links">
                    <Link to="/login_store">ログインはこちら</Link>
                    <Link to="/">トップページへ戻る</Link>
                </div>
            </div>
        </div>
    )
}
