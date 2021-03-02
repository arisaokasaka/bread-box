import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import StoreList from '../common/StoreList';
import { UserAuthContext } from '../../../contexts/UserAuthContext';

const UserTable_favorite = () => {
    const { state } = useContext(UserAuthContext);
    const [ favorite, setFavorite ] = useState([]);
    const [ sort, setSort ] = useState('score_descend');
    
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
    console.log(favorite)

    const changeSorting = (sort_type) => {
        let newArray: any;
        switch (sort_type) {
            case 'score_descend':
                newArray = favorite.sort((el1, el2) => {
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
                newArray = favorite.sort((el1, el2) => {
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
                newArray = favorite.sort((el1, el2) => {
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
        setFavorite(newArray);
    }

    return (
        <div className = "m-userTable-favorite">
            <div className = "m-userTable-favorite__order a-sort-selection">
                <select onChange={(e)=>changeSorting(e.target.value)}>
                    <option value="score_descend">評価が高い順</option>
                    <option value="review_descend">口コミ数順</option>
                    <option value="default">標準</option>
                </select>
            </div>
            {favorite[0]===undefined ? <p>お気に入り店舗はまだありません。</p>
                :<StoreList
                    storeList = {favorite}
                    sortType = {sort}
                />
            }
        </div>
    );
}

export default UserTable_favorite;