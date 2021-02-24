import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import axios from 'axios';

type InfoProps = ({
    store_uuid: string;
})

const Btn_favorite: React.FC<InfoProps> = ({store_uuid}) => {
    const { state } = useContext(UserAuthContext);
    let BtnFavorite: any;

    const update_favorite = () => {
        console.log('update_favorite');
        let data = new FormData;
        data.append('uuid', state.uuid);
        data.append('store_uuid', store_uuid)

        axios.post('/api/update_favorite', data)
        .then()
        .catch()
    }

    if(state.uuid && state.auth==="user"){
        BtnFavorite = (
        <button className = "a-btn-favorite" onClick={update_favorite}>
            <span><FontAwesomeIcon icon={faHeart}/></span>
            <span>お気に入り</span>
        </button>
        );
    }else if(state.uuid && state.auth==="store"){
        BtnFavorite = null;
    }else{
        BtnFavorite = (
            <Link to="/login_user" className = "a-btn-favorite">
                <span><FontAwesomeIcon icon={faHeart}/></span>
                <span>お気に入り</span>
            </Link>
        );
    }

    return (
        <div>
            {BtnFavorite}
        </div>
    )
}

export default Btn_favorite;