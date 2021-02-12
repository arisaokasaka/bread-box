import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

export default function BtnStoreEdit() {
    const { state } = useContext(UserAuthContext);
    let BtnFavorite: any;
    if(state.uuid && state.auth==="store"){
        BtnFavorite = (
            <Link to="/store_edit" className = "a-btn-storeEdit">
                <span><FontAwesomeIcon icon={faPen}/></span>
                <span>店舗情報を編集する</span>
            </Link>
        );
    }else{
        BtnFavorite = null;
    }

    return (
        <div>
            {BtnFavorite}
        </div>
    )
}