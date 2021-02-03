import React from 'react'
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';

type BasicProps = ({
    StoreInfo: Array<any>;
});

const StoreEditTable_basic: React.FC<BasicProps> = ({StoreInfo}) => {
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

                            <label htmlFor="business_day" className="a-label-required">営業日</label>
                            <span>営業している曜日を全てチェックしてください。</span>
                            <div className = "p-register-store__container__form__week">
                                <div className = "p-register-store__container__form__week__day">
                                    <input type="checkbox" id="monday" name="monday" ref={register}/><label htmlFor="monday">月曜日</label>
                                </div>
                                <div className = "p-register-store__container__form__week__day">
                                    <input type="checkbox" id="tuesday" name="tuesday" ref={register}/><label htmlFor="tuesday">火曜日</label>
                                </div>
                                <div className = "p-register-store__container__form__week__day">
                                    <input type="checkbox" id="wednesday" name="wednesday" ref={register}/><label htmlFor="wednesday">水曜日</label>
                                </div>
                                <div className = "p-register-store__container__form__week__day">
                                    <input type="checkbox" id="thursday" name="thursday" ref={register}/><label htmlFor="thursday">木曜日</label>
                                </div>
                                <div className = "p-register-store__container__form__week__day">
                                    <input type="checkbox" id="friday" name="friday" ref={register}/><label htmlFor="friday">金曜日</label>
                                </div>
                                <div className = "p-register-store__container__form__week__day">
                                    <input type="checkbox" id="saturday" name="saturday" ref={register}/><label htmlFor="saturday">土曜日</label>
                                </div>
                                <div className = "p-register-store__container__form__week__day">
                                    <input type="checkbox" id="sunday" name="sunday" ref={register}/><label htmlFor="sunday">日曜日</label>
                                </div>
                            </div>

                            <label>営業日・営業時間備考</label>
                            <span>【記載例】<br></br>定休日：第3水曜日<br></br>営業時間：月～水 9時～19時 / 木～土 8時～13時</span>
                            <textarea name="business_memo" ref={register}/>
                            
                            <label htmlFor="store_url">ホームページURL</label>
                            <input type="url" id="store_url" name="url" value={el.url} ref={ register} />
                            
                            <label htmlFor="store_url">SNS</label>
                            <span>お持ちのSNSのURLを入力してください。</span>
                            <div className="m-storeEdit-basic__container__form__sns">
                                <div className = "m-storeEdit-basic__container__form__sns__item">
                                    <a>Instagram</a><input type="url" value={el.sns.instagram} />
                                </div>
                                <div className = "m-storeEdit-basic__container__form__sns__item">
                                    <a>Twitter</a><input type="url" value={el.sns.twitter} />
                                </div>
                                <div className = "m-storeEdit-basic__container__form__sns__item">
                                    <a>Facebook</a><input type="url" value={el.sns.facebook} />
                                </div>
                                <div className = "m-storeEdit-basic__container__form__sns__item">
                                    <a>その他</a><input type="url" value={el.sns.other} />
                                </div>
                            </div>

                            <div className="m-storeEdit-basic__container__form__btn">
                                <input type="submit" value="変更する"/>
                            </div>

                            <div className = "m-storeEdit-basic__container__form__links">
                                <Link to="/password_store">パスワードを再設定する場合</Link>
                            </div>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}

export default StoreEditTable_basic;