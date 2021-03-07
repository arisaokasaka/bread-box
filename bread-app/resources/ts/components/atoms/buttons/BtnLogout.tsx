import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

export default function BtnLogout() {
    const { dispatch } = useContext(UserAuthContext);
    const history = useHistory();

    // ログアウト機能
    const logout = () => {
    axios
        .get("/api/logout")
        .then(res => {
            dispatch({
                type: 'setOut'
            });
            history.push('/')
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className = "a-btn-logout">
            <a onClick={logout}>ログアウトする</a>
        </div>
    )
}
