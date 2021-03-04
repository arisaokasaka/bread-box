import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import StoreList from '../common/StoreList';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const UserTable_interested: React.FC = () => {
    const { state } = useContext(UserAuthContext);
    const [ interested, setInterested ] = useState([]);
    const [ sort, setSort ] = useState('score_descend');

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

    const changeSorting = (sort_type) => {
        let newArray: any;
        switch (sort_type) {
            case 'score_descend':
                newArray = interested.sort((el1, el2) => {
                    if (el1['scoreInfo']['score'] < el2['scoreInfo']['score']) {
                        return 1;
                    }
                    if (el1['scoreInfo']['score'] > el2['scoreInfo']['score']) {
                        return -1;
                    }
                    return 0;
                });
            break;
            case 'review_descend':
                newArray = interested.sort((el1, el2) => {
                    if (el1['scoreInfo']['count'] < el2['scoreInfo']['count']) {
                        return 1;
                    }
                    if (el1['scoreInfo']['count'] > el2['scoreInfo']['count']) {
                        return -1;
                    }
                    return 0;
                })
            break;
            case 'default':
                newArray = interested.sort((el1, el2) => {
                    if (el1['user_uuid'] > el2['user_uuid']) {
                        return 1;
                    }
                    if (el1['user_uuid'] < el2['user_uuid']) {
                        return -1;
                    }
                    return 0;
                })
            break;
        }
        setSort(sort_type);
        setInterested(newArray);
    }

    return (
        <div className = "m-userTable-interested">
            <div className = "m-userTable-interested__order a-sort-selection">
                <select onChange={(e)=>changeSorting(e.target.value)}>
                    <option value="default">標準</option>
                    <option value="score_descend">評価が高い順</option>
                    <option value="review_descend">口コミ数順</option>
                </select>
            </div>
            {interested[0]===undefined ? <p>行ってみたい店舗はまだありません。</p>
            :<StoreList
                storeList = {interested}
                sortType = {sort}
            />}
        </div>
    );
}

export default UserTable_interested;