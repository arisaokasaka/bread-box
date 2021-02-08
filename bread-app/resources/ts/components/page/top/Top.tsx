import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import districts from '../../../info/Districts';
import bread_kinds from '../../../info/Bread_kinds';
import days from '../../../info/Days';
import Searchbar from '../../atoms/Searchbar';
import Top_section from '../../molecules/top/top_section';
import Store_pickup from '../../molecules/Store_pickup';

// let img_bakery1 = require('../../../image/bakery2.jpg');

const testPickInfo = [
    {
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/croissant.jpg'
    },{
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/croissant.jpg'
    },{
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/croissant.jpg'
    },{
        id: 56,
        name: 'Le pain de Maki',
        address: '福岡市博多区比恵町',
        star: 3.3,
        business_day: '月曜日',
        busines_memo: '定休日！！！',
        message: '大規模な再開発が進む渋谷の新ランドマーク「MIYASHITA PARK」に大人気『パンとエスプレッソ』の姉妹店が誕生。卵をイメージした黄色と白をモチーフにした温かみのある店内に天気のいい日にはテラスも。絶品ホットサンドから大人気のムー、話題の『シメパフェ』には当店こだわりのパンとコーヒーを使用。夜はお酒も提供。型にとらわれない、渋谷の新しい『まちあわせ』使いにもどうぞ。',
        sns: {twitter: 'twitter', instagram: 'sssss'},
        img: '/images/croissant.jpg'
    },
]

function Top() {
    return (
        <div className="p-top">
            <div className="p-top__hero">
                <div className="p-top__hero__content">
                    <h1>お気に入りのパン屋さんを<br></br>見つける、つながる</h1>
                    <Searchbar />
                </div>
            </div>
            <main className="p-top__content">
                <Top_section 
                sectionTitle="エリアから探す"
                sectionContent={districts.districts}
                />
                <Top_section 
                sectionTitle="パンの種類から探す"
                sectionContent={bread_kinds.bread_kinds}
                />
                <Top_section 
                sectionTitle="営業日から探す"
                sectionContent={days.days}
                />
                <Store_pickup 
                    PickupInfo={testPickInfo}
                />
                <section className="p-top__content__section">
                    <h2>アクセス数ランキング</h2>
                    <ul>
                        <li className="c-store-pickup__el">
                            <p>ありありパン</p>
                        </li>
                    </ul>
                </section>
            </main>
            <footer className="p-top__footer">
                <Link to="/register_store">事業主の方はこちら</Link>
            </footer>
        </div>
    );
    
}

export default Top;