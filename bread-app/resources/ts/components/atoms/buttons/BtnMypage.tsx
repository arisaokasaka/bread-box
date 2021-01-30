import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

export default function BtnSearch_icon() {
    return (
        <div className = "a-btn-mypage">
            <Link to=""><FontAwesomeIcon icon={faUserCircle}/></Link>
        </div>
    )
}
