import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';

export default function BtnMypage_icon() {
    const { state } = useContext(UserAuthContext);
    let icon: any;
    
    if(state.auth === "user"){
        icon = (
        <Link to="/user">
            <FontAwesomeIcon icon={faUserCircle}/>
            <span>マイページ</span>
        </Link>
        );
    }else if(state.auth === "store"){
        icon = (
        <Link to="/store_edit">
            <FontAwesomeIcon icon={faUserCircle}/>
            <span>マイページ</span>
        </Link>
        );
    }else{
        icon = null;
    }

    return (
        <div className = "a-btn-mypage">
            {icon}
        </div>
    )
}
