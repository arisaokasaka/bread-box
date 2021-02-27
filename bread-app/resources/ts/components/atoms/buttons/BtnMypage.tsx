import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const BtnMypage_icon: React.FC = () => {
    const { state } = useContext(UserAuthContext);

    return (
        <div className = "a-btn-mypage">
            {state.auth==="user" &&
                <Link to="/user">
                    <FontAwesomeIcon icon={faUserCircle}/>
                    <span>マイページ</span>
                </Link>
            }
        </div>
    )
}

export default BtnMypage_icon;