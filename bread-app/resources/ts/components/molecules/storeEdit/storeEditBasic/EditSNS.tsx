import React from 'react'
import {useForm} from 'react-hook-form';
import BtnSave from '../../../atoms/buttons/BtnSave';

type BasicProps = ({
    StoreInfo: any;
});

const EditSNS: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <div className = "m-storeEdit-SNS">
            <div className = "m-storeEdit-SNS__container" key = {StoreInfo.uuid}>
                <h3>SNS</h3>
                <span>お持ちのSNSのURLを入力してください。</span>    
                <form className="m-storeEdit-SNS__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>Instagram</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" value={StoreInfo.sns} />
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>Twitter</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" value={StoreInfo.sns} />
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>Facebook</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" value={StoreInfo.sns} />
                        </div>
                    </div>
                    <div className = "m-storeEdit-SNS__container__form__sns__item m-storeForm__item">
                        <label>その他</label>
                        <div className = "m-storeEdit-SNS__container__form__sns__item__input m-storeForm__item__input">
                            <input type="url" value={StoreInfo.sns} />
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