import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Store_pickup from '../common/Store_pickup';
import Store_summary from '../common/Store_summary';

let img_bakery1 = require('../../../image/bakery2.jpg');


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
            <div className="top__hero__content__search">
                    <input type="text" placeholder="キーワードから探す" />
                    <input type="submit" value="検索" />
            </div>
            <Store_pickup 
                Pickup={{
                    'img': img_bakery1,
                    'name': "ありパン"
                }}
            />
            <div className="p-search__list">
                <div className = "p-search__list__order">
                    <a>おすすめ順</a>
                    <a>評価順</a>
                    <a>口コミ数順</a>
                    <a>アクセス数順</a>
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