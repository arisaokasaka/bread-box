import React from 'react'
import {useForm} from 'react-hook-form';
import BtnSave from '../../../atoms/buttons/BtnSave';

type BasicProps = ({
    StoreInfo: Array<any>;
});

const EditHomepage: React.FC<BasicProps> = ({StoreInfo}) => {
    const { register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <div className = "m-storeEdit-homepage">
            {StoreInfo.map((el)=>{
                return(
                    <div className = "m-storeEdit-homepage__container" key = {el.uuid}>
                        <h3>ホームページ</h3>
                        <a>ホームページのURLを入力してください</a>
                        <form className="m-storeEdit-homepage__container__form m-storeForm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="m-storeForm__item">
                                <label htmlFor="store_url">ホームページURL</label>
                                <div className="m-storeForm__item__input">
                                    <input type="url" id="store_url" name="url" value={el.url} ref={register({required: true})} />
                                </div>
                            </div>
                            <div className="m-storeEdit-homepage__container__form__btn m-storeForm__btn">
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

export default EditHomepage;