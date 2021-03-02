import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

const EditBasicInfo: React.FC = () => {
    const { register, handleSubmit, errors } = useForm();
    const { state } = useContext(UserAuthContext);
    const { stateInfo, dispatch } = useContext(StoreInfoContext);    
    const [ textarea_count, setTextarea_count ] = useState(0);
    let StoreInfo = {
        name: '',
        address: '',
        tel: '',
        email: '',
        message: ''
    }

    if(stateInfo.storeInfo){
        StoreInfo = stateInfo.storeInfo;
    }

    //送信時の動作
    const onSubmit = (data) => {
        data['user_uuid'] = state.uuid;
        updateBasicInfo_storesTable(data);
        updateBasicInfo_usersTable(data);
        getStoreInfo();
    }

    // アップデート機能（storesテーブル）
    const updateBasicInfo_storesTable = (data) => {
        axios.post("/api/update_basicInfo_storesTable", data)
        .then(res => {
        })
        .catch(err => {
        });
    }

    // アップデート機能（usersテーブル）
    const updateBasicInfo_usersTable = (data) => {
        axios.post("/api/update_basicInfo_usersTable", data)
        .then(res => {
        })
        .catch(err => {
        });
    }

    // 店舗情報取得＆更新
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            store_uuid: state.uuid
        })
        .then(res => {
            dispatch({
                type: 'inputStoreInfo',
                payload: res.data,
            });
        })
        .catch(err => {
        });
    }

    return(
        <div className = "m-storeEdit-basic">
            <div className = "m-storeEdit-basic__container">
                <h3>基本情報編集</h3>
                <form className="m-storeEdit-basic__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_name" className="a-label-required__red">店舗名</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <input type="text" name="name" id="store_name" defaultValue={StoreInfo.name} ref={ register({required: true})} />
                            {errors.name && <p>店舗名は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_address" className="a-label-required__red">住所</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <input type="text" name="address" id="store_address" defaultValue={StoreInfo.address} ref={register({required: true})}/>
                            {errors.address && <p>住所は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_email" className="a-label-required__red">メールアドレス</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <input type="email" name="email" id="store_email" defaultValue={StoreInfo.email} ref={register({required: true})}/>
                            {errors.email && <p>メールアドレスは必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_tel">電話番号(半角)</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <span>半角で入力してください。(ハイフンなし)</span>
                            <input type="tel" name="tel" id="store_tel" defaultValue={StoreInfo.tel} ref={register({pattern: /[0-9]/, maxLength: 11, minLength:10})}/>
                            {errors.tel && errors.tel.type === "pattern" && (<p>半角数字で指定してください。</p>)}
                            {errors.tel && errors.tel.type === "minLength" && (<p>10～11文字で入力してください。</p>)}
                            {errors.tel && errors.tel.type === "maxLength" && (<p>10～11文字で入力してください。</p>)}
                        </div>
                    </div>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_message">店舗説明</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <span>お店のページの最初に表示される部分です。</span>
                            <textarea name="message"
                                id="store_message"
                                defaultValue={StoreInfo.message}
                                ref={register({maxLength: 255})}
                                onChange={(e)=>{setTextarea_count(e.target.value.length)}}
                            />
                            {textarea_count > 255 && <p>255文字以内で入力してください。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-basic__container__form__btn m-storeForm__btn">
                        <BtnSave
                            InputType={"submit"}
                            OnClickFunction={null}
                            className={"full"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditBasicInfo;