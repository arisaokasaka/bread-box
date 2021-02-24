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

    return (
        <div className="p-search">
            <div className="a-btn-modificate">
                <Link to='/search_mobile'><span><FontAwesomeIcon icon={faEdit}/>&nbsp;条件変更</span></Link>
            </div>
            <div className = "p-search__container">
                <Search_sidebar />
                <div className="p-search__container__content">
                    <Store_pickup />
                    <div className="p-search__container__content__list">
                        <div className = "p-search__container__content__list__order--pc">
                            <a>おすすめ順</a>
                            <a>評価順</a>
                            <a>口コミ数順</a>
                            <a>アクセス数順</a>
                        </div>
                        <div className = "p-search__container__content__list__order--mobile">
                            <select>
                                <option value="">おすすめ順</option>
                                <option value="">評価順</option>
                                <option value="">口コミ数順</option>
                                <option value="">アクセス数順</option>
                            </select>
                        </div>
                        {message_noResult}
                        <StoreList
                            StoreInfo = {stores}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;