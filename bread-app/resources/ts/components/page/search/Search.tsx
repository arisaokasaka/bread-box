import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Store_pickup from '../../molecules/Store_pickup';
import Store_summary from '../../molecules/Store_summary';

// let img_bakery1 = require('../../../image/bakery2.jpg');


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
            <div className="c-bar-search">
                    <input type="text" placeholder="キーワードから探す" />
                    <input type="submit" value="検索" />
            </div>
            <Store_pickup 
                Pickup={{
                    'img': 1,
                    'name': "ありパン"
                }}
            />
            <div className="p-search__list">
                <div className = "p-search__list__order--pc">
                    <a>おすすめ順</a>
                    <a>評価順</a>
                    <a>口コミ数順</a>
                    <a>アクセス数順</a>
                </div>
                <div className = "p-search__list__order--mobile">
                    <select>
                        <option value="">おすすめ順</option>
                        <option value="">評価順</option>
                        <option value="">口コミ数順</option>
                        <option value="">アクセス数順</option>
                    </select>
                </div>
                <Store_summary
                    store_name = "ありさぱん"
                    store_access = "薬院駅から徒歩3分"
                    store_detail = "おいしいアンパンおいしいアンパンおいしいアンパンおいしいアンパンおいしいアンパンおいしいアンパンおいしいアンパン"
                />
            </div>
        </div>
    );
}

export default Search;