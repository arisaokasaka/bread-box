import React, {useEffect, useState} from 'react';
import axios from 'axios';

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
        <div>
            <h1>Searchページ</h1>
            <ul>
                {users.map(user => (<li key={user.id}>{user.name}</li>))}
            </ul>
            {/* <ul>
                {stores.map(store => (<li key={store.id}>{store.name}</li>))}
            </ul> */}
        </div>
    );
}

export default Search;