import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import bread_kinds from '../../../../info/Bread_kinds';
import BtnSave from '../../../atoms/buttons/BtnSave';
import BtnReset from '../../../atoms/buttons/BtnReset';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';

const MenuCreate: React.FC = () =>  {
    const { register, handleSubmit, errors} = useForm();
    const { state } = useContext(UserAuthContext);
    const { dispatch } = useContext(StoreInfoContext);
    const [ file, setFile ] = useState(null);
    const [ fileSize, setFileSize ] = useState(0);
    let error_fileSize: any = null;

    // 送信機能
    const onSubmit = (data) => {
        if(fileSize <= 3000000){
            data['menu_type'] = 1;
            data['store_uuid'] = state.uuid;
            console.log(file);
            createMenu(data, file);
        }else{
            alert('画像ファイルが上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。');
        }
    }

    // 画像ファイル取得
    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        setFileSize(e.target.files[0].size);
    }

    // ファイルサイズが3MBを超えていた場合のエラーメッセージ
    if(fileSize > 3000000){
        error_fileSize = (
            <p>ファイルの上限サイズ3MBを超えています。圧縮するか、別の画像を選択してください。</p>
        );
    }

    // store_menusテーブルにレコード作成
    const createMenu = (data, fileSubmitted) => {
        let dataSubmit = new FormData();
        dataSubmit.append("bread_img", fileSubmitted)
        for( let el in data){
            dataSubmit.append(el, data[el])
        }
        axios({
            url: '/api/create_store_menu',
            method: "post",
            data: dataSubmit,
        })
        .then(res => {
            getMenuInfo();
            alert('メニューを追加しました。追加したメニューは、メニュー一覧から確認できます。');
        })
        .catch(errors => {
            alert('メニューの追加に失敗しました。')
        });
    }

    // メニュー情報取得
    const getMenuInfo = () => {
        axios.post("/api/index_menuInfo", {
            store_uuid: state.uuid
        })
        .then(res => {
            dispatch({
                type: 'inputMenuInfo',
                payload: res.data,
            });
        })
        .catch(err => {
        });
    }

    return (
        <div className = "m-storeEdit-menuCreate">
            <h3>メニュー追加</h3>
            <div className = "m-storeEdit-menuCreate__container">
                <form className="m-storeEdit-menuCreate__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_name" className="a-label-required__red">メニュー名</label>
                        <div className="m-storeForm__item__input">
                            <input type="text" id="bread_name" name="bread_name" ref={ register({required: true})} />
                            {errors.bread_name && <p>メニュー名は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_kind" className="a-label-required__red">パンの種類</label>
                        <div className="m-storeForm__item__input">
                            <select name="bread_kind" id="bread_kind" ref={register({required: true})}>
                                {bread_kinds.bread_kinds.map((bread)=>(
                                    <option value={bread.name} key = {bread.id}>{bread.name}</option>
                                ))}
                            </select>
                            {errors.bread_kind && <p>パンの種類は必須です。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">    
                        <label htmlFor="bread_price">値段</label>
                        <div className="m-storeForm__item__input a-label-yen">
                            <input type="number" name="bread_price" id="bread_price" ref={register}/>
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_detail">詳細・説明</label>
                        <div className="m-storeForm__item__input">
                            <textarea name="bread_detail" id="bread_detail" ref={register}/>
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__item m-storeForm__item">
                        <label htmlFor="bread_img">画像アップロード</label>
                        <div className="m-storeForm__item__input">
                            <input type="file" accept="image/*" onChange={(e)=>onChangeFile(e)}/>
                            {error_fileSize}
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__btn m-storeForm__btn">
                        <BtnReset />
                        <BtnSave
                            InputType={"submit"}
                            OnClickFunction={null}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MenuCreate;