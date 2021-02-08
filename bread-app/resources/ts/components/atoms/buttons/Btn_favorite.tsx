import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';


export default function Btn_favorite() {
    const { state } = useContext(UserAuthContext);
    let BtnFavorite: any;
    if(state.uuid){
        BtnFavorite = (
        <button className = "a-btn-favorite">
            <span><FontAwesomeIcon icon={faHeart}/></span>
            <span>お気に入り</span>
        </button>
        );
    }else{
        BtnFavorite = (
            <Link to="/login_user" className = "a-btn-favorite">
                <span><FontAwesomeIcon icon={faHeart}/></span>
                <span>お気に入り</span>
            </Link>
        );
    }

    return (
        <div>
            {BtnFavorite}
        </div>
    )
}