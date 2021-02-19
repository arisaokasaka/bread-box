import React, { useContext, useState } from 'react';
import Modal_editSpirit from '../../../atoms/modal/Modal_editSpirit';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';

const StoreEditTable_spirit: React.FC = () => {
    const { stateInfo } = useContext(StoreInfoContext);
    const [ isRegisterd, setIsRegisterd ] = useState(false);
    let Spirit: any;
    let funcType: string;
    let btnName: string;
    let content: any;
    
    // メニュー情報があるか判断
    if(stateInfo.menuInfo){
        stateInfo.menuInfo.map((el)=>{
            // menu_type1：パンのメニュー, menu_type2：店のこだわり, menu_type3：店の思い
            el.menu_type === 3 && setIsRegisterd(true);
            Spirit = el;
        })
    }else{
        content = (
            <p>まだ登録されていません。右上のボタンより追加してください。</p>
        );
    }

    // 思い(spirit)が既に登録されているか判断
    if(isRegisterd){
        btnName = '編集する'
        funcType = 'edit'
        content = (
            <div className = "m-storeEdit-spirit__container">
                <div className = "m-storeEdit-spirit__container__item">
                    <label>登録画像</label>
                    <img src="/images/croissant.jpg" alt="思いが伝わる写真"/>
                </div>
                <div className = "m-storeEdit-spirit__container__item">
                    <label>内容</label>
                    <p>{Spirit.spirit}</p>
                </div>
            </div>
        );
    }else{
        btnName = '追加する'
        funcType = 'create'
        content = (
            <p>まだ登録されていません。右上のボタンより追加してください。</p>
        );
    }

    return(
        <div className = "m-storeEdit-spirit">
            <div className = "m-storeEdit-spirit__title">
                <h3>思い</h3>
                <Modal_editSpirit
                    SpiritInfo = {Spirit}
                    btnName = {btnName}
                    menuType = {3}
                    funcType = {funcType}
                />
            </div>
            {content}
        </div>
    );
}

export default StoreEditTable_spirit;