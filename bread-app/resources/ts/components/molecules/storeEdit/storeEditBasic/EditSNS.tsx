import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

type Props = ({
    update_function: Function
    storeInfo: any
})

const EditSNS: React.FC<Props> = ({update_function, storeInfo}) => {
    const { register, handleSubmit } = useForm();
    const { state } = useContext(UserAuthContext);
    let snsSubmitted: object = {
        instagram: '',
        twitter: '',
        facebook: '',
        other: ''
    };
    let defaultData: any;

    // StoreInfo.snsにデータがあれば、defaultDataにそのデータを設定・defaultValueに反映
    if(storeInfo.sns){
        defaultData = JSON.parse(storeInfo.sns)
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
        snsSubmitted['instagram'] = data['instagram'];
        snsSubmitted['twitter'] = data['twitter'];
        snsSubmitted['facebook'] = data['facebook'];
        snsSubmitted['other'] = data['other'];
        data['sns'] = snsSubmitted;
        data['user_uuid'] = state.uuid;
        
        axios.post("/api/update_sns", data)
        .then(res => {
            update_function();
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
                            <input type="url" name="instagram" placeholder="InstagramアカウントのURLを入力してください。" defaultValue={defaultData.instagram} ref={register}/>
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>Twitter</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" name="twitter" placeholder="TwitterアカウントのURLを入力してください。" defaultValue={defaultData.twitter} ref={register}/>
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>Facebook</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" name="facebook" placeholder="FacebookアカウントのURLを入力してください。" defaultValue={defaultData.facebook} ref={register}/>
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>その他</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" name="other" placeholder="その他あれば、URLを入力してください。" defaultValue={defaultData.other} ref={register}/>
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