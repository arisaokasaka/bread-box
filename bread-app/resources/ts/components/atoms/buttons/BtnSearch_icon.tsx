import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const BtnSearch_icon: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    return (
        <div className = "a-btn-search_icon">
            <Link to={"/search?id=" + state.uuid}>
                <FontAwesomeIcon icon={faSearch}/>
                <span>検索</span>
            </Link>
        </div>
    )
}

export default BtnSearch_icon;