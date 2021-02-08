import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

export default function Btn_favorite() {
    return (
        <button className = "a-btn-favorite">
            <span><FontAwesomeIcon icon={faHeart}/></span>
            <span>お気に入り</span>
        </button>
    )
}