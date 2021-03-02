import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

const EditBusinessMemo: React.FC = () => {
    const { register, handleSubmit, errors} = useForm();
    const { state } = useContext(UserAuthContext);
    const { stateInfo, dispatch } = useContext(StoreInfoContext);
       
    let StoreInfo = {
        business_memo: '',
    }

    if(stateInfo.storeInfo){
        StoreInfo = stateInfo.storeInfo;
    }
    
    // アップデート機能
    const updateBusinessMemo = (data) => {
        data['user_uuid'] = state.uuid;
        axios.post("/api/update_businessMemo", data)
        .then(res => {
            getStoreInfo();
            alert('保存しました。')
        })
        .catch(err => {
            alert('保存に失敗しました。')
        });
    }

    // 店舗情報取得
    const getStoreInfo = () => {
        axios.post("/api/index_storeInfo", {
            store_uuid: state.uuid
        })
        .then(res => {
            console.log('storeinfo')
            dispatch({
                type: 'inputStoreInfo',
                payload: res.data,
            });
        })
        .catch(err => {
        });
    }

    return(
        <div className = "m-storeEdit-businessMemo">
            <div className = "m-storeEdit-businessMemo__container">
                <h3>営業に関するお知らせ</h3>
                <form className="m-storeEdit-businessMemo__container__form m-storeForm" onSubmit={handleSubmit(updateBusinessMemo)}>
                    <div className="m-storeForm__item">
                        <label>お知らせ内容</label>
                        <div className="m-storeForm__item__input">
                            <span>【記載例】<br/>定休日：第3水曜日<br/>営業時間：月～水 9時～19時 / 木～土 8時～13時</span>
                            <textarea name="business_memo" defaultValue={StoreInfo.business_memo} ref={register({required: true})} />
                            {errors.business_memo && <p>お知らせ内容を記入してください。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-businessMemo__container__form__btn m-storeForm__btn">
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

export default EditBusinessMemo;