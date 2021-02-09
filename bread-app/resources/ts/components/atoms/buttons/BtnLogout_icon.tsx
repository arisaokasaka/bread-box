import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function BtnLogout_icon() {
    const { dispatch } = useContext(UserAuthContext);

    // ログアウト機能
    const logout = () => {
    axios
        .get("/api/logout")
        .then(res => {
            console.log(res);
            dispatch({
                type: 'setOut'
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className = "a-btn-logout">
            <Link to={"/"} onClick={logout}><FontAwesomeIcon icon={faSignOutAlt}/></Link>
        </div>
    )
}
