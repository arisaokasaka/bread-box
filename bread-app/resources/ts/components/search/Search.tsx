import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Store_pickup from '../common/Store_pickup';
import Store_sumup from '../common/Store_sumup';

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
            {/* <div className="p-search__result">
                <ul>
                    {users.map(user => (<li key={user.id}>{user.name}</li>))}
                </ul>
            </div> */}
            <Store_sumup />
        </div>
    );
}

export default Search;