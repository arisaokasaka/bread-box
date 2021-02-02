import React from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import bread_kinds from '../../../info/Bread_kinds';

export default function StoreEditTable_menuCreate() {
    const { register, handleSubmit, errors} = useForm();
  
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className = "m-storeEdit-menu-create">
            <div className = "m-storeEdit-menu-create__container">
                
                <form className="m-storeEdit-menu-create__container__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="m-storeEdit-menu-create__container__form__item">
                        <label htmlFor="bread_name" className="a-label-required">メニュー名</label>
                        <input type="text" id="bread_name" name="bread_name" ref={ register({required: true})} />
                        {errors.bread_name && <p>メニュー名は必須です。</p>}
                    </div>

                    <div className="m-storeEdit-menu-create__container__form__item">
                        <label htmlFor="bread_kind" className="a-label-required">パンの種類</label>
                        <select name="bread_kind" id="bread_kind" ref={register({required: true})}>
                            {bread_kinds.bread_kinds.map((el)=>{
                                return(
                                    <option value={el.name} key = {el.id}>{el.name}</option>
                                );
                            })}
                        </select>
                        {errors.bread_kind && <p>パンの種類は必須です。</p>}
                    </div>

                    <div className="m-storeEdit-menu-create__container__form__item">    
                        <label htmlFor="bread_price">値段</label>
                        <span><input type="number" name="bread_price" id="bread_price" ref={register}/>円</span>
                    </div>

                    <div className="m-storeEdit-menu-create__container__form__item">
                        <label htmlFor="bread_detail">詳細・説明</label>
                        <textarea name="bread_detail" id="bread_detail" ref={register}/>
                    </div>

                    <div className="m-storeEdit-menu-create__container__form__item">
                        <label htmlFor="bread_img">画像アップロード</label>
                        <input name="bread_img" type="file" accept="image/*"/>
                    </div>

                    <div className="m-storeEdit-menu-create__container__form__btn">
                        <input type="submit" value="追加する"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
