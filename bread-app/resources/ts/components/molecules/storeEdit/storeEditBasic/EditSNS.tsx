import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

type BasicProps = ({
    StoreInfo: any;
});

const EditSNS: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit } = useForm();
    const { state } = useContext(UserAuthContext);
    let sns: object;
    let defaultData: any;

    // StoreInfo.snsにデータがあれば、defaultDataにそのデータを設定・defaultValueに反映
    if(StoreInfo.sns){
        defaultData = JSON.parse(StoreInfo.sns)
    }else{
        defaultData = {
            instagram: '',
            twitter: '',
            facebook: '',
            other: '',
        }
    }

    // SNS情報の送信
    const onSubmit = (data) => {
        //snsをまとめたobject作成し、objectを送信
        sns['instagram'] = data['instagram'];
        sns['twitter'] = data['twitter'];
        sns['facebook'] = data['facebook'];
        sns['other'] = data['other'];
        data['sns'] = sns;
        data['user_uuid'] = state.uuid;
        
        axios.post("/api/update_sns", data)
        .then(res => {
            alert('保存しました。')
        })
        .catch(err => {
            alert('保存に失敗しました。')
        });
    }

    return(
        <div className = "m-storeEdit-SNS">
            <div className = "m-storeEdit-SNS__container">
                <h3>SNS</h3>
                <span>お持ちのSNSのURLを入力してください。</span>    
                <form className="m-storeEdit-SNS__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>Instagram</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" name="instagram" defaultValue={defaultData.instagram} ref={register}/>
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>Twitter</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" name="twitter" defaultValue={defaultData.twitter} ref={register}/>
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>Facebook</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" name="facebook" defaultValue={defaultData.facebook} ref={register}/>
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>その他</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" name="other" defaultValue={defaultData.other} ref={register}/>
                        </div>
                    </div>
                    <div className="m-storeEdit-SNS__container__form__btn m-storeForm__btn">
                        <BtnSave
                            InputType={"submit"}
                            OnClickFunction={null}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSNS;