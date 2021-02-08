import React from 'react';
import BtnEditUser from '../../atoms/buttons/BtnEditUser';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faFlag, faCommentDots} from '@fortawesome/free-solid-svg-icons';

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
                                <p><span><FontAwesomeIcon icon={faHeart}/></span>お気に入り</p>
                                <p><span><FontAwesomeIcon icon={faFlag}/></span>行ってみたい</p>
                                <p><span><FontAwesomeIcon icon={faCommentDots}/></span>レビュー数</p>
                            </div>
                        </div>
                    </div>   
                );
            })}
        </div>
    );
}

export default UserProf;