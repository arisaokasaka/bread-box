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
                        <img src="" alt="プロフィール画像"/>
                        <div>
                            <h3>{el.name}</h3>
                            <p>{el.password}</p>
                            <p>い</p>
                            <p>う</p>
                        </div>
                    </div>   
                );
            })}
        </div>
    );
}

export default UserProf;