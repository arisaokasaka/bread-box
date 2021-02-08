import React from 'react';
import BtnEditUser from '../../atoms/buttons/BtnEditUser';

type UserProps = ({
        UserInfo?: any;
});

const UserProf: React.FC<UserProps> = ({UserInfo}) => {
    return(
        <div className = "m-user-prof">
            {UserInfo.map((el)=>{
                return(
                    <div className = "m-user-prof__container" key = {el.uuid}>
                        <div className = "m-user-prof__container__btn">
                            <BtnEditUser/>
                        </div>
                        <div className = "m-user-prof__container__content">
                            <img src="/images/croissant.jpg" alt="プロフィール画像"/>
                            <div className = "m-user-prof__container__content__text">
                                <h3>{el.name}</h3>
                                <p>お気に入り：</p>
                                <p>行ってみたい：</p>
                                <p>レビュー数：</p>
                            </div>
                        </div>
                    </div>   
                );
            })}
        </div>
    );
}

export default UserProf;