import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFlag} from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

export default function Btn_interested() {
    const { state } = useContext(UserAuthContext);
    let BtnInterested: any;
    if(state.uuid){
        BtnInterested = (
            <button className="a-btn-interested">
                <span><FontAwesomeIcon icon={faFlag}/></span>
                <span>行ってみたい</span>
            </button> 
        );
    }else{
        BtnInterested = (
            <Link to="/login_user" className="a-btn-interested">
                <span><FontAwesomeIcon icon={faFlag}/></span>
                <span>行ってみたい</span>
            </Link>
        );
    }

    return (
        <div>
            {BtnInterested}
        </div>
    )
}
