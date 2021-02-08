import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

export default function BtnLogout_icon() {
    return (
        <div className = "a-btn-logout">
            <Link to={"/"}><FontAwesomeIcon icon={faSignOutAlt}/></Link>
        </div>
    )
}
