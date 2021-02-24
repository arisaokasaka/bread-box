import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import BtnBack from '../../atoms/buttons/BtnBack';

const UserEdit: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const { register, handleSubmit, errors } = useForm();
    const [ info, setInfo ] = useState({});
    let userInfo: any = info;
    
    useEffect(()=>{
        index_user();
    },[])

    const index_user = () => {
        axios.post("/api/index_user", {uuid: state.uuid})
        .then(res => {
            setInfo(res.data[0]);
        })
        .catch(err => {
        });
    }

    const update_user = (data) => {
        axios.post("/api/update_user", data)
        .then(res => {
            alert('更新しました。')
        })
        .catch(err => {
            alert('更新に失敗しました。')
        });
    }

    return(
        <div className = "p-userEdit">
            <div className = "p-userEdit__container">
                <form className="p-userEdit__container__form" onSubmit={handleSubmit(update_user)}>
                    <div className = "p-userEdit__container__btn">
                        <BtnBack/>
                    </div>
                    <h2>ユーザー情報編集</h2>
                    <input type="hidden" name="uuid" value={state.uuid} ref={register}/>

                    <label htmlFor="user_name" className="a-label-required">ユーザー名</label>
                    <input type="text" id="user_name" name="name" defaultValue={userInfo.name} ref={register({required: true})} />
                    {errors.name && <p>ユーザー名は必須です。</p>}

                    <label htmlFor="user_email" className="a-label-required">メールアドレス</label>
                    <input type="email" name="email" id="user_email" defaultValue={userInfo.email} ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                    
                    <label htmlFor="user_address">住所</label>
                    <input type="text" name="address" id="user_address" defaultValue={userInfo.address} ref={register}/>
                    
                    <input type="submit" value="更新する"/>

                    <div className = "p-userEdit__container__form__links">
                        <Link to="/password_user">パスワードを再設定する場合</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserEdit;