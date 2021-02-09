import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";

export default function BtnLogin_icon() {
    return (
        <div className = "a-btn-logIn">
            <Link to={"/login_user"}>
                <FontAwesomeIcon icon={faLock}/>
                <span>ログイン</span>
            </Link>
        </div>
    )
}
