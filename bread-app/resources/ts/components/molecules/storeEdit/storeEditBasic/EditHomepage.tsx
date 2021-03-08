import React, { useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

type Props = ({
    update_function: Function
    storeInfo: any
})

const EditHomepage: React.FC<Props> = ({update_function, storeInfo}) => {
    const { register, handleSubmit, errors} = useForm();
    const { state } = useContext(UserAuthContext);

    // アップデート機能
    const updateHomepage = (data) => {
        data['user_uuid'] = state.uuid;
        axios.post("/api/update_homepage", data)
        .then(res => {
            update_function();
            alert('ホームページを保存しました。')
        })
        .catch(err => {
            alert('ホームページの保存に失敗しました。')
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
                            <input type="url" id="store_url" name="url" defaultValue={storeInfo.url} ref={register} />
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