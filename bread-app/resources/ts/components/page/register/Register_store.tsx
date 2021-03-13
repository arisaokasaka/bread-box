import React, { useState, useContext } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {UserAuthContext} from '../../../contexts/UserAuthContext';

export default function Register_store() {
    const { register, handleSubmit, errors, getValues } = useForm();
    const history = new useHistory();
    const [emailError, SetEmailError] = useState(false);
    const { dispatch } = useContext(UserAuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let csrf:any = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    //メアドが既に登録されていた場合のエラーメッセージ
    const emailErrorMessage = (emailError) => {
        if(emailError){
            return(<p>既に登録されているメールアドレスです。</p>);
        }else{
            return null;
        }
    };

    //パスワードが一致しない場合のエラーメッセージ
    const PasswordErrorMessage = (original, check) => {
        if(original===check){
            return null;
        }else{
            return (<p>パスワードが一致していません。</p>);
        }
    };

    //新規登録機能
    const onSubmit = (data) => {
        SetEmailError(false);
        data['type_user'] = 'store';
        axios.post('/api/create_user', data)
        .then(res => {
            login();
            history.push("/store_edit");
        })
        .catch(errors => {
            if(errors.response.status === 422){
                SetEmailError(true);
            }
        });
    }

    // ログイン(新規登録時にログインも組み込む) 
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
                let tmp_store_user_uuid;
                tmp_store_user_uuid= res.data.user.uuid
                dispatch({
                    type: 'setStore',
                    payload: tmp_store_user_uuid,
                });
                createStore(tmp_store_user_uuid);
            })
            .catch(err => {
            });
        })
        .catch(err => {
        })
    }

    //storesテーブルにレコード作成(ログイン機能実行時に、こちらも実行)
    const createStore = (data) => {
        let form_data = new FormData();
        form_data.append('user_uuid', data);
        axios.post('/api/create_store', form_data)
        .then(res => {
        })
        .catch(errors => {
        });
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
            });
        })
        .catch(err => {
        })
    }
   
    return (
        <div className = "p-register-store">
            <div className = "p-register-store__container">
                <h2>新規店舗登録(無料)</h2>
                <p>店舗情報が最新のものであることをご確認のうえ、ご入力ください。</p>
                <div className = "p-register-store__container__links">
                    <span>既に登録済ですか？<Link to="/login_store">店舗ログイン</Link></span>
                    <span>まずは試してみますか？<a onClick={guest_login}>ゲストログイン</a></span>
                </div>
                <form className="p-register-store__container__form m-storeForm" name="form_storeRegister" onSubmit={handleSubmit(onSubmit)}>
                    <input type='hidden' name='_token' value={csrf} />
                    <div className = "p-register-store__container__form__item m-storeForm__item first">
                        <label htmlFor="store_name" className="a-label-required__red">店舗名</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="text" id="store_name" name="name" ref={ register({required: true})} />
                            {errors.name && <p>店舗名は必須です。</p>}
                        </div>
                    </div>
                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_email" className="a-label-required__red">メールアドレス</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="email" name="email" id="store_email" onChange={e => setEmail(e.target.value)} ref={register({required: true, pattern: /[^\s]+@[^\s]+/})}/>
                            {errors.email && <p>メールアドレスは必須です。</p>}
                            {errors.email && errors.email.type === "pattern" && (<p>@を含めたメールアドレスを指定してください。</p>)}
                            {emailErrorMessage(emailError)}
                        </div>
                    </div>
                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_address" className="a-label-required__red">住所</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="text" name="address" id="store_address" ref={register({required: true})}/>
                            {errors.address && <p>住所は必須です。</p>}
                        </div>
                    </div>
                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_password" className="a-label-required__red">パスワード</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="password" name="password" id="store_password" onChange={e => setPassword(e.target.value)} ref={register({required: true, pattern: /[a-zA-Z0-9!-[/:-@-`{-~]/, minLength: 8, maxLength: 16})}/>
                            {errors.password && errors.password.type === "required" && (<p>パスワードは必須です。</p>)}
                            {errors.password && errors.password.type === "pattern" && (<p>半角英数字で指定してください。</p>)}
                            {errors.password && errors.password.type === "minLength" && (<p>8文字以上で指定してください。</p>)}
                            {errors.password && errors.password.type === "maxLength" && (<p>16文字以下で指定してください。</p>)}
                        </div>
                    </div>
                    <div className = "p-register-store__container__form__item m-storeForm__item">
                        <label htmlFor="store_password-check" className="a-label-required__red">確認用パスワード</label>
                        <div className = "p-register-store__container__form__item__input m-storeForm__item__input">
                            <input type="password" name="password_check" id="store_password-check" ref={register({required: true})}/>
                            {errors.password_check && errors.password_check.type === "required" && (<p>確認用パスワードは必須です。</p>)}
                            {PasswordErrorMessage(getValues('password'),getValues('password_check'))}
                        </div>
                    </div>
                    <input
                        className = "p-register-store__container__form__input--submit"
                        type="submit"
                        value="登録する"
                    />
                </form>
            </div>
        </div>
    )
}
