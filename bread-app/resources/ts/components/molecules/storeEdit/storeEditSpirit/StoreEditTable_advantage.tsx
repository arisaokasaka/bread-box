import React, { useContext } from 'react';
import Modal_editSpirit from "../../../molecules/modal/Modal_editSpirit";
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';

const StoreEditTable_advantage: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const { stateInfo } = useContext(StoreInfoContext);
    let mainContent: any;
    let advantageInfo: any;
    let time_current: string;
    let funcType: string = 'create';
    let btnName: string = '追加する';
    let content: any　= <p>まだ登録されていません。追加するボタンより追加してください。</p>;
    
    // メニュー情報があるか判断
    if(stateInfo.menuInfo){
        stateInfo.menuInfo.map((el)=>{
            // menu_type1：パンのメニュー, menu_type2：店のこだわり, menu_type3：店の思い
            if(el.menu_type === 2){
                advantageInfo = el;
                content = null;
                btnName = '編集する'
                funcType = 'edit'
                time_current = String(Date.now());
                mainContent = (
                    <div className = "m-storeEdit-spirit__container">
                        <div className = "m-storeEdit-spirit__container__item">
                            <label>登録画像</label>
                            <img src={"storage/store/" + state.uuid + "/menu/advantage.jpg?" + time_current} alt="こだわりの写真"/>
                        </div>
                        <div className = "m-storeEdit-spirit__container__item">
                            <label>内容</label>
                            <p>{el.advantage}</p>
                        </div>
                    </div>
                )
            }
        })    
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
            {mainContent}
        </div>
    );
}

export default StoreEditTable_advantage;