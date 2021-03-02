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
    const [ image, setImage ] = useState({
        image: null,
        image_size: 0
    })
    let errorMessage_imageSize: any;
    let userInfo: any = info;
    
    useEffect(()=>{
        index_user();
    },[])

    // ユーザー情報取得
    const index_user = () => {
        axios.post("/api/index_user", {uuid: state.uuid})
        .then(res => {
            setInfo(res.data[0]);
        })
        .catch(err => {
        });
    }

    // 送信機能
    const onSubmit = (data) => {
        if(image.image_size <= 3000000){
            let formData = new FormData();
            for( let el in data){
                formData.append(el, data[el])
            }
            update_user(formData, image.image);
        }else{
            alert('ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。');
        }
    }

    // ユーザー情報更新
    const update_user = (data, file) => {
        data.append('image', file);
        axios.post("/api/update_user", data)
        .then(res => {
            alert('更新しました。')
        })
        .catch(err => {
            alert('更新に失敗しました。')
        })
    }

    // 画像ファイル取得
    const onChangeImage = (e) => {
        setImage({
            ...image,
            image: e.target.files[0],
            image_size: e.target.files[0].size
        })
    }

     // ファイルサイズが3MBを超えていた場合のエラーメッセージ
    if(image.image_size > 3000000){
        errorMessage_imageSize = <p>ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。</p>
    }

    return(
        <div className = "p-userEdit">
            <div className = "p-userEdit__container">
                <form className="p-userEdit__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className = "p-userEdit__container__btn">
                        <BtnBack/>
                    </div>
                    <h2>ユーザー情報編集</h2>
                    <input type="hidden" name="uuid" value={state.uuid} ref={register}/>

                    <label htmlFor="user_name" className="a-label-required__red--fitContent">ユーザー名</label>
                    <input type="text" id="user_name" name="name" defaultValue={userInfo.name} ref={register({required: true})} />
                    {errors.name && <p>ユーザー名は必須です。</p>}

                    <label htmlFor="user_email" className="a-label-required__red--fitContent">メールアドレス</label>
                    <input type="email" name="email" id="user_email" defaultValue={userInfo.email} ref={register({required: true})}/>
                    {errors.email && <p>メールアドレスは必須です。</p>}
                    
                    <label htmlFor="user_address">住所</label>
                    <input type="text" name="address" id="user_address" defaultValue={userInfo.address} ref={register}/>

                    <label htmlFor="user_address">プロフィール画像</label>
                    <input type="file" name="image" onChange={onChangeImage}/>
                    {errorMessage_imageSize}

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