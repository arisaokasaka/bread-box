import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

type Props = ({
    update_function: Function
    storeInfo: any
})

const EditBasicInfo: React.FC<Props> = ({update_function, storeInfo}) => {
    const { register, handleSubmit, errors } = useForm();
    const { state } = useContext(UserAuthContext);
    const [ textarea_count, setTextarea_count ] = useState(0);

    //送信時の動作
    const onSubmit = (data) => {
        data['user_uuid'] = state.uuid;
        updateBasicInfo_storesTable(data);
        updateBasicInfo_usersTable(data);
        update_function();
        alert('保存しました。');
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

    return(
        <div className = "m-storeEdit-basic">
            <div className = "m-storeEdit-basic__container">
                <h3>基本情報編集</h3>
                <form className="m-storeEdit-basic__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_name" className="a-label-required__red">店舗名</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <input type="text" name="name" id="store_name" defaultValue={storeInfo.name} ref={ register({required: true})} />
                            {errors.name && <p>店舗名は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_address" className="a-label-required__red">住所</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <input type="text" name="address" id="store_address" defaultValue={storeInfo.address} ref={register({required: true})}/>
                            {errors.address && <p>住所は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_email" className="a-label-required__red">メールアドレス</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <input type="email" name="email" id="store_email" defaultValue={storeInfo.email} ref={register({required: true})}/>
                            {errors.email && <p>メールアドレスは必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                        <label htmlFor="store_tel">電話番号(半角)</label>
                        <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                            <span>半角で入力してください。(ハイフンなし)</span>
                            <input type="tel" name="tel" id="store_tel" defaultValue={storeInfo.tel} ref={register({pattern: /[0-9]/, maxLength: 11, minLength:10})}/>
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
                                defaultValue={storeInfo.message}
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