import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import axios from 'axios';

type InfoProps = ({
    store_uuid: string
    favorite_checked?: any
})

const Btn_favorite: React.FC<InfoProps> = ({store_uuid, favorite_checked}) => {
    const { state } = useContext(UserAuthContext);
    const history = useHistory();
    let BtnFavorite: any;
    if(!favorite_checked){
        favorite_checked = false
    }

    const update_favorite = () => {
        let data = new FormData;
        data.append('uuid', state.uuid);
        data.append('store_uuid', store_uuid)

        axios.post('/api/update_favorite', data)
        .then()
        .catch()
    }

    if(state.uuid && state.auth==="user"){
        BtnFavorite = (
            <div className="a-btn-favorite">
                <input type="checkbox" id={"checkfv_"+store_uuid} defaultChecked={favorite_checked} onClick={update_favorite}/>
                <label htmlFor={"check_"+store_uuid}><FontAwesomeIcon icon={faHeart}/></label>
            </div>
        );
    }else if(state.uuid && state.auth==="store"){
        BtnFavorite = null;
    }else{
        BtnFavorite = (
            <div className = "a-btn-favorite" onClick={()=>history.push("/login_user")}>
                <input type="checkbox" id={"checkfv_"+store_uuid}/>
                <label htmlFor={"check_"+store_uuid}><FontAwesomeIcon icon={faHeart}/></label>
            </div>
        );
    }

    return (
        <div>
            {BtnFavorite}
        </div>
    )
}

export default Btn_favorite;