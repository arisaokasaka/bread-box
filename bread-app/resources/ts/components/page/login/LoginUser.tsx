import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const LoginUser: React.FC = () =>  {  
    const { state, dispatch } = useContext(UserAuthContext);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginError, setLoginError ] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const history = new useHistory();
    
    // ログイン機能
    const login = () => {
        if(state.uuid) {
            alert('既にログインされています。ログアウトしてから、再度ログインしてください。')
        } else {
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
    }

    const guest_login = () => {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        axios.get("/sanctum/csrf-cookie").then(response => {
            axios.post("/api/login", {
                email: 'guest@user',
                password: 'guestuser'
            })
            .then(res => {
                dispatch({
                    type: 'setUser',
                    payload: res.data.user.uuid,
                });
                history.push("/user");
            })
            .catch(err => {
                alert('申し訳ありません。何らかの不具合が発生したようです。')
            });
        })
        .catch(err => {
        })
    }

    let csrf:any = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return (
        <div className = "p-login-user">
            <div className = "p-login-user__container">
                <form className="p-login-user__container__form" onSubmit={handleSubmit(login)}>
                    <h2>ログイン</h2>
                    <input type='hidden' name='_token' value={csrf} />
                    
                    <label htmlFor="user_email">メールアドレス</label>
                    <input type="email" name="email" id="user_email" onChange={e => setEmail(e.target.value)} ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                
                    <label htmlFor="user_password">パスワード</label>
                    <input type="password" name="password" id="user_password" onChange={e => setPassword(e.target.value)} ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})}/>
                    {errors.password && <p>パスワードは必須です。</p>}
                    
                    {loginError && <p>メールアドレスもしくはパスワードが誤っています。</p>}

                    <input className="round" type="submit" value="ログインする"/>
                </form>

                <div className = "p-login-user__container__links">
                    <span>新規登録は&nbsp;<Link to="/register_user">こちら</Link></span>
                    <span>パスワードを忘れた方は&nbsp;<Link to="/password_reset_request">こちら</Link></span>
                    <span>ユーザー機能を試してみますか？&nbsp;<a onClick={guest_login}>ゲストログイン</a></span>
                </div>
            </div>
        </div>
    )
}

export default LoginUser;