import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserAuthContext } from '../../../../contexts/UserAuthContext';
import BtnSave from '../../../atoms/buttons/BtnSave';

type Props = ({
    update_function: Function
    storeInfo: any
})

const EditBusinessMemo: React.FC<Props> = ({update_function, storeInfo}) => {
    const [ textarea_count, setTextarea_count ] = useState(0);
    const { register, handleSubmit, errors} = useForm();
    const { state } = useContext(UserAuthContext);

    // アップデート機能
    const updateBusinessMemo = (data) => {
        data['user_uuid'] = state.uuid;
        axios.post("/api/update_businessMemo", data)
        .then(res => {
            update_function();
            alert('保存しました。')
        })
        .catch(err => {
            alert('保存に失敗しました。')
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
                            <span>定休日や営業時間備考、その他お知らせを記載してください。</span>
                            <textarea
                                name="business_memo"
                                defaultValue={storeInfo.business_memo}
                                ref={register({maxLength: 255})}
                                onChange={(e)=>{setTextarea_count(e.target.value.length)}}
                            />
                            {textarea_count > 255 && <p>255文字以内で入力してください。</p>}
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