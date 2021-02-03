import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import districts from '../../../info/Districts';
import bread_kinds from '../../../info/Bread_kinds';
import days from '../../../info/Days';
import Searchbar from '../../atoms/Searchbar';
import Top_section from '../../molecules/top/top_section';
import Store_pickup from '../../molecules/Store_pickup';

// let img_bakery1 = require('../../../image/bakery2.jpg');

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
                Pickup={{
                    'img': 12,
                    'name': "ありパン"
                }}
                />
                <section className="p-top__content__section">
                    <h2>アクセス数ランキング</h2>
                    <ul>
                        <li className="c-store-pickup__el">
                            {/* <img src={img_bakery1}></img> */}
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