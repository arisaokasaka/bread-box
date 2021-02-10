import React from 'react'
import {useForm} from 'react-hook-form';

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
                        <form className="m-storeEdit-homepage__container__form" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="store_url">ホームページURL</label>
                            <input type="url" id="store_url" name="url" value={el.url} ref={ register} />
                            <div className="m-storeEdit-homepage__container__form__btn">
                                <input type="submit" value="変更する"/>
                            </div>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}

export default EditHomepage;