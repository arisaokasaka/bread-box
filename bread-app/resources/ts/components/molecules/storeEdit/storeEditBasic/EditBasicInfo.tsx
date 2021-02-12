import React, {useState} from 'react'
import {useForm} from 'react-hook-form';
import BtnSave from '../../../atoms/buttons/BtnSave';

type BasicProps = ({
    StoreInfo: Array<any>;
});

const EditBasicInfo: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit, errors} = useForm();
    const [info, setInfo] = useState({
        name: '',
        address: '',
        tel: '',
        email: '',
        message: '',
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <div className = "m-storeEdit-basic">
            {StoreInfo.map((el)=>{
                return(
                    <div className = "m-storeEdit-basic__container" key = {el.uuid}>
                        <h3>基本情報編集</h3>
                        <form className="m-storeEdit-basic__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                                <label htmlFor="store_name" className="a-label-required__red">店舗名</label>
                                <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                                    <input type="text" id="store_name" name="name" defaultValue={el.name} onChange={e => setInfo({...info, name: e.target.value})} ref={ register({required: true})} />
                                    {errors.name && <p>店舗名は必須です。</p>}
                                </div>
                            </div>
                            <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                                <label htmlFor="store_address" className="a-label-required__red">住所</label>
                                <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                                    <input type="text" name="address" id="store_address" defaultValue={el.address} onChange={e => setInfo({...info, address: e.target.value})} ref={register({required: true})}/>
                                    {errors.address && <p>住所は必須です。</p>}
                                </div>
                            </div>
                            <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                                <label htmlFor="store_email" className="a-label-required__red">メールアドレス</label>
                                <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                                    <input type="email" name="email" id="store_email" defaultValue={el.email} onChange={e => setInfo({...info, email: e.target.value})} ref={register({required: true})}/>
                                    {errors.email && <p>メールアドレスは必須です。</p>}
                                </div>
                            </div>
                            <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                                <label htmlFor="store_tel">電話番号(半角)</label>
                                <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                                    <span>半角で入力してください。(ハイフンなし)</span>
                                    <input type="tel" name="tel" id="store_tel" defaultValue={el.tel} onChange={e => setInfo({...info, tel: e.target.value})} ref={register({pattern: /[0-9]/, maxLength: 11, minLength:10})}/>
                                    {errors.tel && errors.tel.type === "pattern" && (<p>半角数字で指定してください。</p>)}
                                    {errors.tel && errors.tel.type === "minLength" && (<p>10～11文字で入力してください。</p>)}
                                    {errors.tel && errors.tel.type === "maxLength" && (<p>10～11文字で入力してください。</p>)}
                                </div>
                            </div>
                            <div className="m-storeEdit-basic__container__form__item m-storeForm__item">
                                <label htmlFor="store_message">店舗説明</label>
                                <div className="m-storeEdit-basic__container__form__item__input m-storeForm__item__input">
                                    <span>お店のページの最初に表示される部分です。</span>
                                    <textarea id="store_message" name="message" defaultValue={el.message} onChange={e => setInfo({...info, message: e.target.value})} ref={ register} />
                                </div>
                            </div>
                            <div className="m-storeEdit-basic__container__form__btn m-storeForm__btn">
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