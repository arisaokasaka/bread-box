import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const LoginStore: React.FC = () => {
    const { register, handleSubmit, errors } = useForm();
    const { dispatch } = useContext(UserAuthContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginError, setLoginError ] = useState(false);
    const history = new useHistory();
    let csrf:any = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    // ログイン
    const login = () => {        
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        axios.get("/sanctum/csrf-cookie").then(response => {
            axios.post("/api/login", {
                email,
                password
            })
            .then(res => {
                if(res.data.user.type_user === "user") {
                    dispatch({
                        type: 'setUser',
                        payload: res.data.user.uuid,
                    });
                    history.push("/user");
                } else if(res.data.user.type_user === "store"){
                    dispatch({
                        type: 'setStore',
                        payload: res.data.user.uuid,
                    });
                    history.push("/store_edit");
                } else {
                    alert('何らかのエラーが発生したようです。')
                }
            })
            .catch(err => {
                if(err.toString().match('422')){
                    setLoginError(true);
                }
            });
        })
        .catch(err => {
        })
    }
    
    const guest_login = () => {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        axios.get("/sanctum/csrf-cookie").then(response => {
            axios.post("/api/login", {
                email: 'guest@store.com',
                password: 'gueststore'
            })
            .then(res => {
                dispatch({
                    type: 'setStore',
                    payload: res.data.user.uuid,
                });
                history.push("/store_edit");
            })
            .catch(err => {
                alert('何らかのエラーが発生したようです。')
            });
        })
        .catch(err => {
        })
    }

    return (
        <div className = "p-login-store">
            <div className = "p-login-store__container">
                
                <form className="p-login-store__container__form" onSubmit={handleSubmit(login)}>
                    <h2>店舗ログイン</h2>
                    <input type='hidden' name='_token' value={csrf} />

                    <label htmlFor="store_email">メールアドレス</label>
                    <input type="email" name="email" id="store_email" onChange={e => setEmail(e.target.value)} ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                
                    <label htmlFor="store_password">パスワード</label>
                    <input type="password" name="password" id="store_password" onChange={e => setPassword(e.target.value)} ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})}/>
                    {errors.password && errors.password.type === "required" && (<p>パスワードは必須です。</p>)}
                    {errors.password && errors.password.type === "pattern" && (<p>8文字以上16文字以下の半角英数字で指定してください。</p>)}
                        
                    {loginError && <p>メールアドレスもしくはパスワードが誤っています。</p>}

                    <input type="submit" value="ログインする"/>
                </form>

                <div className = "p-login-store__container__links">
                    <span>新規登録は<Link to="/register_store">こちら</Link></span>
                    <span>パスワードを忘れた方は<Link to="/password_reset_request">こちら</Link></span>
                    <span>まずは試してみますか？<a onClick={guest_login}>ゲストログイン</a></span>
                </div>
            </div>
        </div>
    )
}

export default LoginStore;