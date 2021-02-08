import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlag} from '@fortawesome/free-solid-svg-icons';

export default function Btn_interested() {
    return (
        <button className="a-btn-interested">
            <span><FontAwesomeIcon icon={faFlag}/></span>
            <span>行ってみたい</span>
        </button> 
    )
}
