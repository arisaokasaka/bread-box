import React, { useContext } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

type InfoProps = ({
    store_uuid: string
    allInfo?: any;
    index?: any
    favorite_checked?: any
})

const Btn_favorite: React.FC<InfoProps> = ({allInfo, store_uuid, favorite_checked, index}) => {
    const { state } = useContext(UserAuthContext);
    const history = useHistory();
    let BtnFavorite: any;
    let info: any;
    
    if(allInfo){
        info = allInfo
        favorite_checked = info.favorite_checked
    }else{
        if(!favorite_checked){
            favorite_checked = false
        }
    }

    const update_favorite = () => {
        let data = new FormData;
        data.append('uuid', state.uuid);
        data.append('store_uuid', store_uuid);
        axios.post('/api/update_favorite', data);
    }

    if(state.uuid && state.auth==="user"){
        BtnFavorite = (
            <div className="a-btn-favorite">
                <input type="checkbox" id={"BtnFavorite_" + index} defaultChecked={favorite_checked} onClick={update_favorite}/>
                <label htmlFor={"BtnFavorite_" + index}><FontAwesomeIcon icon={faHeart}/></label>
            </div>
        );
    }else if(state.uuid && state.auth==="store"){
        BtnFavorite = null;
    }else{
        BtnFavorite = (
            <div className = "a-btn-favorite" onClick={()=>history.push("/login_user")}>
                <input type="checkbox" id={"BtnFavorite_" + index}/>
                <label htmlFor={"BtnFavorite_" + index}><FontAwesomeIcon icon={faHeart}/></label>
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