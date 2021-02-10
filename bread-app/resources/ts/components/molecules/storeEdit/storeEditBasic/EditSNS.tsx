import React from 'react'
import {useForm} from 'react-hook-form';

type BasicProps = ({
    StoreInfo: Array<any>;
});

const EditSNS: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <div className = "m-storeEdit-SNS">
            {StoreInfo.map((el)=>{
                return(
                    <div className = "m-storeEdit-SNS__container" key = {el.uuid}>
                        <form className="m-storeEdit-SNS__container__form" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="store_url">SNS</label>
                            <span>お持ちのSNSのURLを入力してください。</span>
                            <div className="m-storeEdit-SNS__container__form__sns">
                                <div className = "m-storeEdit-SNS__container__form__sns__item">
                                    <a>Instagram</a><input type="url" value={el.sns.instagram} />
                                </div>
                                <div className = "m-storeEdit-SNS__container__form__sns__item">
                                    <a>Twitter</a><input type="url" value={el.sns.twitter} />
                                </div>
                                <div className = "m-storeEdit-SNS__container__form__sns__item">
                                    <a>Facebook</a><input type="url" value={el.sns.facebook} />
                                </div>
                                <div className = "m-storeEdit-SNS__container__form__sns__item">
                                    <a>その他</a><input type="url" value={el.sns.other} />
                                </div>
                            </div>
                            <div className="m-storeEdit-SNS__container__form__btn">
                                <input type="submit" value="変更する"/>
                            </div>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}

export default EditSNS;