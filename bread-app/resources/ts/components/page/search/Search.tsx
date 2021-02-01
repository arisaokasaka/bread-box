import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Search_sidebar from '../../molecules/search/Search_sidebar';
import Store_pickup from '../../molecules/Store_pickup';
import StoreList from '../../molecules/store/StoreList';

const testInfo = [
    {
        name: 'sarasapan',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'}
    },
    {
        name: 'sarasapan',
        address: 'dsdsdsdsdsdsd',
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'}
    }
]


function Search() {
    const [users, setUsers] = useState<any[]>([]);
    
    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const response = await axios.post('/api/user');
        console.log(response)
        setUsers(response.data.users)
    }

    const [stores, setStores] = useState<any[]>([]);

    useEffect(()=>{
        getStores()
    },[])

    const getStores = async () => {
        const response = await axios.post('/api/store_all')
        console.log(response)
        setStores(response.data)
    }

    return (
        <div className="p-search">
            <div className="a-btn-modificate">
                <Link to='/search_mobile'><span><FontAwesomeIcon icon={faEdit}/>&nbsp;条件変更</span></Link>
            </div>
            <div className = "p-search__container">
                <Search_sidebar />
                <div className="p-search__container__content">
                    <Store_pickup 
                        Pickup={{
                            'img': 1,
                            'name': "ありパン"
                        }}
                    />
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
                        <StoreList
                            StoreInfo = {testInfo}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;