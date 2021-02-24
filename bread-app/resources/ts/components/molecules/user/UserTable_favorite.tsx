import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import StoreList from '../store/StoreList';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const UserTable_favorite = () => {
    const { state } = useContext(UserAuthContext);
    const [ favorite, setFavorite ] = useState([]);
    let content: any;
    
    useEffect(()=>{
        index_favorite();
    },[])

    const index_favorite = () => {
        axios.post('/api/index_favorite_list', {uuid: state.uuid})
        .then(res=>{
            setFavorite(res.data)
        })
        .catch()
    }

    if(favorite[0]===undefined) {
        content = <p>お気に入り店舗はまだありません。</p>
    }else{
        content = (
            <div className = "m-userTable-favorite">
                <StoreList
                    StoreInfo = {favorite}
                />
            </div>
        );
    }

    return content;
}

export default UserTable_favorite;