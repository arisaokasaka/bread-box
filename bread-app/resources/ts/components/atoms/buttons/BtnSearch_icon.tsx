import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function BtnSearch_icon() {
    return (
        <div className = "a-btn-search_icon">
            <Link to={"/search_mobile"}>
                <FontAwesomeIcon icon={faSearch}/>
                <span>検索</span>
            </Link>
        </div>
    )
}
