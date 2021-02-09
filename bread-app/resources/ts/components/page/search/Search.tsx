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
        address: '福岡市中央区白金',
        star: 2,
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'ニューヨーク・ブロードウェイに佇むレンガ造りのデザイナーズプレイラウンジをオマージュ。 ホテルっぽいの敷居の高さを排除し、日常の中にあるオシャレで少しだけ贅沢な時間をすごしたいときの場所。カフェやワークスペースとして、デートや少しの休息などにご利用ください。毎日26時まで営業しておりますので、夜カフェとしてのご利用もおすすめです。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/croissant.jpg'
    },
    {
        name: 'sarasapan',
        address: '福岡市中央区薬院',
        star:3.4,
        business_day: 'sasa',
        busines_memo: '定休日！！！',
        message: 'おいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいしおいし',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/croissant.jpg'
    },{
        id: 6,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/bakery.jpg'
    },{
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/bakery2.jpg'
    },
]


function Search() {
    // const [users, setUsers] = useState<any[]>([]);
    
    // useEffect(() => {
    //     getUsers()
    // },[])

    // const getUsers = async () => {
    //     const response = await axios.get('/api/user');
    //     console.log(123)
    //     console.log(response)
    //     setUsers(response.data.users)
    // }

    // const [stores, setStores] = useState<any[]>([]);

    // useEffect(()=>{
    //     getStores()
    // },[])

    // const getStores = async () => {
    //     const response = await axios.post('/api/store_all')
    //     console.log(response)
    //     setStores(response.data)
    // }

    return (
        <div className="p-search">
            <div className="a-btn-modificate">
                <Link to='/search_mobile'><span><FontAwesomeIcon icon={faEdit}/>&nbsp;条件変更</span></Link>
            </div>
            <div className = "p-search__container">
                <Search_sidebar />
                <div className="p-search__container__content">
                    <Store_pickup 
                        PickupInfo={testInfo}
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