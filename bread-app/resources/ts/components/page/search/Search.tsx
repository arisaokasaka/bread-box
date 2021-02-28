import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Search_sidebar from '../../molecules/search/Search_sidebar';
import Store_pickup from '../../molecules/Store_pickup';
import StoreList from '../../molecules/store/StoreList';

const Search: React.FC = () => {
    const location = useLocation();
    const keyword = location.search;
    const [ stores, setStores ] = useState([]);
    const [ sort, setSort ] = useState('default')
    let message_noResult: any = null;

    useEffect(()=>{
        getStores()
    },[])

    const getStores = () => {
        axios.get('/api/search_store'+ keyword)
        .then(res => {
            setStores(res.data)
        })
    }

    if(stores[0] === undefined){
        message_noResult = <p>該当する店舗がありません。</p>
    }

    const changeSorting = (sort_type) => {
        let newArray: any;
        switch (sort_type) {
            case 'score_descend':
                newArray = stores.sort((el1, el2) => {
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
                newArray = stores.sort((el1, el2) => {
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
                newArray = stores.sort((el1, el2) => {
                    if (el1['user_uuid'] < el2['user_uuid']) {
                        return 1;
                    }
                    if (el1['user_uuid'] > el2['user_uuid']) {
                        return -1;
                    }
                    return 0;
                })
            break;
        }
        setSort(sort_type);
        setStores(newArray);
    }

    return (
        <div className="p-search">
            <div className="a-btn-modificate">
                <Link to='/search_mobile'><span><FontAwesomeIcon icon={faEdit}/>&nbsp;検索条件変更</span></Link>
            </div>
            <div className = "p-search__container">
                <Search_sidebar />
                <div className="p-search__container__content">
                    <Store_pickup />
                    <div className="p-search__container__content__list">
                        <div className = "p-search__container__content__list__order--pc">
                            <button onClick={()=>changeSorting('default')}>標準</button>
                            <button onClick={()=>changeSorting('score_descend')}>評価順</button>
                            <button onClick={()=>changeSorting('review_descend')}>口コミ数順</button>
                        </div>
                        <div className = "p-search__container__content__list__order--mobile">
                            <select onChange={(e)=>changeSorting(e.target.value)}>
                                <option value="default">標準</option>
                                <option value="score_descend">評価順</option>
                                <option value="review_descend">口コミ数順</option>
                            </select>
                        </div>
                        {message_noResult}
                        <StoreList
                            storeList = {stores}
                            sortType = {sort}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;