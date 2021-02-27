import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const BtnStorePage: React.FC = () => {
    const { state } = useContext(UserAuthContext);

    return (
        <div className = "a-btn-storePage">
            {state.auth === "store" &&
                <Link to={"/store/"+state.uuid}>
                    <FontAwesomeIcon icon={faStore}/>
                    <span>店舗ページ</span>
                </Link>
            }
        </div>
    )
}

export default BtnStorePage;