import React from 'react';
import {useForm} from 'react-hook-form';
import bread_kinds from '../../../../info/Bread_kinds';
import BtnSave from '../../../atoms/buttons/BtnSave';

export default function MenuCreate() {
    const { register, handleSubmit, errors} = useForm();
  
    const onSubmit = (data) => {
        console.log(data);
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
                            <input name="bread_img" type="file" accept="image/*"/>
                        </div>
                    </div>
                    <div className="m-storeEdit-menuCreate__container__form__btn m-storeForm__btn">
                        <BtnSave
                            InputType={"submit"}
                            OnClickFunction={onSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
