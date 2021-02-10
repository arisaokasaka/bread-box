import React from 'react'
import {useForm} from 'react-hook-form';
import BtnSave from '../../../atoms/buttons/BtnSave';

type BasicProps = ({
    StoreInfo: Array<any>;
});

const EditBasicInfo: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <div className = "m-storeEdit-basic">
            {StoreInfo.map((el)=>{
                return(
                    <div className = "m-storeEdit-basic__container" key = {el.uuid}>
                        <form className="m-storeEdit-basic__container__form" onSubmit={handleSubmit(onSubmit)}>
                            
                            <label htmlFor="store_name" className="a-label-required">店舗名</label>
                            <input type="text" id="store_name" name="name" value={el.name} ref={ register({required: true})} />
                            {errors.name && <p>店舗名は必須です。</p>}

                            <label htmlFor="store_address" className="a-label-required">住所</label>
                            <input type="text" name="address" id="store_address" value={el.address} ref={register({required: true})}/>
                            {errors.address && <p>住所は必須です。</p>}

                            <label htmlFor="store_email" className="a-label-required">メールアドレス</label>
                            <input type="email" name="email" id="store_email" value={el.email} ref={register({required: true})}/>
                            {errors.email && <p>メールアドレスは必須です。</p>}

                            <label htmlFor="store_tel" className="a-label-required">電話番号(半角)</label>
                            <input type="text" name="tel" id="store_tel" ref={register({required: true, pattern: /[0-9]{10,11}/})}/>
                            {errors.tel && errors.tel.type === "required" && (<p>電話番号は必須です。</p>)}
                            {errors.tel && errors.tel.type === "pattern" && (<p>10~11文字の半角数字で指定してください。</p>)}

                            <label htmlFor="store_message">店舗説明</label>
                            <span>お店のページトップに表示される部分です。</span>
                            <textarea id="store_message" name="message" value={el.message} ref={ register} />

                            <div className="m-storeEdit-basic__container__form__btn">
                                <BtnSave
                                    InputType={"submit"}
                                    OnClickFunction={null}
                                />
                            </div>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}

export default EditBasicInfo;