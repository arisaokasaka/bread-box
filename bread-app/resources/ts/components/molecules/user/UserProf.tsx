import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import BtnEditUser from '../../atoms/buttons/BtnEditUser';
import BtnLogout from '../../atoms/buttons/BtnLogout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFlag, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const UserProf: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const [ info, setInfo ] = useState({});
    let userInfo: any;
    let favorite_count: number = 0;
    let interested_count: number = 0;
    let review_count: number = 0;

    useEffect(()=>{
        index_user();
    },[])

    // ユーザー情報取得
    const index_user = () => {
        axios.post("/api/index_user", {uuid: state.uuid})
        .then(res => {
            setInfo(res.data[0]);
        })
        .catch(err => {
        });
    }

    if(info){
        userInfo = info;

        if(userInfo.review_count){
            review_count = userInfo.review_count;
        }

        if(userInfo.favorite){
            let favorite_list = JSON.parse(userInfo.favorite);

            favorite_list ? 
            favorite_count = favorite_list.length
            : favorite_count = 0

        }else{
            favorite_count = 0
        }

        if(userInfo.interested){
            let interested_list = JSON.parse(userInfo.interested);
            
            interested_list ? 
            interested_count = interested_list.length
            : interested_count = 0

        }else{
            interested_count = 0
        }
    }

    return(
        <div className = "m-user-prof">
            <div className = "m-user-prof__container" key = {userInfo.uuid}>
                <div className = "m-user-prof__container__btn">
                    <BtnEditUser/>
                </div>
                <div className = "m-user-prof__container__content">
                    {userInfo.profile ? 
                    <img src={"/storage/user/"+state.uuid+"/profile.jpg"} alt="プロフィール画像"/>
                    : <img src="/images/no_image.jpg" alt="プロフィール画像"/>}
                    <div className = "m-user-prof__container__content__text">
                        <h3>{userInfo.name}</h3>
                        <div className = "m-user-prof__container__content__text__item">
                            <p><span><FontAwesomeIcon icon={faHeart}/></span>お気に入り</p>
                            <p>{favorite_count}</p>
                        </div>
                        <div className = "m-user-prof__container__content__text__item">
                            <p><span><FontAwesomeIcon icon={faFlag}/></span>行ってみたい</p>
                            <p>{interested_count}</p>
                        </div>
                        <div className = "m-user-prof__container__content__text__item">
                            <p><span><FontAwesomeIcon icon={faCommentDots}/></span>口コミ数</p>
                            <p>{review_count}</p>
                        </div>
                        <BtnLogout/>
                    </div>
                </div>
            </div>   
        </div>
    );
}

export default UserProf;