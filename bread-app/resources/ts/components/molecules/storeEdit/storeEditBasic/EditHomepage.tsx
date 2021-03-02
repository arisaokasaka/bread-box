import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import { StoreInfoContext } from '../../../../contexts/StoreInfoContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

const EditHomepage: React.FC = () => {
    const { register, handleSubmit, errors} = useForm();
    const { state } = useContext(UserAuthContext);
    const { stateInfo, dispatch } = useContext(StoreInfoContext);

    let StoreInfo = {
        url: '',
    }

    if(stateInfo.storeInfo){
        StoreInfo = stateInfo.storeInfo;
    }
    
    // アップデート機能
    const updateHomepage = (data) => {
        data['user_uuid'] = state.uuid;
        axios.post("/api/update_homepage", data)
        .then(res => {
            getStoreInfo();
            alert('ホームページを保存しました。')
        })
        .catch(err => {
            alert('ホームページの保存に失敗しました。')
        });
    }

    // 店舗情報取得＆更新
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
        <div className = "m-storeEdit-homepage">
            <div className = "m-storeEdit-homepage__container">
                <h3>ホームページ</h3>
                <form className="m-storeEdit-homepage__container__form m-storeForm" onSubmit={handleSubmit(updateHomepage)}>
                    <div className="m-storeForm__item">
                        <label htmlFor="store_url">ホームページURL</label>
                        <div className="m-storeForm__item__input">
                            <span>ホームページのURLを入力してください。</span>
                            <input type="url" id="store_url" name="url" defaultValue={StoreInfo.url} ref={register({required: true})} />
                            {errors.url && <p>ホームページのURLを記入してください。</p>}
                        </div>
                    </div>
                    <div className="m-storeEdit-homepage__container__form__btn m-storeForm__btn">
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

export default EditHomepage;