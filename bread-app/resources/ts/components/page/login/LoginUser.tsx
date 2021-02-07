import React, { useState, useEffect, createContext } from 'react';
import axios, { AxiosStatic } from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import bootstrap from '../../../bootstrap';

// declare global {
//     interface Window {
//         axios: AxiosStatic;
//     }
//     interface Element {
//         content: string;
//     }
// }


const LoginUser = () =>  {
    useEffect(() => {
            console.log('effect')
            getUser();
    },[]
    );
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const { register, handleSubmit, errors, getValues } = useForm();
    const history = new useHistory();

    //認証ユーザー取得
    const getUser = () => {
        axios.get("/api/user").then(res => {
            console.log('[getUser]ログイン済み');
            console.log(res.data);
        }).catch(err => {
            console.log('[getUser]ログインしてません');
        })
    }
    

    // ログイン
    const login = async e => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        axios.get("/sanctum/csrf-cookie").then(response => {
            axios.post("/api/login", {
                email,
                password
            })
            .then(res => {
                console.log(res);
                setUser(res.data.user);
                history.push("/search")
            })
            .catch(err => {
                console.log(err);
                console.log('[login]fail_post');
            });
            console.log(123);

            console.log(response);
        })
        .catch(err => {
            console.log(err);
            console.log('fail_get');
        })
        
    }

    // ログアウト
    const logout = () => {
        
    axios
        .get("/api/logout")
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
    // // ユーザ情報
    // let userInfo = null;

    // //認証済みの場合、ログアウトボタンとユーザ情報を表示
    // if (user) {
    //     form = <button onClick={logout}>Logout</button>;
    //     userInfo = (
    //         <div>
    //             <h2>User</h2>
    //             <div>name: {user.name}</div>
    //             <div>email: {user.email}</div>
    //         </div>
    //     );
    // }

    // axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    // axios.defaults.withCredentials = true;
    // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    // window.axios = axios;
    // window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    // window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    // let csrf:any;
    // csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    // const onSubmit = (data) => {
    //     console.log(data);
    //     console.log(axios.defaults.headers);
    //     let abc = new FormData();
    //     abc.append('_token', csrf)
    //     abc.append('email', 'pan@pan.com')
    //     abc.append('password', '12121212')

    //     axios.post('api/login', abc)
    //     .then(res => {
    //         alert(123);
    //         console.log(res);
    //     })
    //     .catch(errors => {
    //         console.log(errors.response);
    //         console.log(errors.response.status);
    //     });
    // }
    
    // ログインフォーム
       let csrf:any = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    // let testa= React.createContext('user');
    let form = 
        (<form className="p-login-user__container__form" onSubmit={login}>
            <label onClick = {()=>console.log(user)}>メールアドレス</label>
            <input type='hidden' name='_token' value={csrf} />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label  onClick = {()=>logout()}>パスワード</label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input type="submit" value="ログイン"/>
        </form>);

    return (
        <div className = "p-login-user">
            
            <div className = "p-login-user__container">
                {form}
                {/* <form className="p-login-user__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="_token" value={csrf} ref={register}/>
                    <h2>ログイン</h2>

                    <label htmlFor="user_email">メールアドレス</label>
                    <input type="email" name="email" id="user_email" ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                
                    <label htmlFor="user_password">パスワード</label>
                    <input type="password" name="password" id="user_password" ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})}/>
                    
                    <input type="submit" value="ログインする"/>
                </form> */}

                <div className = "p-login-user__container__links">
                    <span>新規登録は<Link to="/register_user">こちら</Link></span>
                    <span>パスワードを忘れた方は<Link to="/password_user">こちら</Link></span>
                </div>
            </div>
        </div>
    )
}

export default LoginUser;