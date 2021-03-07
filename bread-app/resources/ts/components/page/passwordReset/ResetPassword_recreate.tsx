import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Password_recreate: React.FC = () => {
    let { token } = useParams();
    const { register, handleSubmit, errors, getValues } = useForm();
    const history = new useHistory();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState({
        original: '',
        check: '',
    });

    useEffect(()=>{
        checkToken_enabled();
    },[])

    // トークンが有効か確認
    const checkToken_enabled = () => {
        axios.post('/api/check_token', {'token' : token})
        .then(res => {
            console.log(res)
            if(res.data.email){
                setEmail(res.data.email);
            }else{
                history.push('/notfound')
            }
        })
        .catch(errors => {
            history.push('/notfound')
        });
    }
  
    // パスワード変更
    const change_password = (data) => {
        axios.post('/api/change_password', data)
        .then(res => {
            switch(res.data.type_user) {
                case 'user':
                    alert('パスワーを変更しました。')
                    history.push('/login_user')
                    break;
                case 'store':
                    alert('パスワーを変更しました。')
                    history.push('/login_store')
                    break;
            }
        })
        .catch(errors => {
            history.push('/notfound')
        });
    }

    return (
        <div className = "p-password-reset-store">
            <div className = "p-password-reset-store__container">
                
                <form className="p-password-reset-store__container__form" onSubmit={handleSubmit(change_password)}>
                    <h2>パスワード再設定</h2>
                    <input type="hidden" name="email" value={email} ref={register}/>

                    <label htmlFor="user_password" className="a-label-required__red--fitContent">新しいパスワード</label>
                    <input type="password" name="password" id="user_password" ref={register({required: true, pattern: /[a-zA-Z0-9]{8,16}/})} onChange={e=> setPassword({...password, original: e.target.value})}/>
                    {errors.password && errors.password.type === "required" && (<p>パスワードは必須です。</p>)}
                    {errors.password && errors.password.type === "pattern" && (<p>8~16文字の半角英数字で指定してください。</p>)}

                    <label htmlFor="user_password-check" className="a-label-required__red--fitContent">パスワード(確認用)</label>
                    <input type="password" name="password_check" id="user_password-check" onChange={e=> setPassword({...password, check: e.target.value})}/>
                    {errors.password_check && errors.password_check.type === "required" && (<p>パスワード(確認用)は必須です。</p>)}
                    {password.original !== password.check && <p>パスワードが一致していません。</p>}

                    <input type="submit" value="確定する"/>
                </form>

                <div className = "p-password-reset-store__container__links">
                    <span>トップページへ<Link to="/">もどる</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Password_recreate;