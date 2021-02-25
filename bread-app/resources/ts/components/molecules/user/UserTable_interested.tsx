import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import StoreList from '../store/StoreList';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const UserTable_interested: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const [ interested, setInterested ] = useState([]);
    let content: any;

    useEffect(()=>{
        index_interested();
    },[])

    const index_interested = () => {
        axios.post('/api/index_interested_list', {uuid: state.uuid})
        .then(res=>{
            setInterested(res.data)
        })
        .catch()
    }

    if(interested[0]===undefined) {
        content = <p>行ってみたい店舗はまだありません。</p>
    }else{
        content = (
            <div className = "m-userTable-interested">
                <StoreList
                    StoreInfo = {interested}
                />
            </div>
        );
    }

    return content;
}

export default UserTable_interested;