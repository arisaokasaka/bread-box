import React from 'react';
import {Link} from 'react-router-dom';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BtnEditUser() {
    return (
        <Link to="/user_edit" className = "a-btn-edit-user">
            <FontAwesomeIcon icon={faUserEdit}/>&nbsp;&nbsp;ユーザー情報編集
        </Link>
    )
}
