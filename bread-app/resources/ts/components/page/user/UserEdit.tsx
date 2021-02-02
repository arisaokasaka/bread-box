import React from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import BtnBack from '../../atoms/buttons/BtnBack';

type UserEditProps = ({
    UserInfo: Array<any>;
})

const testUserInfo = [
    {
        id: 123456,
        uuid: 123456,
        name: 'ariari',
        email: 'ariari@so',
        address: '765432',
    }
]


const UserEdit: React.FC<UserEditProps> = ({UserInfo}) => {
    UserInfo = testUserInfo;
    const { register, handleSubmit, errors, getValues } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <div className = "p-userEdit">
           {UserInfo.map((el)=>{
               return(
                <div className = "p-userEdit__container">
                    <form className="p-userEdit__container__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className = "p-userEdit__container__btn">
                            <BtnBack
                                URL = "/user"
                            />
                        </div>
                        <h2>ユーザー情報編集</h2>

                        <label htmlFor="user_name" className="a-label-required">ユーザー名</label>
                        <input type="text" id="user_name" name="name" value={el.name} ref={ register({required: true})} />
                        {errors.name && <p>ユーザー名は必須です。</p>}

                        <label htmlFor="user_email" className="a-label-required">メールアドレス</label>
                        <input type="email" name="email" id="user_email" value={el.email} ref={register({required: true})}/>
                        {errors.email && <p>メールアドレスは必須です。</p>}
                        
                        <label htmlFor="user_address">住所</label>
                        <input type="text" name="address" id="user_address" value={el.address} ref={register}/>
                        
                        <input type="submit" value="更新する"/>

                        <div className = "p-userEdit__container__form__links">
                            <Link to="/password_user">パスワードを再設定する場合</Link>
                        </div>
                    </form>
                    
                </div>
               );
           })}
        </div>
    );
}

export default UserEdit;