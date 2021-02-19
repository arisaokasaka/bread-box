import React, { useState, useContext } from 'react';
import Modal_editSpirit from "../../../atoms/modal/Modal_editSpirit";
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';

const StoreEditTable_advantage: React.FC = () => {
    const { stateInfo } = useContext(StoreInfoContext);
    const [ isRegisterd, setIsRegisterd ] = useState(false);
    let info = stateInfo.menuInfo;
    let btnName: string;
    let content: any;
    let funcType: string;
    let advantageInfo: any;

    // メニュー情報があるか判断
    if(stateInfo.menuInfo){
        info.map((el)=>{
            // menu_type1：パンのメニュー, menu_type2：店のこだわり, menu_type3：店の思い
            el.menu_type === 2 && setIsRegisterd(true);
            advantageInfo = el;
        })
    }else{
        content = (
            <p>まだ登録されていません。右上のボタンより追加してください。</p>
        );
    }

    // こだわり(advantage)が既に登録されているか判断
    if(isRegisterd){
        btnName = '編集する'
        funcType = 'edit'
        content = (
            <div className = "m-storeEdit-spirit__container">
                <div className = "m-storeEdit-spirit__container__item">
                    <label>登録画像</label>
                    <img src="/images/croissant.jpg" alt="こだわりの写真"/>
                </div>
                <div className = "m-storeEdit-spirit__container__item">
                    <label>内容</label>
                    <p>{advantageInfo.advantage}</p>
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
                <h3>こだわり</h3>
                <Modal_editSpirit
                    SpiritInfo = {advantageInfo}
                    btnName = {btnName}
                    funcType = {funcType}
                    menuType = {2}
                />
            </div>
            {content}
        </div>
    );
}

export default StoreEditTable_advantage;