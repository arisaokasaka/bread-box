import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';

    
export default function LoginUser() {
    const { register, handleSubmit, errors, getValues } = useForm();
    // axios.defaults.headers.common['X-CSRF-TOKEN'] = 
    //     document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    // // $.ajaxSetup({
    // //     headers: {
    // //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    // //     }
    // //     });
    // let csrf:any;
    // csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const onSubmit = (data) => {
        // console.log(data);
        // console.log(axios.defaults);
        // axios.post('/api/login', data)
        // .then(res => {
        //     console.log(res);
        // })
        // .catch(errors => {
        //     console.log(errors.response);
        //     console.log(errors.response.status);
        // });
    }

    return (
        <div className = "p-login-user">
            <div className = "p-login-user__container">
                
                <form className="p-login-user__container__form" onSubmit={handleSubmit(onSubmit)}>
                    {/* <input type="hidden" name="_token" value={csrf}/>
                    {csrf} */}
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
