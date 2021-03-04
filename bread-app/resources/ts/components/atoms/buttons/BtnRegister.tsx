import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const BtnRegister: React.FC = () => {
        return (
        <div className = "a-btn-register">
            <Link to="/register_user">
                <FontAwesomeIcon icon={faUserPlus}/>
                <span>会員登録</span>
            </Link>
        </div>
    )
}

export default BtnRegister;