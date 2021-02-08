import React from 'react';
import {Link} from 'react-router-dom';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BtnEditUser() {
    return (
        <Link to="/user_edit" className = "a-btn-edit-user">
            <FontAwesomeIcon icon={faPen}/><span>&nbsp;&nbsp;編集</span>
        </Link>
    )
}
